import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import PaidIcon from '@mui/icons-material/Paid';

type Props = {
  name: string;
  description: string;
  price: number;
}

export default function ProductCard ({ name, description, price }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }} className='border border-gray-500'>
      <CardMedia
        sx={{ height: 140 }}
        title="Icon"
      >
        <CategoryIcon className="w-full h-full" />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className="flex items-center">
          {name} &nbsp; <PaidIcon sx={{color: 'gold'}} className="mr-1"/> {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions className="ml-1">        
        <Button size="small">查看更多</Button>
      </CardActions>
    </Card>
  );
}