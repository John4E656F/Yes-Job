export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      job_posting: {
        Row: {
          applicationMethod: string;
          cdd: boolean;
          cdi: boolean;
          companyName: string;
          contactEmail: string;
          contactName: string;
          createdAt: string | null;
          description: string;
          experience: boolean;
          externalFormURL: string;
          fullTime: boolean;
          id: number;
          jobFunction: string;
          location: string;
          logo: string | null;
          partTime: boolean;
          salaryMax: number | null;
          salaryMin: number | null;
          title: string;
        };
        Insert: {
          applicationMethod?: string;
          cdd?: boolean;
          cdi?: boolean;
          companyName?: string;
          contactEmail?: string;
          contactName?: string;
          createdAt?: string | null;
          description?: string;
          experience?: boolean;
          externalFormURL?: string;
          fullTime?: boolean;
          id?: number;
          jobFunction?: string;
          location?: string;
          logo?: string | null;
          partTime?: boolean;
          salaryMax?: number | null;
          salaryMin?: number | null;
          title?: string;
        };
        Update: {
          applicationMethod?: string;
          cdd?: boolean;
          cdi?: boolean;
          companyName?: string;
          contactEmail?: string;
          contactName?: string;
          createdAt?: string | null;
          description?: string;
          experience?: boolean;
          externalFormURL?: string;
          fullTime?: boolean;
          id?: number;
          jobFunction?: string;
          location?: string;
          logo?: string | null;
          partTime?: boolean;
          salaryMax?: number | null;
          salaryMin?: number | null;
          title?: string;
        };
        Relationships: [];
      };
      jobPosting: {
        Row: {
          applicationMethod: string;
          cdd: boolean;
          cdi: boolean;
          companyId: string;
          created_at: string;
          description: string;
          experience: boolean;
          externalFormURL: string;
          fullTime: boolean;
          id: string;
          jobFunction: string;
          location: string;
          pageViewCount: number;
          partTime: boolean;
          promoted: boolean;
          promoted_at: string | null;
          requestCount: number;
          salaryMax: number | null;
          salaryMin: number | null;
          title: string;
        };
        Insert: {
          applicationMethod?: string;
          cdd?: boolean;
          cdi?: boolean;
          companyId: string;
          created_at?: string;
          description?: string;
          experience?: boolean;
          externalFormURL?: string;
          fullTime?: boolean;
          id?: string;
          jobFunction?: string;
          location?: string;
          pageViewCount?: number;
          partTime?: boolean;
          promoted?: boolean;
          promoted_at?: string | null;
          requestCount?: number;
          salaryMax?: number | null;
          salaryMin?: number | null;
          title?: string;
        };
        Update: {
          applicationMethod?: string;
          cdd?: boolean;
          cdi?: boolean;
          companyId?: string;
          created_at?: string;
          description?: string;
          experience?: boolean;
          externalFormURL?: string;
          fullTime?: boolean;
          id?: string;
          jobFunction?: string;
          location?: string;
          pageViewCount?: number;
          partTime?: boolean;
          promoted?: boolean;
          promoted_at?: string | null;
          requestCount?: number;
          salaryMax?: number | null;
          salaryMin?: number | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'jobPosting_companyId_fkey';
            columns: ['companyId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          contactName: string;
          countryCode: string | null;
          created_at: string;
          id: string;
          isCompany: boolean;
          phone: number | null;
          user_email: string;
          user_id: string;
          user_logo: string;
          user_name: string;
          user_total_request_count: number;
        };
        Insert: {
          contactName?: string;
          countryCode?: string | null;
          created_at?: string;
          id?: string;
          isCompany?: boolean;
          phone?: number | null;
          user_email?: string;
          user_id?: string;
          user_logo?: string;
          user_name: string;
          user_total_request_count?: number;
        };
        Update: {
          contactName?: string;
          countryCode?: string | null;
          created_at?: string;
          id?: string;
          isCompany?: boolean;
          phone?: number | null;
          user_email?: string;
          user_id?: string;
          user_logo?: string;
          user_name?: string;
          user_total_request_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'users_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
