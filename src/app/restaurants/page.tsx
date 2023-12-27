"use client";
import {
  APIProvider,
  Map,
  Marker,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { 
  Divider, 
  Stack,
  SpeedDial,
  SpeedDialAction, 
  Typography,
  Modal,
  Box,
  Button
} from "@mui/material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';

import SearchBar from "./_components/SearchBar";
import RestaurantCard from "./_components/RestaurantCard";

const Wheel = dynamic(
  () => import('react-custom-roulette').then(mod => mod.Wheel),
  { ssr: false }
)

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
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    let watcher: number | null = null;

    if (navigator.geolocation) {
      watcher = navigator.geolocation.watchPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }

    // Cleanup function
    return () => {
      if (watcher !== null) {
        navigator.geolocation.clearWatch(watcher);
      }
    };
  }, [userPosition]);
  

  const [showRoulette, setShowRoulette] = useState<boolean>(false);
  const actions = [
    { icon: <SwapHorizontalCircleIcon />, name: "幫我抽要吃什麼", onClick: () => setShowRoulette(true) },
  ];

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    height: "75%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const[mustSpin, setMustSpin] = useState<boolean>(false);

  const wheelData = [
    { option: '0', style: { backgroundColor: 'green', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'white' } },
    { option: '2' },
  ]

  useEffect(() => {
      setMustSpin(true)
  }, [])
  
  const blueMarkerIcon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // URL to a blue marker icon
  };

  const handleMapClick = async (event: any) => {
    // TODO: fix event type
    const placeId = event.detail.placeId;
    console.log("placeId", placeId);
    if (!placeId) return;

    try { // The API to get place details
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
              <Divider />
              <div className="h-screen overflow-y-scroll p-3">
                <Stack spacing={2}>
                  {restaurantName != "" && <RestaurantCard 
                    name={restaurantName}
                    address={restaurantAddress}
                    types={types}
                    rating={4.6}
                    userRatingsTotal={100}
                    priceLevel={"$$"}
                    photoReference={["/food1.jpeg"]}
                  />}            
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

              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16  }}
                className=""
                icon={<SpeedDialIcon className=""/> /* TODO: fix color */}
              >
                {actions.map((action) => ( 
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.onClick}
                  />
                ))}
              </SpeedDial>
              <Modal
                open={showRoulette}
                onClose={() => setShowRoulette(false)} 
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >                
                <Box sx={style}>
                   <Typography 
                    id="modal-modal-title" 
                    variant="h4"
                    className="text-center"
                  >
                    讓我幫你抽要吃什麼吧
                  </Typography>
                  <Typography 
                    id="modal-modal-description" 
                    className="mt-2 text-center"
                  >
                    每次抽籤花費 20 金幣
                  </Typography>
                  <Wheel
                    mustStartSpinning={false}
                    prizeNumber={3}
                    data={wheelData}
                    backgroundColors={['#3e3e3e', '#df3428']}
                    textColors={['#ffffff']}
                    onStopSpinning={() => {
                      setMustSpin(false);
                    }}
                  />
                  <Button onClick={() => setMustSpin(true)}>Spin</Button>                  
                </Box>                 
              </Modal>
            </div>
        </APIProvider>
      </main>
    </>
  );
}