import { Typography } from "@mui/material";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

export default function Leaderboard () {
  return (
    <div className="w-1/4 p-5 border-2 border-gray-800 rounded-xl">
      <Typography 
        variant="h4" 
        className="text-center font-semibold mb-5"
      >
        Leaderboard
      </Typography>
      <div className="flex flex-col gap-3 w-full p-2 ml-1 overflow-y-scroll max-h-[75vh]">
        {Array.from({ length: 20 }).map((_, i) => {
          const username = `user${i}${Math.floor(Math.random() * 1000000)}`;
          const coins = Math.floor(Math.random() * 1000);
          return (
            <Container 
              key={i}
              ranking={i + 1}
              username={username}
              coins={coins}
            />
          )
        })}
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
      {RankingDiv}
      <Typography variant="h6">
        {username}
      </Typography>
      <div className="mr-3">
        {coins}
      </div>
    </div>
  )
}