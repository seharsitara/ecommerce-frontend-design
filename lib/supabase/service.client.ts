// lib/supabase/service.client.ts
"use server";

import { createClient } from "@supabase/supabase-js";

export async function serviceAuthClient() {
  console.log("role",process.env.SUPABASE_SERVICE_ROLE!)
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  return client;
}