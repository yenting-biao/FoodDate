# [121-1] Web Programming Final 

## (Group 03) 不揪 Food Date

## Intro

_不揪 Food Date_ is a powerful restaurant gathering app. Each user can browse a map with all restaurant near NTU we recommended. It also includes a powerful food lottery, which can help you deciding what to eat. After you got some thoughts, you can use our remarkable date-matching system, join a date with other foodies! Also, we've got a user's coin ranking system and a list of missions and games, great news for those who want to get coins for fun.

## Packages/Framework/Code Ref

react-google-maps Docs: [https://visgl.github.io/react-google-maps/](https://visgl.github.io/react-google-maps/)

roulette code ref:
<https://github.com/effectussoftware/react-custom-roulette>
<https://www.npmjs.com/package/react-custom-roulette?activeTab=readme>

## Packages/Framework/Code Used

Next.JS, Tailwind CSS, Material UI, Material Icon, Lucide React Icon, Pusher, Cloudinary, react-linkify, zod, react-custom-roulette, vis.gl/react-google-maps, Google Maps API, Next auth, Drizzle ORM, PostgreSQL


# About the App

### Warnings

- Please prevent refreshing or reloading the website unless necessary. Each refresh uses a quota.

### Running the app

1. Install dependencies

   ```bash
   yarn install
   ```

2. Create a copy of `.env.example` as `.env.local` and replace `"YOUR-API-KEY-HERE"` with your Google API key and `"YOUR-MAP-ID-HERE"` with your Map ID, replace  `POSTGRES_URL_HERE` with the postgresURL, finally fill up pusher settings. You can also adjust `NEXT_PUBLIC_VERIFY_DISTANCE_BASE` if you are too lazy to walk near to any restaurants.


3. Run migrations

   ```bash
   yarn migrate
   ```

4. Start the development server

   ```bash
   yarn dev
   ```

5. Open http://localhost:3000 in your browser


### Disclaimer
此專題為自行發想，如有雷同，純屬巧合
