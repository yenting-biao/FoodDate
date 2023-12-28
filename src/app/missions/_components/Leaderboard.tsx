import { Typography } from "@mui/material";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { getLeaderBoard } from "./action";

export default async function Leaderboard () {
  const top20 = await getLeaderBoard();
  top20[0].ranking = 1;

  for (let i = 1; i < top20.length; i++) {
    if (top20[i].coins === top20[i - 1].coins) {
      top20[i].ranking = top20[i - 1].ranking;
    } else {
      top20[i].ranking = i + 1;
    }
  }
  
  return (
    <div className="w-1/4 p-5 border-2 border-gray-800 rounded-xl">
      <Typography 
        variant="h4" 
        className="text-center font-semibold mb-5"
      >
        Leaderboard
      </Typography>
      <div className="flex flex-col gap-3 w-full p-2 ml-1 overflow-y-scroll max-h-[75vh]">
        {top20.map((user, i) => 
          <Container 
            key={i}
            ranking={user.ranking}
            username={user.username}
            coins={user.coins}
          />
        )}        
      </div>
    </div>
  )
}

type ContainerProps = {
  ranking: number;
  username: string;
  coins: number;
}

function Container({ ranking, username, coins }: ContainerProps) {
  let RankingDiv;
  if (ranking === 1) {
    RankingDiv = (
      <div className="flex items-center gap-2 ml-1">
        <WorkspacePremiumIcon sx={{ color: 'gold', width: 32, height: 32 }}/>        
      </div>
    )
  } else if (ranking === 2) {
    RankingDiv = (
      <div className="flex items-center gap-2 ml-1">
        <WorkspacePremiumIcon sx={{ color: 'silver', width: 32, height: 32 }}/>       
      </div>
    )
  } else if (ranking === 3) {
    RankingDiv = (
      <div className="flex items-center gap-2 ml-1">
        <WorkspacePremiumIcon sx={{ color: 'brown', width: 32, height: 32 }}/>        
      </div>
    )
  } else {
    RankingDiv = (
      <div className="flex items-center justify-center border-2 border-gray-500 rounded-full w-8 h-8 ml-1">
        <Typography variant="subtitle1" className="mt-0.5">
          {ranking}
        </Typography>
      </div>      
    )  
  }
  return (
    <div className="flex items-center gap-2 w-full justify-between border-black border rounded-xl p-1">
      <div className="w-1/6">
        {RankingDiv}
      </div>      
      <Typography variant="h6" className="text-start w-3/6 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {username}
      </Typography>
      <div className="mr-3 w-1/6 text-right">
        {coins}
      </div>
    </div>
  )
}