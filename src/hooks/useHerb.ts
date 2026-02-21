"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Herb, Condition } from "@/types";

interface HerbWithConditions extends Herb {
  conditions: Condition[];
}

export function useHerb(slug: string) {
  const supabase = createClient();

  return useQuery<HerbWithConditions>({
    queryKey: ["herb", slug],
    queryFn: async () => {
      // Get the herb with tags
      const { data: herb, error: herbError } = await supabase
        .from("herbs")
        .select("*, herb_tags(*)")
        .eq("slug", slug)
        .single();

      if (herbError) throw herbError;

      // Get linked conditions via herb_conditions
      const { data: condLinks, error: linkError } = await supabase
        .from("herb_conditions")
        .select("condition_id")
        .eq("herb_id", herb.id);

      if (linkError) throw linkError;

      let conditions: Condition[] = [];
      if (condLinks && condLinks.length > 0) {
        const condIds = condLinks.map((link) => link.condition_id);
        const { data: condData, error: condError } = await supabase
          .from("conditions")
          .select("*, category:categories(*)")
          .in("id", condIds);

        if (condError) throw condError;
        conditions = condData as Condition[];
      }

      return { ...herb, conditions } as HerbWithConditions;
    },
    enabled: !!slug,
  });
}
