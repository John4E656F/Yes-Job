export interface CompanyTypes {
  owner_id: string | undefined;
  teamMembers: [string] | null;
  jobListings: [string] | null;
  name: string;
  logo: string;
  website?: string | null;
  phone?: string | number | null;
  total_request_count: number;
  isCompany: boolean;
  availableJobListing?: number | null;
  availablePromotion?: number | null;
  created_at: string;
}
