import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string(),
  NEXT_PUBLIC_MAP_ID: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
});

type PublicEnv = z.infer<typeof publicEnvSchema>;

export const publicEnv: PublicEnv = {
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  NEXT_PUBLIC_MAP_ID: process.env.NEXT_PUBLIC_MAP_ID!,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
};

publicEnvSchema.parse(publicEnv);
