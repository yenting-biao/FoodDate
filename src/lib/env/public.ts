import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string(),
  NEXT_PUBLIC_MAP_ID: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string(),
  NEXT_PUBLIC_PUSHER_KEY: z.string(),
  NEXT_PUBLIC_PUSHER_CLUSTER: z.string(),
  NEXT_PUBLIC_VERIFY_DISTANCE_BASE: z.number(),
});

type PublicEnv = z.infer<typeof publicEnvSchema>;

export const publicEnv: PublicEnv = {
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  NEXT_PUBLIC_MAP_ID: process.env.NEXT_PUBLIC_MAP_ID!,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
  NEXT_PUBLIC_PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  NEXT_PUBLIC_PUSHER_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  NEXT_PUBLIC_VERIFY_DISTANCE_BASE: Number(process.env.NEXT_PUBLIC_VERIFY_DISTANCE_BASE!),
};

publicEnvSchema.parse(publicEnv);
