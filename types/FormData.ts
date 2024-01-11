export interface FormData {
  id?: number;
  user_Id?: string;
  companyId?: {
    user_name: string;
    user_email: string;
    user_logo: string;
    isCompany?: boolean;
  };
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
  created_at?: string;
  requestCount?: number;
  pageViewCount?: number;
  cvFile?: File | null;
  promoted?: boolean;
  promoted_at?: string | null;
}
