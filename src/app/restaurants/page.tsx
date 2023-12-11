"use client";
import {
  APIProvider,
  Map,
  Marker,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";

import RestaurantCard from "./_components/RestaurantCard";
import { Button, Divider, Stack } from "@mui/material";
import SearchBar from "./_components/SearchBar";


export default function RestaurantPage() {
  const [position, setPosition] = useState({
    lat: 25.01834354450372,
    lng: 121.53977457666448,
  });
  const [userPosition, setUserPosition] = useState({
    lat: 25.01834354450372,
    lng: 121.53977457666448,
  });
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [restaurantAddress, setRestaurantAddress] = useState<string>("");
  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }
      );
    }
  }, []); // Don't remove the empty dependency array!!!

  // tmporary
  const [types, setTypes] = useState<string[]>([]);
  
  const blueMarkerIcon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // URL to a blue marker icon
  };

  const handleMapClick = async (event: any) => {
    // TODO: fix event type
    const placeId = event.detail.placeId;
    console.log("placeId", placeId);
    if (!placeId) return;

    try {
      const res = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName,formattedAddress,types&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      console.log("data", data);
      /* 
        {
          displayName: {
            language: "zh-TW"
            text: "Restautant Name"
          }
          formattedAddress: "Address"
          id: "placeId"
          types: [

          ]
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
      const addr: string = data.formattedAddress;
      const name: string = data.displayName.text;
      
      
      if (addr.includes("大安區") || addr.includes("大安区") || addr.includes("中正區") || addr.includes("中正区")) {
        if (data.types.includes("restaurant")) {
          // the only correct use operation
          setPosition({ lat: event.detail.latLng.lat, lng: event.detail.latLng.lng });
          setRestaurantName(name);
          setRestaurantAddress(addr);
          setTypes(data.types);
        } else {
          setRestaurantName("你沒越界但是不是餐廳給我滾回去");
          setRestaurantAddress("");
          setTypes(data.types);
        }        
      } else {
        setRestaurantName("你越界了給我滾回去");
        setRestaurantAddress("");
        setTypes([]);
      }      
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <>
      <main className="flex h-full items-center justify-center w-full">      
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <div className="flex flex-col h-screen w-1/3 p-1 gap-3">
              <div className="flex w-full p-2">
                <SearchBar />              
              </div>
              {restaurantName != "" && <RestaurantCard 
                name={restaurantName}
                address={restaurantAddress}
                types={types}
                rating={4.6}
                userRatingsTotal={100}
                priceLevel={"$$"}
                photoReference={["/food1.jpeg"]}
              />}
              <Divider />
              <div className="h-screen overflow-y-scroll p-3">
                <Stack spacing={2}>
                              
                  {Array.from({ length: 10}).map((_, index) => (
                    <RestaurantCard 
                      key={index}
                      name="壽司漢堡123"
                      address="台北市大安區忠孝東路四段 123 號"
                      types={["type1", "type2"]}
                      rating={4.6}
                      userRatingsTotal={100}
                      priceLevel={"$$"}
                      photoReference={["/food1.jpeg", "/food2.jpeg", "/food3.jpeg"]}
                    />
                  ))}
                </Stack>
              </div>            
              
            </div>
            <div className="h-screen w-2/3">
              <Map
                center={position}
                zoom={15}
                onClick={handleMapClick}
                mapId={process.env.NEXT_PUBLIC_MAP_ID}
              >
                <Marker position={position}/>
                <Marker position={userPosition} icon={blueMarkerIcon}/>
              </Map>
            </div>
        </APIProvider>
      </main>
    </>
  );
}

type GeocodingProps = {
  placeId: string;
};

function Place() {
  // triggers loading the places library and returns the API Object once complete (the
  // component calling the hook gets automatically re-rendered when this is
  // the case)
  const placesLibrary = useMapsLibrary("places");

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
  const geocodingLibrary = useMapsLibrary("geocoding");
  useEffect(() => {
    if (!geocodingLibrary) return;

    const geocoder = new geocodingLibrary.Geocoder();
    console.log("geocoder", geocoder);
    // ...
  }, [geocodingLibrary, placeId]);

  return <></>;
}
