export interface UsersTypes {
  user_email: string;
  user_name: string;
  firstname: string;
  lastname: string;
  company_id?: string;
  created_at: string;
  id: string;
  user_id: string | null;
  phone?: number | null;
  confirmed_at?: string;
  countryCode?: string | null;
  availableJobListing?: number | null;
  availablePromotion?: number | null;
  profile_picture: string;
}
