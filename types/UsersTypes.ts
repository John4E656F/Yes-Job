export interface UsersTypes {
  user_email: string | undefined;
  user_logo: string;
  user_name: string;
  contactName?: string;
  user_total_request_count?: number;
  isCompany: boolean;
  created_at: string;
  id: string;
  user_id: string | null;
  phone?: string | number | null;
  confirmed_at?: string;
  countryCode?: string | null;
}
