'use client';
import React, { useState, useEffect } from 'react';
import { SearchBar, ListingCard } from '../';
import type { FormData } from '@/types';
import { supabase } from '@/supabase/supabase';
import { useTranslations } from 'next-intl';

export function Listing() {
  const t = useTranslations('app');
  const [jobPosts, setJobPosts] = useState<FormData[]>([]);
  const [totalJobOffers, setTotalJobOffers] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 10; // Number of job posts to display per page

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('jobPosting')
          .select(
            `
          *,
          companyId:users ( user_name, user_email, user_logo, user_total_request_count, isCompany ) 
        `,
          )
          .order('pinned', { ascending: false }) // Order pinned posts first
          .order('created_at', { ascending: false }) // Then order by most recent
          .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);

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
        const { count, error } = await supabase.from('jobPosting').select('id', { count: 'exact' });
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
            <ListingCard key={jobPost.id} jobPost={jobPost} t={t} />
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
