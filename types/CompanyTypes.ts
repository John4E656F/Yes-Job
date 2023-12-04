export interface CompanyTypes {
  id?: string;
  owner_id: string | undefined;
  teamMembers: [string] | null;
  jobListings?: [string] | null;
  name: string;
  logo: string;
  website?: string | null;
  phone?: string | null;
  total_request_count?: number;
  availableJobListing?: number | null;
  availableBoost?: number | null;
  created_at?: string;
}
