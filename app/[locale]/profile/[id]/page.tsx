'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabase';
import { Image, Link, ListingCard } from '@/components';
import type { UsersTypes, FormData } from '@/types';
import { useStore } from '@/lib/store';
import { HiUser } from 'react-icons/hi2';
import { useTranslations } from 'next-intl';

export default function ProfilePage({ params }: { params: { id: number } }) {
  const t = useTranslations('app');
  const [userData, setUserData] = useState<UsersTypes>();
  const [userPosts, setUserPosts] = useState<FormData[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const storedUserData = useStore((state) => state);

  useEffect(() => {
    const fetchUserDataAndPosts = async () => {
      try {
        let fetchedUserData;

        if (!fetchedUserData) {
          const { data, error } = await supabase.from('users').select('*').eq('id', params.id).single();

          if (error) {
            console.error('Error fetching user:', error.message);
            return;
          }

          fetchedUserData = data;
        }

        setIsOwner(storedUserData?.id === fetchedUserData?.id);

        if (storedUserData?.id !== fetchedUserData?.id) {
          setUserData(fetchedUserData);
        } else {
          setUserData(storedUserData);
        }

        if (fetchedUserData && fetchedUserData.isCompany) {
          const { data: postsData, error: postsError } = await supabase.from('jobPosting').select('*').eq('companyId', params.id);

          if (postsError) {
            console.error('Error fetching posts:', postsError.message);
            return;
          }

          setUserPosts(postsData || []);
        }
      } catch (error: any) {
        console.error('An error occurred:', error.message);
      }
    };

    fetchUserDataAndPosts();
  }, [params.id, storedUserData]);
  console.log(userPosts);

  return (
    <header className='w-full flex justify-center py-4 bg-brand-lightbg'>
      <section className='container bg-white flex flex-col py-4 gap-4'>
        <div className='flex p-4 lg:p-8 gap-6'>
          {userData?.user_logo ? (
            <Image src={userData.user_logo} alt='user avatar' width={100} height={100} className='rounded-full p-1 ring-2 ring-gray-300' />
          ) : (
            <HiUser size={100} className='rounded-full p-1 ring-2 ring-gray-300 text-gray-400' aria-label='profile user avatar' />
          )}
          <div className='flex flex-col justify-center'>
            <h2 className='text-base font-semibold md:text-lg'>{userData?.user_name}</h2>
            <h3 className='text-base md:text-lg'>{userData?.user_email}</h3>
          </div>
        </div>
        <div className='w-full h-px bg-slate-300 rounded' />
        {isOwner ? (
          userPosts.map((jobPost) => {
            const adaptedJobPost = {
              ...jobPost, // spread all existing jobPost properties
              companyId: {
                user_name: userData!.user_name || '',
                user_email: userData!.user_email || '',
                user_logo: userData!.user_logo,
                isCompany: userData!.isCompany,
              },
            };
            return <ListingCard key={jobPost.id} jobPost={adaptedJobPost} t={t} />;
          })
        ) : (
          <div></div>
        )}
      </section>
    </header>
  );
}
