"use client";
import { APIProvider, Map, Marker, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";

import Header from "./_components/Header";

export default function Home() {
  const [position, setPosition] = useState({ lat: 25.01834354450372, lng: 121.53977457666448 });
  
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [restaurantAddress, setRestaurantAddress] = useState<string>("");

  const handleMapClick = async (event: any) => { // TODO: fix event type
    setPosition({lat: event.detail.latLng.lat, lng: event.detail.latLng.lng});
    const placeId = event.detail.placeId;
    console.log("placeId", placeId);
    if(!placeId) return;

    try {
      const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName,formattedAddress&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
      const data = await res.json();
      /* 
        {
          displayName: {
            language: "zh-TW"
            text: "Restautant Name"
          }
          formattedAddress: "Address"
          id: "placeId"
        }
      */
      /* Below are useless. Just for future reference if needed
      
      await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&language=zh-TW&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`, {
        method: "GET",
        headers: {
          "Data-Type": "application/jsonp",
          "Access-Control-Allow-Origin": "*",
        },        
      });*/
      setRestaurantName(data.displayName.text);
      setRestaurantAddress(data.formattedAddress);
      
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  }

  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center w-full">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <div className="h-screen w-1/4 bg-white text-black p-3">
            {/*<div>
              餐廳資訊
              {position.lat + " - " + position.lng}
  </div>*/}
            <div className="text-xl font-medium">
              {restaurantName}
            </div>
            <div className="text-sm">
              {restaurantAddress}
            </div>
          </div>
          <div className="h-screen w-3/4">
            <Map center={position} zoom={15} onClick={handleMapClick}>
              <Marker 
                position={position}
              />
            </Map>
          </div>
        </APIProvider>        
      </main>
    </>
    
  );
}

type GeocodingProps = {
  placeId: string;
}

function Place() {
  // triggers loading the places library and returns the API Object once complete (the
  // component calling the hook gets automatically re-rendered when this is
  // the case)
  const placesLibrary = useMapsLibrary('places');

  const [placesService, setPlacesService] = useState(null);

  useEffect(() => {
    if (!placesLibrary) return;

    // when placesLibrary is loaded, the library can be accessed via the
    // placesLibrary API object
    setPlacesService(new placesLibrary.PlacesService());
  }, [placesLibrary]);

  useEffect(() => {
    if (!placesService) return;

    // ...use placesService...
  }, [placesService]);

  return <></>;
}

function Geocoding({ placeId }: GeocodingProps) {
  const geocodingLibrary = useMapsLibrary('geocoding');
  useEffect(() => {
    if (!geocodingLibrary) return;

    const geocoder = new geocodingLibrary.Geocoder();
    console.log("geocoder", geocoder);
    // ...
  }, [geocodingLibrary, placeId]);

  return <></>;
}