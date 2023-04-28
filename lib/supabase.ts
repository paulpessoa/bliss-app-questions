import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || ''

export const supabase = createClient( supabaseUrl , supabaseAnonKey);

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      questions: {
        Row: {
          choices: Json[] | null
          id: number
          image_url: string | null
          published_at: string | null
          question: string | null
          thumb_url: string | null
        }
        Insert: {
          choices?: Json[] | null
          id?: number
          image_url?: string | null
          published_at?: string | null
          question?: string | null
          thumb_url?: string | null
        }
        Update: {
          choices?: Json[] | null
          id?: number
          image_url?: string | null
          published_at?: string | null
          question?: string | null
          thumb_url?: string | null
        }
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
