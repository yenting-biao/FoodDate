import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Rating,
  Paper,
  Box,
} from "@mui/material";
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type Props = {
  username: string;
  reviewDate: string;
  starsCount: number;
  content: string;
}

export default function ReviewCard({ username, reviewDate, starsCount, content }: Props) {
  const hasMedia = false; // temporary

  return (
    <Paper elevation={1}>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
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
        <CardContent>
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
