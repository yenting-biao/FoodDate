"use client"
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  IconButtonProps,
  Typography,
  Stack,
  Rating,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PaidIcon from '@mui/icons-material/Paid';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ReviewCard from './ReviewCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type RestaurantProps = {
  name: string;
  address: string;
  types: string[];
  rating: number;
  userRatingsTotal: number;
  priceLevel: string;
  photoReference: string[];
}

export default function RestaurantCard({ name, address, types, rating, userRatingsTotal, priceLevel, photoReference }: RestaurantProps) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

  const handleBeforePhoto = () => {
    console.log("currentPhotoIndex: " + currentPhotoIndex);
    setCurrentPhotoIndex(currentPhotoIndex == 0 ? currentPhotoIndex : currentPhotoIndex - 1);    
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex(currentPhotoIndex === photoReference.length - 1 ? currentPhotoIndex : currentPhotoIndex + 1);
  };

  const [showArrow, setShowArrow] = useState<boolean>(false);

  return (
    <Paper elevation={5}>
      <Card>
        <CardHeader
          title={name}
          subheader={ // TODO: 這東西的對齊有問題啊
            <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
              <div>
                {rating}
              </div>            
              <Rating 
                value={rating} 
                readOnly
                precision={0.1}
              />
              <div>
                {`(${userRatingsTotal})`}
              </div>                      
            </Box>
          }
        />
        <div 
          className="relative" 
          onMouseEnter={() => {
            // Show the next arrow when the mouse enters the photo
            setShowArrow(true);
          }}
          onMouseLeave={() => {
            // Hide the next arrow when the mouse leaves the photo
            setShowArrow(false);
          }}
        >
          <CardMedia
            className="relative"
            component="img"
            height="120"
            // Use the current photo index to get the current photo URL
            image={photoReference[currentPhotoIndex]}
            alt="Restaurant Photo"
            
          />
          {showArrow && <IconButton
            className="absolute left-0 top-1/2 z-10"
            onClick={handleBeforePhoto}
          >
            <NavigateBeforeIcon className="text-white"/>
          </IconButton>}
          {showArrow && <IconButton
            className="absolute right-0 top-1/2 z-10"
            onClick={handleNextPhoto}
          >
            <NavigateNextIcon className="text-white"/>
          </IconButton>}
        </div>        
        <CardContent>
          <Stack spacing={1} className="flex flex-col items-start w-full">
            <Item className="flex items-center gap-3 w-full">
              <LocationOnIcon />
              <div className="text-start">
                {address}
              </div>              
            </Item>
            <Item className="flex flex-start items-center justify-start gap-3 w-full">
              <RestaurantIcon />
              <div className="text-start">
                {types.join(", ")}
              </div>              
            </Item>
            <Item className="flex items-center gap-3 w-full">
              <PaidIcon />
              <div className="text-start">
                {priceLevel}
              </div>              
            </Item>
          </Stack>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider />
          <CardContent>
            <Typography 
              variant="subtitle1" 
              className="font-semibold pb-4 text-center"
            >
              評價
            </Typography>
            <Stack gap={2}>
              {Array.from({length: 5}).map((_, i) => (
                <ReviewCard  
                  key={i}
                  username="我是誰"
                  reviewDate="2021/10/10"
                  starsCount={4}
                  content="我是評論好好吃我是評論好好吃我是評論好好吃我是評論好好吃我是評論好好吃我是評論好好吃我是評論好好吃我是評論好好吃我是評論好好吃我是評論好好吃我是評論好好吃我是評論好好吃我是評論好好吃我是評論好好吃"
                />
              ))}
            </Stack>            
          </CardContent>
        </Collapse>
      </Card>
    </Paper>    
  );
}
