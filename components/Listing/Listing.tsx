// import React, { useEffect, useRef } from 'react';
import { SearchBar, ListingCard } from '../';
import type { ListingData } from '@/types';
// import { supabase } from '@/supabase/supabase';
import { useTranslations } from 'next-intl';

export function Listing() {
  const t = useTranslations('app');
  // const jobPostsRef = useRef<ListingData[]>([]);
  // const totalJobOffersRef = useRef<number>(0);
  // const currentPageRef = useRef(1);

  const postsPerPage = 10; // Number of job posts to display per page

  // useEffect(() => {
  //   const fetchJobPosts = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from('jobPosting')
  //         .select(
  //           `
  //         *,
  //         companyId:users ( user_name, user_email, user_logo, user_total_request_count, isCompany )
  //       `,
  //         )
  //         .order('pinned', { ascending: false }) // Order pinned posts first
  //         .order('created_at', { ascending: false }) // Then order by most recent
  //         .range((currentPageRef.current - 1) * postsPerPage, currentPageRef.current * postsPerPage - 1);

  //       if (error) {
  //         console.error('Error fetching job posts:', error.message);
  //       } else {
  //         jobPostsRef.current = data || [];
  //       }
  //     } catch (error: any) {
  //       console.error('An error occurred:', error.message);
  //     }
  //   };

  //   const fetchTotalJobOffers = async () => {
  //     try {
  //       const { count, error } = await supabase.from('jobPosting').select('id', { count: 'exact' });
  //       if (error) {
  //         console.error('Error fetching total job offers:', error.message);
  //       } else {
  //         totalJobOffersRef.current = count || 0;
  //       }
  //     } catch (error: any) {
  //       console.error('An error occurred:', error.message);
  //     }
  //   };

  //   fetchJobPosts();
  //   fetchTotalJobOffers();
  // }, [currentPageRef]);

  // const handleNextPage = () => {
  //   currentPageRef.current += 1;
  // };

  // const handlePreviousPage = () => {
  //   if (currentPageRef.current > 1) {
  //     currentPageRef.current -= 1;
  //   }
  // };

  return (
    <section className='w-full flex justify-center bg-brand-lightbg'>
      {/* <div className='flex flex-col container py-4 md:py-16 gap-16'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-5'>
            <h3 className='text-base font-medium'>
              {totalJobOffersRef.current} {t('listing.jobOffers')}
            </h3>
            <h4 className='text-4xl font-semibold'>{t('listing.title')}</h4>
          </div> */}
      {/* <SearchBar /> */}
      {/* </div>
        <div className='flex flex-col gap-4'>
          {jobPostsRef.current.map((jobPost) => (
            <ListingCard key={jobPost.id} jobPost={jobPost} t={t} />
          ))}
        </div>
        <div className='flex justify-between'>
          <button
            onClick={handlePreviousPage}
            disabled={currentPageRef.current === 1}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${currentPageRef.current === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={jobPostsRef.current.length < postsPerPage}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${jobPostsRef.current.length < postsPerPage ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </div>
      </div> */}
    </section>
  );
}
