"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { RemedyRequest } from "@/types";

export function useRemedyRequests() {
  const supabase = createClient();

  return useQuery<RemedyRequest[]>({
    queryKey: ["remedy-requests"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("remedy_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as RemedyRequest[];
    },
  });
}
