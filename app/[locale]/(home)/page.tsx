import { Hero, Listing } from '@/components';

export const dynamic = 'force-dynamic';

export default function Index() {
  return (
    <div className='w-full items-center justify-center'>
      <Hero />
      {/* <Listing /> */}
    </div>
  );
}
