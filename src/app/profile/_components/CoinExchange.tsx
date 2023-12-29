import { Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import LotteryCard from "./LotteryCard";

type Props = {
  userId: string;
  coins: number;
}

export default function CoinExchange ({ userId, coins }: Props) {
  console.log(userId);
  return (
    <div>
      <Typography 
        variant="h4"
        className="text-center p-3 mb-4"
      >
        錢幣遊樂場
      </Typography>
      <div className="grid sm:grid-cols-3 xs:grid-cols-1 gap-6">
        <LotteryCard
          name="抽獎"
          description="花費 100 金幣抽獎，有機率獲得 1000 金幣"
          price={100}
          userCoins={coins}
        />
        <ProductCard
          name="test"
          description="test"
          price={100}
        />
        <ProductCard
          name="test"
          description="test"
          price={100}
        />
        <ProductCard
          name="test"
          description="test"
          price={100}
        />
        <ProductCard
          name="test"
          description="test"
          price={100}
        />
        <ProductCard
          name="test"
          description="test"
          price={100}
        />
      </div>
    </div>
  )
}