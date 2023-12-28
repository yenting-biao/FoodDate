import { auth } from "@/lib/auth";
import Leaderboard from "./_components/Leaderboard";
import MissionCard from "./_components/MissionCard";
import { Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
//import PaidIcon from '@mui/icons-material/Paid';

export default async function MissionPage () {
  const session = await auth();
  if (!session?.user?.email) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/login`);
  }
  //const username = "TogiNukk";
  //const coins = 100;
  return (
    <>
      <Leaderboard />
      <div className="w-full p-4">
        <div className="flex gap-3 items-end w-full">
          <Typography variant="h3" className="text-center w-full">
            每日任務
          </Typography>
          {/*<Typography variant="h4">
            {`${username} 你有 `}
            <PaidIcon sx={{ color: 'gold', width: 36, height: 36, marginBottom: 1 }}/>
            {` ${coins}`} 
    </Typography> 暫時先拿掉 我會在其他地方顯示 */}
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4 overflow-y-scroll max-h-[75vh]">
          {Array.from({ length: 20 }).map((_, i) => {
            return (
              <MissionCard 
                key={i}
                missionName="每日登入"
                priceCoins={20}
              />    
            )
          })}
          <MissionCard 
            missionName="每日登入"
            priceCoins={20}
          />
        </div>
      </div>
    </>
  );
}