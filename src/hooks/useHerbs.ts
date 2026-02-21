"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Herb } from "@/types";

export function useHerbs(search?: string) {
  const supabase = createClient();

  return useQuery<Herb[]>({
    queryKey: ["herbs", search],
    queryFn: async () => {
      let query = supabase
        .from("herbs")
        .select("*, herb_tags(*)")
        .eq("is_published", true)
        .order("name");

      if (search) {
        query = query.ilike("name", `%${search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Herb[];
    },
  });
}
