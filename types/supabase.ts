export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      candidate: {
        Row: {
          created_at: string
          cv: string | null
          id: string
          jobApplied: string | null
          slug: string | null
          userId: string | null
        }
        Insert: {
          created_at?: string
          cv?: string | null
          id?: string
          jobApplied?: string | null
          slug?: string | null
          userId?: string | null
        }
        Update: {
          created_at?: string
          cv?: string | null
          id?: string
          jobApplied?: string | null
          slug?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_candidate_jobApplied_fkey"
            columns: ["jobApplied"]
            isOneToOne: false
            referencedRelation: "jobPosting"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_candidate_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      company: {
        Row: {
          about: string | null
          address: string | null
          availableBoost: number | null
          availableJobListing: number | null
          companyBoost: boolean | null
          companyBoosted_at: string | null
          created_at: string
          id: string
          invoices: string[] | null
          jobListings: string[] | null
          logo: string
          name: string
          owner_id: string
          phone: number | null
          rebilled_at: string | null
          slug: string | null
          stripe_customer_id: string | null
          subscribe_at: string | null
          subscription: string | null
          teamMembers: string[] | null
          total_request_count: number | null
          website: string | null
        }
        Insert: {
          about?: string | null
          address?: string | null
          availableBoost?: number | null
          availableJobListing?: number | null
          companyBoost?: boolean | null
          companyBoosted_at?: string | null
          created_at?: string
          id?: string
          invoices?: string[] | null
          jobListings?: string[] | null
          logo?: string
          name?: string
          owner_id: string
          phone?: number | null
          rebilled_at?: string | null
          slug?: string | null
          stripe_customer_id?: string | null
          subscribe_at?: string | null
          subscription?: string | null
          teamMembers?: string[] | null
          total_request_count?: number | null
          website?: string | null
        }
        Update: {
          about?: string | null
          address?: string | null
          availableBoost?: number | null
          availableJobListing?: number | null
          companyBoost?: boolean | null
          companyBoosted_at?: string | null
          created_at?: string
          id?: string
          invoices?: string[] | null
          jobListings?: string[] | null
          logo?: string
          name?: string
          owner_id?: string
          phone?: number | null
          rebilled_at?: string | null
          slug?: string | null
          stripe_customer_id?: string | null
          subscribe_at?: string | null
          subscription?: string | null
          teamMembers?: string[] | null
          total_request_count?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      invoices: {
        Row: {
          company_id: string | null
          created_at: string
          id: string
          invoice_pdf: string | null
          invoice_url: string | null
          name: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          id?: string
          invoice_pdf?: string | null
          invoice_url?: string | null
          name?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          id?: string
          invoice_pdf?: string | null
          invoice_url?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          }
        ]
      }
      jobPosting: {
        Row: {
          applicationMethod: string
          cdd: boolean
          cdi: boolean
          company_id: string | null
          created_at: string
          description: string
          experience: boolean
          expired: boolean
          externalFormURL: string
          flexi: boolean
          fullTime: boolean
          id: string
          jobFunction: string
          languages: string | null
          location: string
          pageViewCount: number
          partTime: boolean
          pinned: boolean
          pinned_at: string | null
          promoted: boolean
          promoted_at: string | null
          published: boolean
          published_at: string | null
          republished_at: string | null
          requestCount: number
          salaryMax: number | null
          salaryMin: number | null
          student: boolean
          title: string
          updated_at: string | null
        }
        Insert: {
          applicationMethod?: string
          cdd?: boolean
          cdi?: boolean
          company_id?: string | null
          created_at?: string
          description?: string
          experience?: boolean
          expired?: boolean
          externalFormURL?: string
          flexi?: boolean
          fullTime?: boolean
          id?: string
          jobFunction?: string
          languages?: string | null
          location?: string
          pageViewCount?: number
          partTime?: boolean
          pinned?: boolean
          pinned_at?: string | null
          promoted?: boolean
          promoted_at?: string | null
          published?: boolean
          published_at?: string | null
          republished_at?: string | null
          requestCount?: number
          salaryMax?: number | null
          salaryMin?: number | null
          student?: boolean
          title?: string
          updated_at?: string | null
        }
        Update: {
          applicationMethod?: string
          cdd?: boolean
          cdi?: boolean
          company_id?: string | null
          created_at?: string
          description?: string
          experience?: boolean
          expired?: boolean
          externalFormURL?: string
          flexi?: boolean
          fullTime?: boolean
          id?: string
          jobFunction?: string
          languages?: string | null
          location?: string
          pageViewCount?: number
          partTime?: boolean
          pinned?: boolean
          pinned_at?: string | null
          promoted?: boolean
          promoted_at?: string | null
          published?: boolean
          published_at?: string | null
          republished_at?: string | null
          requestCount?: number
          salaryMax?: number | null
          salaryMin?: number | null
          student?: boolean
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobPosting_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobPosting_languages_fkey"
            columns: ["languages"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          }
        ]
      }
      languages: {
        Row: {
          created_at: string
          dutch: boolean
          english: boolean
          french: boolean
          id: string
          jobPost_id: string | null
        }
        Insert: {
          created_at?: string
          dutch?: boolean
          english?: boolean
          french?: boolean
          id?: string
          jobPost_id?: string | null
        }
        Update: {
          created_at?: string
          dutch?: boolean
          english?: boolean
          french?: boolean
          id?: string
          jobPost_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "languages_jobPost_id_fkey"
            columns: ["jobPost_id"]
            isOneToOne: false
            referencedRelation: "jobPosting"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          company_id: string | null
          contactName: string
          countryCode: string | null
          created_at: string
          firstname: string
          id: string
          isCompany: boolean
          lastname: string
          profile_picture: string | null
          user_email: string
          user_id: string | null
          user_phone: number | null
          user_total_request_count: number
        }
        Insert: {
          company_id?: string | null
          contactName?: string
          countryCode?: string | null
          created_at?: string
          firstname?: string
          id?: string
          isCompany?: boolean
          lastname?: string
          profile_picture?: string | null
          user_email?: string
          user_id?: string | null
          user_phone?: number | null
          user_total_request_count?: number
        }
        Update: {
          company_id?: string | null
          contactName?: string
          countryCode?: string | null
          created_at?: string
          firstname?: string
          id?: string
          isCompany?: boolean
          lastname?: string
          profile_picture?: string | null
          user_email?: string
          user_id?: string | null
          user_phone?: number | null
          user_total_request_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      viewCounter: {
        Row: {
          id: number
          item_id: string
          view_count: number | null
          viewed_at: string
        }
        Insert: {
          id?: number
          item_id: string
          view_count?: number | null
          viewed_at?: string
        }
        Update: {
          id?: number
          item_id?: string
          view_count?: number | null
          viewed_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_views: {
        Args: {
          page_slug: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
