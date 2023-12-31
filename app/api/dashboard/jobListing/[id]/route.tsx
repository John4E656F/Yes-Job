'use server';
import { createClient } from '@/utils/supabase/server';
import { UsersTypes, CompanyTypes, ListingData, viewCounterDataType, dashboardViewCounterDisplayType } from '@/types';
import { NextResponse } from 'next/server';
import { differenceInHours, differenceInDays, differenceInMonths } from 'date-fns';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const ownerId = params.id;

  try {
    // Fetch user data
    const { data: fetchedUserData, error: userError } = await supabase.from('users').select('*').eq('user_id', ownerId).single();
    // console.log('fetchedUserData', fetchedUserData);

    if (fetchedUserData) {
      const userData = fetchedUserData as UsersTypes;
      const { data: fetchedCompanyData, error: companyError } = await supabase.from('company').select('*').eq('owner_id', userData.id).single();
      // console.log('fetchedCompanyData', fetchedCompanyData);

      if (companyError) {
        // throw new Error('Failed to fetch company data: ' + companyError.message);
        // console.log('Failed to fetch company data: ' + companyError.message);

        return NextResponse.json({ fetchedUserData: fetchedUserData as UsersTypes, error: 'Failed to fetch company data: ' + companyError.message });
      } else if (fetchedCompanyData) {
        const companyData = fetchedCompanyData as CompanyTypes;
        // Fetch job listing data
        const { data: fetchedJobPostData, error: jobError } = await supabase
          .from('jobPosting')
          .select(
            `
        *,
        company:company(*)
      `,
          )
          .eq('company_id', companyData.id);

        if (jobError) {
          return NextResponse.json({ error: 'Failed to fetch job listing data: ' + jobError.message });
        } else if (fetchedJobPostData) {
          let totalViewCount24Hours = 0;
          let totalViewCount7Days = 0;
          let totalViewCount30Days = 0;

          // Retrieve view count data for each job post
          for (const jobPost of fetchedJobPostData) {
            const { data: fetchedViewCount, error: fetchError } = await supabase.from('viewCounter').select('*').eq('item_id', jobPost.id);

            if (!fetchError) {
              const currentDate = new Date();
              fetchedViewCount.forEach((view: viewCounterDataType) => {
                const viewedDate = new Date(view.viewed_at);

                //NOTE: This is a temporary fix for the view count bug. Need to find a better solution
                // Calculate view counts based on time intervals
                if (differenceInHours(currentDate, viewedDate) >= 24) {
                  totalViewCount24Hours += view.view_count;
                }
                if (differenceInDays(currentDate, viewedDate) >= 7) {
                  totalViewCount7Days += view.view_count;
                }
                if (differenceInMonths(currentDate, viewedDate) >= 1) {
                  totalViewCount30Days += view.view_count;
                }
              });
            }
          }

          const viewCount: dashboardViewCounterDisplayType = {
            totalViewCount24Hours,
            totalViewCount7Days,
            totalViewCount30Days,
          };

          return NextResponse.json({
            fetchedUserData: fetchedUserData as UsersTypes,
            fetchedCompanyData: fetchedCompanyData as CompanyTypes,
            fetchedJobPostData: fetchedJobPostData as ListingData[],
            viewCount,
          });
        }
      }
    }
  } catch (error: any) {
    return NextResponse.json(error.message);
  }
}
