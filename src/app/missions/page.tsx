import { auth } from "@/lib/auth";
import Leaderboard from "./_components/Leaderboard";
import MissionCard from "./_components/MissionCard";
import { Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { getFinishedMission, getUnfinishedMission } from "./_components/action";
//import PaidIcon from '@mui/icons-material/Paid';

export default async function MissionPage () {
  const session = await auth();
  if (!session?.user?.email) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/login`);
  }
  const userId = session?.user?.id;
  const username = session?.user?.username;
  const coins = session?.user?.coins;
  //const username = "TogiNukk";
  //const coins = 100;
  const unFinisedMissions = await getUnfinishedMission(userId);
  const finishedMissions = await getFinishedMission(userId);

  return (
    <>
      <Leaderboard 
        userId={userId}
        username={username}
        coins={coins}
      />
      <div className="w-full p-4 border-black rounded-xl border-2 ml-4">
        <div className="flex gap-3 items-end w-full">
          <Typography variant="h3" className="text-center w-full">
            任務列表
          </Typography>
          {/*<Typography variant="h4">
            {`${username} 你有 `}
            <PaidIcon sx={{ color: 'gold', width: 36, height: 36, marginBottom: 1 }}/>
            {` ${coins}`} 
    </Typography> 暫時先拿掉 我會在其他地方顯示 */}
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4 overflow-y-scroll max-h-[75vh]">
          {/*Array.from({ length: 20 }).map((_, i) => {
            return (
              <MissionCard 
                missionId={i.toString()}
                key={i}
                missionName="每日登入"
                missionDescription="每日登入獲得金幣，連續登入天數越多，獲得的金幣越多，最多可獲得 20 金幣。"
                prize={20}
                finished={false}
              />    
            )
          })*/}
          {unFinisedMissions.map((mission) => {
            return (
              <MissionCard 
                key={mission.missionId}
                missionId={mission.missionId}                
                missionName={mission.missionName}
                missionDescription={mission.missionDescription ?? ""}
                prize={mission.prize}
                finished={false}
              />    
            )
          })}
          {finishedMissions.map((mission) => {
            return (
              <MissionCard 
                key={mission.missionId}
                missionId={mission.missionId}                
                missionName={mission.missionName}
                missionDescription={mission.missionDescription ?? ""}
                prize={mission.prize}
                finished={true}
              />    
            )
          })}          
        </div>
      </div>
    </>
  );
}