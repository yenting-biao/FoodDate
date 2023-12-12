import { Avatar, Typography } from "@mui/material";
import { red } from '@mui/material/colors';

export default function DatePreview () {
  return (
    <div className="flex items-center gap-3 p-3 border rounded-full border-gray-500 hover:cursor-pointer hover:bg-gray-200">
      <div>
        <Avatar sx={{ bgcolor: red[500] }}>
          R
        </Avatar>
      </div>
      <Typography variant="h6">
        12/12 麥當勞 四人團
      </Typography>      
    </div>
  )
}