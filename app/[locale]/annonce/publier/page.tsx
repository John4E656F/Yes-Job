'use client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { BiUpload } from 'react-icons/bi';
import type { PublishData } from '@/types';
import { Image, FormInput, ImageUpload, FormSelect, FormCheckbox, FormRadio, FormTextarea } from '@/components';
import { supabase } from '@/supabase/supabase';
import { v4 as uuidv4 } from 'uuid';
import { getOrCreateCompanyId } from '@/utils/getOrCreateCompanyId';
import { useTranslations } from 'next-intl';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { publishFormResolver, type PublishFormInputs } from './publishFormResolver';
import { useForm, SubmitHandler } from 'react-hook-form';

enum ExperienceField {
  NoExperienceRequired = 'noExperienceRequired',
  ExperienceRequired = 'experienceRequired',
}

const PublishPage: React.FC = () => {
  const t = useTranslations('app');
  const router = useRouter();
  const user = useStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PublishFormInputs>({ resolver: publishFormResolver, mode: 'onBlur' });

  const [formData, setFormData] = useState<PublishData>({
    user_Id: '',
    companyName: '',
    logo: '',
    title: '',
    jobFunction: '',
    cdd: false,
    cdi: false,
    fullTime: false,
    partTime: false,
    experience: false,
    description: '',
    location: '',
    salaryMin: null,
    salaryMax: null,
    applicationMethod: 'yesJob',
    externalFormURL: '',
    contactName: '',
    contactEmail: '',
    pinned: false,
    pinned_at: null,
  });

  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [isExternalFormURLValid, setIsExternalFormURLValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    if (user && user.isCompany) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        user_Id: user.id || '',
        contactName: user.contactName || '',
        contactEmail: user.user_email || '',
        companyName: user.user_name || '',
        logo: user.user_logo || null,
      }));
      setLogoPreviewUrl(user.user_logo || null);
    }
  }, [user]);

  const options = [
    { value: '', label: t('jobFonction.default'), disabled: true },
    { value: 'waiter', label: t('jobFonction.waiter') },
    { value: 'cook', label: t('jobFonction.cook') },
    { value: 'chefDePartie', label: t('jobFonction.chefDePartie') },
    { value: 'chefCook', label: t('jobFonction.chefCook') },
    { value: 'bartender', label: t('jobFonction.bartender') },
    { value: 'dishwasher', label: t('jobFonction.dishwasher') },
    { value: 'shiftLeader', label: t('jobFonction.shiftLeader') },
    { value: 'cleaningStaff', label: t('jobFonction.cleaningStaff') },
    { value: 'restaurantManager', label: t('jobFonction.restaurantManager') },
    { value: 'hotelReceptionist', label: t('jobFonction.hotelReceptionist') },
    { value: 'hotelManager', label: t('jobFonction.hotelManager') },
    { value: 'hotelMaster', label: t('jobFonction.hotelMaster') },
    { value: 'pastryChef', label: t('jobFonction.pastryChef') },
    { value: 'deliveryDriver', label: t('jobFonction.deliveryDriver') },
    { value: 'other', label: t('jobFonction.other') },
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name as keyof PublishData]: event.target.checked });
    } else if (type === 'radio' && (name === 'applicationMethod' || name === 'experience')) {
      setFormData({ ...formData, [name as keyof PublishData]: value });
    } else {
      setFormData({ ...formData, [name as keyof PublishData]: value });
    }
  };
  // const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  //   const { name, value, type } = e.target;
  //   if (type === 'file') {
  //     const fileInput = e.target as HTMLInputElement;
  //     const selectedFile = fileInput.files?.[0];

  //     if (selectedFile) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         setFormData({ ...formData, logo: selectedFile });
  //         setLogoPreviewUrl(reader.result as string);
  //       };
  //       reader.readAsDataURL(selectedFile);
  //     }
  //   } else if (type === 'checkbox') {
  //     const checkboxInput = e.target as HTMLInputElement;
  //     setFormData({ ...formData, [name]: checkboxInput.checked });
  //   } else if (type === 'radio') {
  //     if (name === 'noExperienceRequired') {
  //       // For "Pas d'expérience requise" radio button
  //       setFormData({ ...formData, experience: false });
  //     } else if (name === 'experienceRequired') {
  //       // For "Expérience requise" radio button
  //       setFormData({ ...formData, experience: true });
  //     } else {
  //       setFormData({ ...formData, [name]: value });
  //     }
  //   } else {
  //     if (name === 'salaryMin' || name === 'salaryMax') {
  //       const newValue = parseInt(value, 10);
  //       if (!isNaN(newValue) && newValue >= 0) {
  //         setFormData({ ...formData, [name]: newValue });
  //       } else {
  //         // Handle invalid input (e.g., show an error message)
  //       }
  //     } else {
  //       setFormData({ ...formData, [name]: value });

  //       if (name === 'externalFormURL') {
  //         const urlPattern = /^((https?:\/\/)?(www\.)?)?[^\/]+[a-z]{2,}(\.[a-z]{2,})?(\/.*)?$/i;
  //         setIsExternalFormURLValid(urlPattern.test(value));
  //       }

  //       if (name === 'contactEmail') {
  //         const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //         setIsEmailValid(emailPattern.test(value));
  //       }
  //     }
  //   }
  // };

  const onSubmit = async (data: PublishFormInputs) => {
    reset();
    if (formData.logo instanceof File) {
      const fileExtension = formData.logo.name.split('.').pop();
      const filename = `${uuidv4()}.${fileExtension}`;

      try {
        // Upload the logo to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase.storage.from('logo').upload(filename, formData.logo, {
          cacheControl: '3600',
          upsert: false,
        });

        if (uploadError) {
          console.error('Error uploading logo:', uploadError.message);
          return;
        }

        const { data: publicUrlData } = await supabase.storage.from('logo').getPublicUrl(uploadData.path, { transform: { width: 50, height: 50 } });

        const publicUrl = publicUrlData.publicUrl;

        formData.logo = publicUrl;
      } catch (uploadError: any) {
        console.error('An error occurred while uploading the logo:', uploadError.message);
        return;
      }
    }

    try {
      if (formData.user_Id === '') {
        const companyId = await getOrCreateCompanyId(formData.companyName, formData.contactEmail, formData.logo, formData.contactName);
        setFormData((prevFormData) => ({
          ...prevFormData,
          user_Id: companyId,
        }));
      }

      const { data: insertData, error: insertError } = await supabase.from('jobPosting').insert({
        companyId: formData.user_Id,
        title: formData.title,
        jobFunction: formData.jobFunction,
        cdd: formData.cdd,
        cdi: formData.cdi,
        fullTime: formData.fullTime,
        partTime: formData.partTime,
        description: formData.description,
        experience: formData.experience,
        location: formData.location,
        salaryMin: formData.salaryMin,
        salaryMax: formData.salaryMax,
        applicationMethod: formData.applicationMethod,
        externalFormURL: formData.externalFormURL,
        pinned: true,
        prinned_at: new Date().toISOString(),
      });

      if (insertError) {
        console.error('Error inserting job posting:', insertError.message);
        return;
      }
      router.push('/');
      console.log('Form data submitted successfully:', insertData);
    } catch (error: any) {
      console.error('An error occurred:', error.message);
    }

    setFormData({
      companyName: '',
      logo: null,
      title: '',
      jobFunction: '',
      cdd: false,
      cdi: false,
      fullTime: false,
      partTime: false,
      experience: false,
      description: '',
      location: '',
      salaryMin: null,
      salaryMax: null,
      applicationMethod: 'yesJob',
      externalFormURL: '',
      contactName: '',
      contactEmail: '',
    });
  };

  return (
    <header className='w-full flex justify-center bg-brand-lightbg'>
      <form className='flex flex-col container w-full lg:max-w-5xl  py-4 md:py-16 gap-16' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-4xl font-semibold'>{t('publishAds.title')}</h2>
        <div className='flex flex-col bg-white p-4 lg:p-8 gap-6'>
          <h3 className='text-2xl font-semibold'>{t('publishAds.infoCompany')}</h3>
          <div className='flex flex-col gap-3'>
            <FormInput
              label={t('publishAds.companyName')}
              type='text'
              register={register('companyName')}
              error={errors.companyName}
              placeholder='Quick, McDonald ...'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <ImageUpload label={t('publishAds.companyLogo')} register={register('logo')} error={errors.logo} />
          </div>
          <div className='w-full h-px bg-slate-300 rounded' />
          <h2 className='text-2xl font-semibold'>{t('publishAds.infoAds')}</h2>
          <div className='flex flex-col gap-3'>
            <FormInput
              label={t('publishAds.adsTitle')}
              type='text'
              register={register('title')}
              error={errors.title}
              placeholder={t('publishAds.adsTitlePlaceholder')}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <FormSelect
              register={register('jobFunction', { required: true })}
              error={errors.jobFunction}
              label={t('publishAds.adsPosition')}
              options={options}
            />
          </div>
          <div className='flex flex-col md:flex-row justify-between gap-2'>
            <div className='flex flex-col gap-3'>
              <label className='text-lg font-medium'>{t('publishAds.contractDuration')}</label>
              <div className='flex flex-row gap-8 justify-evenly '>
                <FormCheckbox register={register('cdd')} error={errors.cdd} label='CDD' subText={t('publishAds.CDD')} />
                <FormCheckbox register={register('cdi')} error={errors.cdi} label='CDI' subText={t('publishAds.CDI')} />
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <label className='text-lg font-medium'>{t('publishAds.workDuration')}</label>
              <div className='flex flex-row gap-8 justify-evenly'>
                <FormCheckbox register={register('fullTime')} error={errors.fullTime} label={t('listing.fullTime')} />
                <FormCheckbox register={register('partTime')} error={errors.partTime} label={t('listing.partTime')} />
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <label className='text-lg font-medium'>{t('publishAds.experience')}</label>
              <div className='flex flex-row gap-8 justify-evenly '>
                <div className='flex mb-4 '>
                  <input
                    className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                    name='noExperienceRequired'
                    checked={!formData.experience}
                    onChange={handleInputChange}
                    type='radio'
                  />
                  <label htmlFor='default-checkbox' className='ml-2 text-sm text-gray-900 '>
                    <p className='font-medium'>{t('listing.noExperience')}</p>
                  </label>
                </div>
                <div className='flex mb-4'>
                  <input
                    className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                    name='experienceRequired'
                    checked={formData.experience}
                    onChange={handleInputChange}
                    type='radio'
                  />
                  <label htmlFor='default-checkbox' className='ml-2 text-sm text-gray-900 '>
                    <p className='font-medium'>{t('listing.experience')}</p>
                  </label>
                </div>
              </div>
              <div className='flex flex-row gap-8 justify-evenly '>
                <FormRadio
                  name='experience'
                  register={register('experience')}
                  error={errors.experience}
                  label={t('listing.noExperience')}
                  value='false'
                />
                <FormRadio
                  name='experience'
                  register={register('experience')}
                  error={errors.experience}
                  label={t('listing.experience')}
                  value='true'
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 w-full'>
            <label className='text-lg font-medium'>{t('publishAds.salary')}</label>
            <div className='flex flex-row gap-3 justify-between'>
              <FormInput label={t('publishAds.from')} type='number' register={register('salaryMin')} error={errors.salaryMin} />
              <FormInput label={t('publishAds.to')} type='number' register={register('salaryMax')} error={errors.salaryMax} />
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <FormTextarea
              register={register('description')}
              error={errors.description}
              label={t('publishAds.description')}
              placeholder={t('publishAds.descPlaceholder')}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <FormInput
              label={t('publishAds.placeOfWork')}
              type='text'
              register={register('location', { required: true })}
              error={errors.salaryMax}
              placeholder={t('publishAds.placeOfWorkPlaceholder')}
            />
          </div>
          <div className='w-full h-px bg-slate-300 rounded' />
          <h2 className='text-2xl font-semibold'>{t('publishAds.application')}</h2>
          <h3 className='text-md'>{t('publishAds.howTo')}</h3>
          <div className='flex mb-4'>
            <input
              className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
              name='applicationMethod'
              value='yesJob'
              checked={formData.applicationMethod === 'yesJob'}
              onChange={handleInputChange}
              type='radio'
            />
            <div className='flex flex-col'>
              <label htmlFor='default-checkbox' className='ml-2 text-sm font-medium text-gray-900 '>
                {t('publishAds.viaYesJob')}
              </label>
              <h5 className='text-xs pl-2'>{t('publishAds.viaYesJobSub')}</h5>
            </div>
          </div>
          <div className='flex flex-col mb-4'>
            <div className='flex '>
              <input
                className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                name='applicationMethod'
                value='externalForm'
                checked={formData.applicationMethod === 'externalForm'}
                onChange={handleInputChange}
                type='radio'
              />
              <div className='flex flex-col'>
                <label htmlFor='default-checkbox' className='ml-2 text-sm font-medium text-gray-900 '>
                  {t('publishAds.viaExterne')}
                </label>
                <h5 className='text-xs pl-2'>{t('publishAds.viaExterneSub')}</h5>
              </div>
            </div>
            {formData.applicationMethod === 'externalForm' && (
              <>
                <input
                  className='mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  name='externalFormURL'
                  value={formData.externalFormURL}
                  onChange={handleInputChange}
                  type='text'
                  placeholder={t('publishAds.viaExternePlaceholder')}
                  required
                />
                {!isExternalFormURLValid && <p className='text-red-500 text-sm'>{t('publishAds.viaExterneValidation')}</p>}
              </>
            )}
          </div>
          <div className='flex flex-col mb-4'>
            <div className='flex '>
              <input
                className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                name='applicationMethod'
                value='both'
                checked={formData.applicationMethod === 'both'}
                onChange={handleInputChange}
                type='radio'
              />
              <div className='flex flex-col'>
                <label htmlFor='default-checkbox' className='ml-2 text-sm font-medium text-gray-900 '>
                  {t('publishAds.viaBoth')}
                </label>
                <h5 className='text-xs pl-2'>{t('publishAds.viaBothSub')}</h5>
              </div>
            </div>
            {formData.applicationMethod === 'both' && (
              <>
                <input
                  className='mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  name='externalFormURL'
                  value={formData.externalFormURL}
                  onChange={handleInputChange}
                  type='text'
                  placeholder={t('publishAds.viaExternePlaceholder')}
                  required
                />
                {!isExternalFormURLValid && <p className='text-red-500 text-sm'>Veuillez entrer une URL valide.</p>}
              </>
            )}
          </div>
          {user && user.isCompany === true ? null : (
            <>
              <div className='w-full h-px bg-slate-300 rounded' />
              <h2 className='text-2xl font-semibold'>{t('publishAds.contactDetails')}</h2>
              <h3 className='text-md '>{t('publishAds.contactDetailsSub')}</h3>
              <div className='flex flex-col gap-3'>
                <label className='text-lg font-medium'>{t('publishAds.contactDetailsName')}</label>
                {/* <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  name='contactName'
                  value={formData.contactName}
                  onChange={handleInputChange}
                  type='text'
                  placeholder='Lenny De Wolf'
                /> */}
              </div>
              <div className='flex flex-col gap-3'>
                <label className='text-lg font-medium'>{t('publishAds.contactDetailsEmail')}</label>
                {/* <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  name='contactEmail'
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  type='text'
                  placeholder='recrument@mcdonalds.be'
                /> */}
                {!isEmailValid && <p className='text-red-500 text-sm'>{t('publishAds.contactDetailsEmailValidation')}</p>}
              </div>
            </>
          )}
        </div>

        <button
          type='submit'
          className='w-full md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200  '
        >
          {t('cta.publishFree')}
        </button>
      </form>
    </header>
  );
};

export default PublishPage;
