'use client';
import React, { useEffect, useState } from 'react';
import { Image, Label } from '@/components';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/supabase/supabase';
import type { ListingData } from '@/types';
import { formatDescription, formatDate } from '@/utils';
import { useTranslations } from 'next-intl';

export default function annoncePage({ params }: { params: { id: number } }) {
  const t = useTranslations('app');
  const router = useRouter();
  const [jobPost, setJobPost] = useState<ListingData>();

  useEffect(() => {
    const fetchJobPostById = async () => {
      try {
        const { data, error } = await supabase
          .from('jobPosting')
          .select(
            `
        *,
        companyId:users ( user_name, user_email, user_logo, user_total_request_count, isCompany ) 
      `,
          )
          .eq('id', params.id)
          .single();

        if (error) {
          console.error('Error fetching job post:', error.message);
        } else {
          setJobPost(data || null);

          if (!data) {
            // If jobPost is not found, navigate to the 404 page
            router.push('/404'); // Adjust the path to your 404 page
          } else {
            updatePageViewCount(data); // Call updatePageViewCount with data
          }
        }
      } catch (error: any) {
        console.error('An error occurred:', error.message);
      }
    };

    const updatePageViewCount = async (jobData: ListingData) => {
      try {
        if (jobData && jobData.pageViewCount !== undefined) {
          const { error } = await supabase
            .from('jobPosting')
            .update({ pageViewCount: jobData.pageViewCount + 1 })
            .eq('id', jobData.id);

          if (error) {
            console.log('Error incrementing page view count:', error);
          } else {
            setJobPost({ ...jobData, pageViewCount: jobData.pageViewCount + 1 });
          }
        } else {
          console.log('jobPost or jobPost.pageViewCount is undefined');
        }
      } catch (error: any) {
        console.error('An error occurred:', error.message);
      }
    };

    fetchJobPostById();
  }, [params.id, router]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    cvFile: null as File | null,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, cvFile: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { name, email, phoneNumber, cvFile } = formData;

      if (!jobPost || !jobPost.companyId || !jobPost.companyId.user_email) {
        console.error('Recruiter email is not available');
        return;
      }

      const recruiterEmail = jobPost.companyId.user_email;

      const formDataToSend = new FormData();
      formDataToSend.append('name', name);
      formDataToSend.append('email', email);
      formDataToSend.append('phoneNumber', phoneNumber);
      formDataToSend.append('cvFile', cvFile as Blob);
      formDataToSend.append('recruiterEmail', recruiterEmail);

      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <header className='w-full flex justify-center py-4 bg-brand-lightbg'>
      {jobPost ? (
        <section className='container flex flex-col gap-4'>
          <div className='flex flex-row items-center md:flex-row md:p-2'>
            <Image
              src={jobPost.companyId?.user_logo as string}
              alt='Yes Job'
              className='w-20 m-5 h-20 md:w-24 md:h-24 object-contain bg-blue-200 rounded-2xl'
              unoptimized
            />
            <div className=''>
              <h6 className='text-base font-semibold md:text-lg'>{jobPost.title}</h6>
              <p className='text-base md:text-lg'>{jobPost.companyId?.user_name}</p>
            </div>
          </div>
          <div className='flex flex-wrap gap-2.5 py-4 md:py-1 justify-center md:justify-start'>
            <Label text={jobPost.location} type='location' />
            {jobPost.salaryMin ? (
              <Label text={`${t('publishAds.from')} € ` + jobPost.salaryMin} type='salary' />
            ) : jobPost.salaryMax ? (
              <Label text={`${t('publishAds.to')} € ` + jobPost.salaryMax} type='salary' />
            ) : null}
            {jobPost.cdd ? <Label text='CDD' type='WorkDuration' /> : null}
            {jobPost.cdi ? <Label text='CDI' type='WorkDuration' /> : null}
            {jobPost.fullTime ? <Label text={t('listing.fulltime')} type='WorkDuration' /> : null}{' '}
            {jobPost.partTime ? <Label text={t('listing.partTime')} type='WorkDuration' /> : null}
            {jobPost.experience ? (
              <Label text={t('listing.experience')} type='noExp' className='block md:hidden lg:block' />
            ) : (
              <Label text={t('listing.noExperience')} type='noExp' className='block md:hidden lg:block' />
            )}
          </div>
          <div className='flex flex-col gap-2.5 py-4 md:py-1 justify-center md:justify-start'>
            <h2 className='text-2xl font-semibold'>{t('adPage.description')}</h2>
            {formatDescription(jobPost.description)}
          </div>
          <div className='w-full h-px bg-slate-300 rounded' />
          <div className='flex flex-col gap-2.5 py-4 md:py-1 justify-center md:justify-start'>
            <h2 className='text-2xl font-semibold'>{t('adPage.apply')}</h2>
            {jobPost.applicationMethod === 'yesJob' ? (
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label htmlFor='name' className='block text-lg font-medium mb-2'>
                    {t('adPage.name')}
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleFormChange}
                    className='w-full py-2 px-3 border rounded-lg'
                    required
                    placeholder='James De Backer'
                  />
                </div>
                <div className='mb-4'>
                  <label htmlFor='cvFile' className='block text-lg font-medium mb-2'>
                    {t('adPage.resume')} (PDF/DOC)
                  </label>
                  <input
                    type='file'
                    id='cvFile'
                    name='cvFile'
                    onChange={handleFileChange}
                    accept='.pdf,.doc'
                    className='w-full py-2 px-3 border rounded-lg'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label htmlFor='phoneNumber' className='block text-lg font-medium mb-2'>
                    {t('adPage.phoneNumber')}
                  </label>
                  <input
                    type='tel'
                    id='phoneNumber'
                    name='phoneNumber'
                    value={formData.phoneNumber}
                    onChange={handleFormChange}
                    className='w-full py-2 px-3 border rounded-lg'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label htmlFor='email' className='block text-lg font-medium mb-2'>
                    {t('adPage.email')}
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleFormChange}
                    className='w-full py-2 px-3 border rounded-lg'
                    required
                  />
                </div>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'>
                  {t('adPage.submit')}
                </button>
              </form>
            ) : jobPost.applicationMethod === 'externalForm' ? (
              <Link href={jobPost.externalFormURL}>
                <button className={`bg-blue-500 text-white px-4 py-2 rounded`}>{t('adPage.redirect')}</button>
              </Link>
            ) : jobPost.applicationMethod === 'both' ? (
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label htmlFor='name' className='block text-lg font-medium mb-2'>
                    {t('adPage.name')}
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleFormChange}
                    className='w-full py-2 px-3 border rounded-lg'
                    required
                    placeholder='James De Backer'
                  />
                </div>
                <div className='mb-4'>
                  <label htmlFor='cvFile' className='block text-lg font-medium mb-2'>
                    {t('adPage.resume')}(PDF/DOC)
                  </label>
                  <input
                    type='file'
                    id='cvFile'
                    name='cvFile'
                    onChange={handleFileChange}
                    accept='.pdf,.doc'
                    className='w-full py-2 px-3 border rounded-lg'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label htmlFor='phoneNumber' className='block text-lg font-medium mb-2'>
                    {t('adPage.phoneNumber')}
                  </label>
                  <input
                    type='tel'
                    id='phoneNumber'
                    name='phoneNumber'
                    value={formData.phoneNumber}
                    onChange={handleFormChange}
                    className='w-full py-2 px-3 border rounded-lg'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label htmlFor='email' className='block text-lg font-medium mb-2'>
                    {t('adPage.email')}
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleFormChange}
                    className='w-full py-2 px-3 border rounded-lg'
                    required
                  />
                </div>
                <div className='flex gap-2'>
                  <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'>
                    {t('adPage.submit')}
                  </button>
                  <Link href={jobPost.externalFormURL}>
                    <button className={`bg-blue-300 hover:bg-blue-700 text-white px-4 py-2 rounded`}>{t('adPage.redirect')}</button>
                  </Link>
                </div>
              </form>
            ) : null}
            <div className='flex gap-5'>
              <p>
                {t('adPage.viewed')} {jobPost.pageViewCount}
              </p>
              <p>
                {t('adPage.publishAt')} {jobPost?.created_at ? formatDate(jobPost.created_at) : 'N/A'}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <p>Loading...</p> // Display a loading message while jobPost is null
      )}
    </header>
  );
}
