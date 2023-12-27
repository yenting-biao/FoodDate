import { Typography } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";

type Props = {
  missionName: string;
  priceCoins: number;
}

export default function MissionCard({missionName, priceCoins}: Props) {
  return (
    <div className="border border-gray-500 rounded-xl  w-full p-4 pb-12 hover:bg-gray-100 hover: cursor-pointer active:bg-gray-200">
      <Typography variant="h4" className="text-center pt-12">
        {missionName}
      </Typography>
      <Typography variant="subtitle1" className="text-center mr-6">
        <span className="text-xl mr-2">+</span>
        <PaidIcon sx={{ color: 'gold', width: 32, height: 32, marginBottom: 1 }}/>
        {` ${priceCoins}`} 
      </Typography>
    </div>
  )
}