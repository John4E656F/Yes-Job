export interface UsersTypes {
  user_email: string | undefined;
  user_logo: string;
  user_name: string;
  contactName?: string;
  company_id?: string;
  created_at: string;
  id: string;
  user_id: string | null;
  phone?: string | number | null;
  confirmed_at?: string;
  countryCode?: string | null;
  availableJobListing?: number | null;
  availablePromotion?: number | null;
}
