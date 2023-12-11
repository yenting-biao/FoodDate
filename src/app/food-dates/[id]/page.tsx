import { Typography } from "@mui/material";
import DatePreview from "./_components/DatePreview";
import DateDetails from "./_components/DateDetails";

export default function dateChatPage () {
  return (
    <div className="flex p-5">
      <div className="w-1/4 h-screen flex flex-col gap-2">
        <Typography 
          variant="h5"
          className="font-semibold"
        >
          Date Records
        </Typography>
        <div className="flex flex-col gap-2 pr-3 overflow-y-scroll">
          {Array.from({length: 15}).map((_, index) => (
            <DatePreview key={index} />
          ))}
        </div>
        
      </div>
      <div className="flex flex-col w-full h-screen pl-3">
        <DateDetails />
      </div>
    </div>   
  )
}