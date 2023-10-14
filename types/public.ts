export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      company: {
        Row: {
          company_email: string
          companyLogo: string
          companyName: string
          companyTotalRequestCount: number
          contactName: string
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          company_email?: string
          companyLogo?: string
          companyName: string
          companyTotalRequestCount?: number
          contactName?: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          company_email?: string
          companyLogo?: string
          companyName?: string
          companyTotalRequestCount?: number
          contactName?: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      job_posting: {
        Row: {
          applicationMethod: string
          cdd: boolean
          cdi: boolean
          companyName: string
          contactEmail: string
          contactName: string
          createdAt: string | null
          description: string
          experience: boolean
          externalFormURL: string
          fullTime: boolean
          id: number
          jobFunction: string
          location: string
          logo: string | null
          partTime: boolean
          salaryMax: number | null
          salaryMin: number | null
          title: string
        }
        Insert: {
          applicationMethod?: string
          cdd?: boolean
          cdi?: boolean
          companyName?: string
          contactEmail?: string
          contactName?: string
          createdAt?: string | null
          description?: string
          experience?: boolean
          externalFormURL?: string
          fullTime?: boolean
          id?: number
          jobFunction?: string
          location?: string
          logo?: string | null
          partTime?: boolean
          salaryMax?: number | null
          salaryMin?: number | null
          title?: string
        }
        Update: {
          applicationMethod?: string
          cdd?: boolean
          cdi?: boolean
          companyName?: string
          contactEmail?: string
          contactName?: string
          createdAt?: string | null
          description?: string
          experience?: boolean
          externalFormURL?: string
          fullTime?: boolean
          id?: number
          jobFunction?: string
          location?: string
          logo?: string | null
          partTime?: boolean
          salaryMax?: number | null
          salaryMin?: number | null
          title?: string
        }
        Relationships: []
      }
      jobPosting: {
        Row: {
          applicationMethod: string
          cdd: boolean
          cdi: boolean
          compandId: string | null
          created_at: string
          description: string
          experience: boolean
          externalFormURL: string
          fullTime: boolean
          id: string
          jobFunction: string
          location: string
          pageViewCount: number
          partTime: boolean
          requestCount: number
          salaryMax: number | null
          salaryMin: number | null
          title: string
        }
        Insert: {
          applicationMethod?: string
          cdd?: boolean
          cdi?: boolean
          compandId?: string | null
          created_at?: string
          description?: string
          experience?: boolean
          externalFormURL?: string
          fullTime?: boolean
          id?: string
          jobFunction?: string
          location?: string
          pageViewCount?: number
          partTime?: boolean
          requestCount?: number
          salaryMax?: number | null
          salaryMin?: number | null
          title?: string
        }
        Update: {
          applicationMethod?: string
          cdd?: boolean
          cdi?: boolean
          compandId?: string | null
          created_at?: string
          description?: string
          experience?: boolean
          externalFormURL?: string
          fullTime?: boolean
          id?: string
          jobFunction?: string
          location?: string
          pageViewCount?: number
          partTime?: boolean
          requestCount?: number
          salaryMax?: number | null
          salaryMin?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobPosting_compandId_fkey"
            columns: ["compandId"]
            referencedRelation: "company"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
