"use client";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function Home() {
  const position = { lat: 25.01834354450372, lng: 121.53977457666448 };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <div style={{ height: "100vh", width: "100%" }}>
          <Map center={position} zoom={15}>
            <Marker position={position} />
          </Map>
        </div>
      </APIProvider>
    </main>
  );
}
