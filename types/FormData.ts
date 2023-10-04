export interface FormData {
  companyName: string;
  logo: File | null;
  title: string;
  jobFunction: string;
  cdd: boolean;
  cdi: boolean;
  fullTime: boolean;
  partTime: boolean;
  description: string;
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  applicationMethod: 'yesJob' | 'externalForm' | 'both';
  externalFormURL: string;
  contactName: string;
  contactEmail: string;
}
