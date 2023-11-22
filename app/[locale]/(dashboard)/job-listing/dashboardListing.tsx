import { Link, Divider, DashboardListingCard } from '@/components';
import type { UsersTypes, ListingData, dashboardViewCounterDisplayType } from '@/types';
import { RiFileList3Line } from 'react-icons/ri';
export const DashboardListing = ({ jobPost }: { jobPost: ListingData[] }) => {
  return (
    <>
      {jobPost ? (
        <div className='flex flex-col gap-4'>
          {jobPost.map((jobPost) => (
            <DashboardListingCard key={jobPost.id} jobPost={jobPost} />
          ))}
          <div className='flex flex-col gap-2 p-2 items-center border border-brand-lightbg rounded'>
            <span className='p-3 border border-brand-gray rounded-md'>
              <RiFileList3Line size={28} />
            </span>
            <div className='flex flex-col gap- text-center'>
              <p className='text-sm font-medium'>Need to list more job ?</p>
              <p className='text-sm'>Upgrade your account and get to list more job vacancy</p>
            </div>
            <Link
              href='/annonce/publier'
              className='flex items-center justify-center text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
            >
              <button type='button' className='px-4 h-11 text-sm'>
                Upgrade
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-3 p-5 items-center border border-brand-lightbg rounded'>
          <span className='p-3 border border-brand-gray rounded-md'>
            <RiFileList3Line size={28} />
          </span>
          <div className='flex flex-col gap- text-center'>
            <p className='text-sm font-medium'>Post your first job vacancy!</p>
            <p className='text-sm'>Your first 2 job listing are free</p>
          </div>
          <Link
            href='/annonce/publier'
            className='flex items-center justify-center text-center bg-brand-primary text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
          >
            <button type='button' className='px-4 h-11 text-sm'>
              Post a job
            </button>
          </Link>
        </div>
      )}
    </>
  );
};
