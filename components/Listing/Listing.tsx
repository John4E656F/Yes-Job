'use client';
import React, { useEffect, useState } from 'react';
import { SearchBar, ListingCard } from '../';
import type { ListingData } from '@/types';
import { createClient } from '@/utils/supabase/client';
import { useTranslations } from 'next-intl';

export function Listing() {
  const t = useTranslations('app');
  const [jobPosts, setJobPosts] = useState<ListingData[]>([]);
  const [totalJobOffers, setTotalJobOffers] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 10;

  useEffect(() => {
    const supabase = createClient();
    const fetchJobPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('jobPosting')
          .select(
            `
          *,
          companyId:users ( user_name, user_email, user_logo, user_total_request_count, isCompany ) ,
          company:company(*)
        `,
          )
          .eq('published', true)
          .eq('expired', false)
          .order('pinned', { ascending: false }) // Order pinned posts first
          .order('published_at', { ascending: false }) // Then order by most recent
          .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);
        // console.log(data);

        if (error) {
          console.error('Error fetching job posts:', error.message);
        } else {
          setJobPosts(data || []);
        }
      } catch (error: any) {
        console.error('An error occurred:', error.message);
      }
    };

    const fetchTotalJobOffers = async () => {
      try {
        const { count, error } = await supabase.from('jobPosting').select('id', { count: 'exact' }).eq('published', true);
        if (error) {
          console.error('Error fetching total job offers:', error.message);
        } else {
          setTotalJobOffers(count || 0);
        }
      } catch (error: any) {
        console.error('An error occurred:', error.message);
      }
    };

    fetchJobPosts();
    fetchTotalJobOffers();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className='w-full flex justify-center bg-brand-lightbg'>
      <div className='flex flex-col container py-4 md:py-16 gap-16'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-5'>
            <h3 className='text-base font-medium'>
              {totalJobOffers} {t('listing.jobOffers')}
            </h3>
            <h4 className='text-4xl font-semibold'>{t('listing.title')}</h4>
          </div>
          {/* <SearchBar /> */}
        </div>
        <div className='flex flex-col gap-4'>
          {jobPosts.map((jobPost) => (
            <ListingCard key={jobPost.id} jobPost={jobPost} />
          ))}
        </div>
        <div className='flex justify-between'>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={jobPosts.length < postsPerPage}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${jobPosts.length < postsPerPage ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
