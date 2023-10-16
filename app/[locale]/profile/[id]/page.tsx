'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabase';
import { Image, Label, Link } from '@/components';
import type { UsersTypes, FormData } from '@/types';
import { useStore } from '@/lib/store';
import { HiArrowLongLeft, HiUser } from 'react-icons/hi2';

export default function ProfilePage({ params }: { params: { id: number } }) {
  const [userData, setUserData] = useState<UsersTypes>();
  const [userPosts, setUserPosts] = useState<FormData[]>([]);
  const storedUserData = useStore((state) => state);

  useEffect(() => {
    const fetchUserDataAndPosts = async () => {
      try {
        let fetchedUserData = storedUserData;

        // If userData is not in store, fetch it
        if (!fetchedUserData) {
          const { data, error } = await supabase.from('users').select('*').eq('id', params.id).single();

          if (error) {
            console.error('Error fetching user:', error.message);
            return;
          }

          fetchedUserData = data;
        }
        console.log(fetchedUserData);

        setUserData(fetchedUserData);

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
  }, [params.id, storedUserData]); // Dependency array - fetch data when id changes

  return (
    <header className='w-full flex justify-center py-4 bg-brand-lightbg'>
      <section className='container flex flex-col gap-4'>
        <Link href='/' className='flex items-center gap-1 pl-5'>
          <HiArrowLongLeft size={20} />
          Back
        </Link>
        <div className='flex bg-white p-4 lg:p-8 gap-6'>
          {userData?.user_logo ? (
            <Image src={userData.user_logo} alt='user avatar' width={100} height={100} className='rounded-full p-1 ring-2 ring-gray-300' />
          ) : (
            <HiUser size={100} className='rounded-full p-1 ring-2 ring-gray-300 text-gray-400' aria-label='profile user avatar' />
          )}
          <div>
            <h2>{userData?.user_name}</h2>
            <h3>{userData?.user_email}</h3>
          </div>
        </div>
      </section>
    </header>
  );
}
