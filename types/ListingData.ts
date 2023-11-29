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
  companyId: {
    user_name: string;
    user_email: string;
    user_logo: string;
    isCompany?: boolean;
    user_id: string | null;
    phone?: string | number | null;
    confirmed_at?: string;
    countryCode?: string | null;
    availableJobListing?: number | null;
    availablePromotion?: number | null;
  };
  company: {
    name: string;
    logo: string;
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
