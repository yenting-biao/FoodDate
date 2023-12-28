"use client"
import { useEffect, useState } from 'react';
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
const translateTypeToChinese = (type: string): string => {
  const translations: { [key: string]: string } = {
    'chinese_restaurant': '中式餐館',
    'restaurant': '餐廳',
    'mexican_restaurant': '墨西哥餐廳',
    'american_restaurant': '美式餐廳',
    'japanese_restaurant': '日本料理',
    'brunch_restaurant': '好ㄘ的早午餐',
    'breakfast_restaurant': '活力早餐',
    'store': '附商店',
    'sushi_restaurant': '有賣壽司',
    'korean_restaurant': '韓式料理',
    'consultant': '有聘請顧問',
    'grocery_store': '含雜貨店',
    'health': '注重健康',
    'ramen_restaurant': '拉麵洗腎幫',
    'thai_restaurant': '泰式料理',
    'vegetarian_restaurant': '主打蔬食',
    'event_venue': '有在辦活動',
    'italian_restaurant': '義式餐廳',
    'vietnamese_restaurant': '越南餐館',
    'vegan_restaurant': '素食至上',
    'art_gallery': '裝文青勝地',
    'bar': '酒鬼聚會所',
    'indian_restaurant': '印度料理',
    'seafood_restaurant': '主打海鮮',
    'coffee_shop': '咖啡店',
    'cafe': '咖啡廳',
    'spanish_restaurant': '西班牙菜',
    'middle_eastern_restaurant': '中東風味餐',
    'fast_food_restaurant': '速食店',
    'hamburger_restaurant': '有賣漢堡',
    'pizza_restaurant': '披薩專賣',
    'french_restaurant': '法式料理',
    'indonesian_restaurant': '印尼料理',
    'steak_house': '牛排館',
    'meal_takeaway': '歡迎外帶',
    'liquor_store': '酒鬼避難所',
    'wholesaler': '食物批發',
    'mediterranean_restaurant': '地中海料理',
    'bakery': '麵包店',
    'barbecue_restaurant': '燒烤店',
    'meal_delivery': '歡迎外送',
    'night_club': '歡樂夜總會',
    'greek_restaurant': '希臘餐廳',
    'ice_cream_shop': '冰淇淋店',
    'home_goods_store': '有賣家居用品',
    'furniture_store': '有賣傢俱',
    'home_improvement_store': '家庭改造服務',
    'market': '市場',
    'turkish_restaurant': '土耳其料理',
    'sandwich_shop': '三明治！！',
    'banquet_hall': '宴會所',
    'convention_center': '會議廳',
    'clothing_store': '有賣衣服',
    'wedding_venue': '婚禮現場',
    'performing_arts_theater': '表演藝術中心'
  };

  return translations[type] || type;
};
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
    setCurrentPhotoIndex(currentPhotoIndex == 0 ? currentPhotoIndex : currentPhotoIndex - 1);
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex(currentPhotoIndex === photoReference.length - 1 ? currentPhotoIndex : currentPhotoIndex + 1);
  };

  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);

  useEffect(() => {
    setShowLeftArrow(currentPhotoIndex !== 0);
    setShowRightArrow(currentPhotoIndex !== photoReference.length - 1);
  }, [currentPhotoIndex, photoReference.length]);

  return (
    <Paper elevation={5}>
      <Card>
        <CardHeader
          title={name}
          subheader={ // TODO: 這東西的對齊有問題啊
            <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
              <div className="mt-px">
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
            setShowLeftArrow(currentPhotoIndex !== 0);
            setShowRightArrow(currentPhotoIndex !== photoReference.length - 1);
          }}
          onMouseLeave={() => {
            // Hide the next arrow when the mouse leaves the photo
            setShowLeftArrow(false);
            setShowRightArrow(false);
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
          {showLeftArrow && <IconButton
            className="absolute left-0 top-0 bottom-0 my-auto mx-0 z-10"
            onClick={handleBeforePhoto}
          >
            <NavigateBeforeIcon className="text-white" />
          </IconButton>}
          {showRightArrow && <IconButton
            className="absolute right-0 top-0 bottom-0 my-auto mx-0 z-10"
            onClick={handleNextPhoto}
          >
            <NavigateNextIcon className="text-white" />
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
                {types.map((type) => (
                  <span key={type}>{translateTypeToChinese(type)} </span>
                ))}
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
              {Array.from({ length: 5 }).map((_, i) => (
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
