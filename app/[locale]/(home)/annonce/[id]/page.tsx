import { getTranslations } from 'next-intl/server';

import { formatDate } from '@/utils';
import { Image, Label, Button, Toast, Tiptap } from '@/components';
import { ContactForm } from './form';
import type { ListingData, viewCounterDataType, viewCounterResponseType } from '@/types';
import { updateViewCount } from '@/lib/actions';

export default async function annoncePage({ params }: { params: { id: string } }) {
  const t = await getTranslations('app');
  const postId = params.id;

  const response = await fetch(
    process.env.NEXT_PRIVATE_PRODUCTION === 'true'? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/api/jobPost/${postId}`: process.env.NEXT_PRIVATE_URL + `/api/jobPost/${postId}`,
  );

  const { fetchedJobPostData } = await response.json();
  const jobPost: ListingData = fetchedJobPostData;
  // console.log(jobPost);

  // const viewCounterResponse = await updateViewCount({ itemId: params.id });
  const viewCounterResponse = await fetch(
    process.env.NEXT_PRIVATE_PRODUCTION === 'true'? process.env.NEXT_PRIVATE_PRODUCTION_URL + `/api/view/${params.id}`: process.env.NEXT_PRIVATE_URL + `/api/view/${params.id}`,
    { method: 'PUT' },
  );
  // console.log(viewCounterResponse);

  const { totalViewCount } = await viewCounterResponse.json();

  return (
    <header className='flex w-full justify-center bg-brand-lightbg py-4'>
      <section className='container flex flex-col gap-4'>
        <div className='flex flex-row items-center md:flex-row md:p-2'>
          <Image
            src={jobPost.companyId!.user_logo as string}
            alt='Yes Job'
            className='m-5 h-20 w-20 rounded-2xl bg-blue-200 object-contain md:h-24 md:w-24'
            unoptimized
          />
          <div className=''>
            <h6 className='text-base font-semibold md:text-lg'>{jobPost.title}</h6>
            <p className='text-base md:text-lg'>{jobPost.companyId?.user_name}</p>
          </div>
        </div>
        <div className='flex flex-wrap justify-center gap-2.5 py-4 md:justify-start md:py-1'>
          <Label text={jobPost.location} type='location' />
          {jobPost.salaryMin ? (
            <Label text={`${t('publishAds.from')} € ` + jobPost.salaryMin} type='salary' />
          ) : jobPost.salaryMax ? (
            <Label text={`${t('publishAds.to')} € ` + jobPost.salaryMax} type='salary' />
          ) : null}
          {jobPost.cdd ? <Label text='CDD' type='WorkDuration' /> : null}
          {jobPost.cdi ? <Label text='CDI' type='WorkDuration' /> : null}
          {jobPost.fullTime ? <Label text={t('listing.fullTime')} type='WorkDuration' /> : null}{' '}
          {jobPost.partTime ? <Label text={t('listing.partTime')} type='WorkDuration' /> : null}
          {jobPost.experience ? (
            <Label text={t('listing.experience')} type='noExp' className='block md:hidden lg:block' />
          ) : (
            <Label text={t('listing.noExperience')} type='noExp' className='block md:hidden lg:block' />
          )}
        </div>
        <div className='flex flex-col justify-center gap-2.5 py-4 md:justify-start md:py-1'>
          <h2 className='text-2xl font-semibold'>{t('adPage.description')}</h2>
          <Tiptap content={jobPost.description} editable={false} isDashboard={false} />
        </div>
        <div className='h-px w-full rounded bg-slate-300' />
        <ContactForm jobPost={jobPost} />
        <div className='flex gap-5'>
          <p>
            {t('adPage.viewed')} {totalViewCount}
          </p>
          <p>
            {t('adPage.publishAt')} {jobPost?.created_at ? formatDate(jobPost.created_at) : 'N/A'}
          </p>
        </div>
      </section>
    </header>
  );
}
