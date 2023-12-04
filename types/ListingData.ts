export interface PublishData {
  id?: string;
  user_Id?: string;
  companyName: string;
  logo: string | File | null;
  title: string;
  jobFunction: string;
  cdd: boolean;
  cdi: boolean;
  fullTime: boolean;
  partTime: boolean;
  experience: boolean;
  description: string;
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  applicationMethod: 'yesJob' | 'externalForm' | 'both';
  externalFormURL: string;
  contactName: string;
  contactEmail: string;
  pinned?: boolean;
  pinned_at?: string | null;
}

export interface ListingData extends PublishData {
  company_id: string;
  company: {
    name: string;
    website: string;
    logo: string;
    owner_id: string | null;
    teamMembers: string[];
    phone?: string | number | null;
    total_request_count?: number | null;
    availableJobListing?: number | null;
    availableBoost?: number | null;
  };
  created_at?: string;
  requestCount?: number;
  pageViewCount?: number;
  promoted?: boolean;
  promoted_at?: string | null;
  published?: boolean;
  published_at?: string | null;
  expired?: boolean;
}
