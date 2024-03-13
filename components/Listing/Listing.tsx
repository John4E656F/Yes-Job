'use client';
import React, { useEffect, useState } from 'react';
import { SearchBar, ListingCard, Pagination } from '../';
import type { ListingData } from '@/types';
import { createClient } from '@/utils/supabase/client';
import { useTranslations } from 'next-intl';

export function Listing() {
  const t = useTranslations('app');
  const [jobPosts, setJobPosts] = useState<ListingData[]>([]);
  const [totalJobOffers, setTotalJobOffers] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

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
          company:company(*)
        `,
          )
          .eq('published', true)
          .eq('expired', false)
          .order('published_at', { ascending: false }) // Then order bys most recent if false
          .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);
        // console.log(data); log data from s

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

  useEffect(() => {
    setTotalPages(Math.ceil(totalJobOffers / postsPerPage));
  }, [totalJobOffers, postsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          {/* <SearchBar /> test this firts*/}
        </div>
        <div className='flex flex-col gap-4'>
          {jobPosts.map((jobPost) => (
            <ListingCard key={jobPost.id} jobPost={jobPost} />
          ))}
        </div>
        <Pagination total={totalPages} current={currentPage} onChange={handlePageChange} />
      </div>
    </section>
  );
}
