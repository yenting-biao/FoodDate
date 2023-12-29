import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Rating,
  Paper,
  Box,
} from "@mui/material";
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";

type Props = {
  reviewId: string;
  username: string;
  reviewDate: string;
  starsCount: number;
  content: string;
}

export default function ReviewCard({ reviewId, username, reviewDate, starsCount, content }: Props) {
  const [isDelete,setIsDelete] = useState(false);
  const hasMedia = false; // temporary
  const handleDelete = async () => {
    try {
      const res = await fetch('/api/review', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewId,
        })
      });
      if (!res.ok) {
        return;
      }
      setIsDelete(true);
    } catch(error){
        return;
      }
    }
  return (!isDelete&&
    <Paper elevation={1}>
      <Card className="border border-slate-500 rounded-xl">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={handleDelete}>
              <ClearIcon/>
            </IconButton>
          }
          title={username}
          subheader={reviewDate}
        />
        {hasMedia && <CardMedia
          component="img"
          height="194"
          image="/taiwan.jpeg"
          alt="taiwan"
        />}
        <CardContent className="pt-0">
          <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
            <div>
              {starsCount}
            </div>            
            <Rating 
              value={starsCount} 
              readOnly
              precision={0.1}
            />                               
          </Box>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>       
      </Card>
    </Paper>
    
  );
}
