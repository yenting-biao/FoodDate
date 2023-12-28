"use client";
import React, { useState, useEffect } from "react";

import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

export default function FoodDatePage() {
  const currentHour = new Date().getHours() + 1;

  const restaurantTypes = [
    "中式餐館",
    "餐廳",
    "墨西哥餐廳",
    "美式餐廳",
    "日本料理",
    "好ㄘ的早午餐",
    "活力早餐",
    "附商店",
    "有賣壽司",
    "韓式料理",
    "有聘請顧問",
    "含雜貨店",
    "注重健康",
    "拉麵洗腎幫",
    "泰式料理",
    "主打蔬食",
    "有在辦活動",
    "義式餐廳",
    "越南餐館",
    "素食至上",
    "裝文青勝地",
    "酒鬼聚會所",
    "印度料理",
    "主打海鮮",
    "咖啡店",
    "咖啡廳",
    "西班牙菜",
    "中東風味餐",
    "速食店",
    "有賣漢堡",
    "披薩專賣",
    "法式料理",
    "印尼料理",
    "牛排館",
    "歡迎外帶",
    "酒鬼避難所",
    "食物批發",
    "地中海料理",
    "麵包店",
    "燒烤店",
    "歡迎外送",
    "歡樂夜總會",
    "希臘餐廳",
    "冰淇淋店",
    "有賣家居用品",
    "有賣傢俱",
    "家庭改造服務",
    "市場",
    "土耳其料理",
    "三明治！！",
    "宴會所",
    "會議廳",
    "有賣衣服",
    "婚禮現場",
    "表演藝術中心",
  ];
  const priceRanges = [
    "$ （200元以內）",
    "$$ （400元以內）",
    "$$$ （600元以內）",
    "$$$$ （600元以上）",
  ];

  const [pplCount, setPplCount] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentSelectedType = event.target.name as string;
    if (selectedTypes.includes(currentSelectedType)) {
      setSelectedTypes(
        selectedTypes.filter((type) => type !== currentSelectedType)
      );
    } else {
      setSelectedTypes([...selectedTypes, currentSelectedType]);
    }
    console.log("selectedTypes", selectedTypes);
  };

  const countdownValue = 3;
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(countdownValue);
  const [hasSubmit, setHasSubmit] = useState<boolean>(false);
  const [dots, setDots] = useState(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const handleSubmit = () => {
    const tmpEmptyFields: string[] = [];
    if (pplCount === "") tmpEmptyFields.push("人數");
    if (selectedTime === "") tmpEmptyFields.push("時間");
    if (selectedPriceRange === "") tmpEmptyFields.push("價格範圍");
    if (selectedTypes.length === 0) tmpEmptyFields.push("餐廳類型");

    setEmptyFields(tmpEmptyFields);
    setHasError(tmpEmptyFields.length > 0);
    if (tmpEmptyFields.length === 0) {
      setSubmitting(true);
    }
  };

  const handleCloseError = () => {
    setHasError(false);
  };

  const handleUndoSubmit = () => {
    setSubmitting(false);
    setCountdown(countdownValue);
  };

  useEffect(() => {
    if (submitting && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (submitting && countdown === 0) {
      setHasSubmit(true);
    }
  }, [submitting, countdown]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex flex-col items-center w-full h-full mb-14">
      {hasSubmit ? (
        <div className="flex flex-col items-center mt-5">
          <Typography variant="h4" className="text-center mt-2">
            配對中{".".repeat(dots)}
          </Typography>
          <Typography variant="h6" className="text-center mt-1">
            你可以離開此頁面，我們會在配對成功後通知你
          </Typography>
          <div className="loading-spinner mt-16"></div>
        </div>
      ) : (
        <>
          <Typography variant="h4" className="text-center mt-7">
            找不到人一起吃飯嗎？那你來對地方了！
          </Typography>
          <Typography variant="h6" className="text-center mt-1">
            一起吃飯，賺取金幣，換取獎勵！
          </Typography>
          <Divider className="w-1/4 my-4" />
          <div className="px-6 mt-2">
            <FormControl fullWidth className="flex flex-col gap-5">
              <div className="flex flex-col items-start">
                <Typography variant="h6">選擇人數：</Typography>
                <TextField
                  select
                  placeholder="選擇人數"
                  value={pplCount}
                  onChange={(data) => setPplCount(data.target.value)}
                  margin="normal"
                  variant="outlined"
                  className="w-full"
                  disabled={submitting}
                >
                  {Array.from({ length: 4 }, (_, i) => i + 1).map((count) => (
                    <MenuItem key={count} value={count}>
                      {count} 人
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="flex flex-col items-start">
                <Typography variant="h6">選擇時間：</Typography>
                <TextField
                  select
                  placeholder="選擇時間"
                  value={selectedTime}
                  onChange={(data) => setSelectedTime(data.target.value)}
                  margin="normal"
                  variant="outlined"
                  className="w-full"
                  disabled={submitting}
                >
                  {Array.from({ length: 13 }, (_, i) => currentHour + i).map(
                    (hour) => (
                      <MenuItem key={hour} value={hour}>
                        {hour % 24}:00 ~ {(hour + 1) % 24}:00
                      </MenuItem>
                    )
                  )}
                </TextField>
              </div>
              <div className="flex flex-col items-start">
                <Typography variant="h6">價格範圍：</Typography>
                <TextField
                  select
                  placeholder="價格範圍"
                  value={selectedPriceRange}
                  onChange={(data) => setSelectedPriceRange(data.target.value)}
                  margin="normal"
                  variant="outlined"
                  className="w-full"
                  disabled={submitting}
                >
                  {Array.from({ length: 4 }, (_, i) => i).map((count) => (
                    <MenuItem key={count} value={count}>
                      {priceRanges[count]}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Typography variant="h6">選擇類型：</Typography>
                <div className="w-full">
                  {restaurantTypes.map((type) => (
                    <FormControlLabel
                      key={type}
                      control={
                        <Checkbox
                          onChange={handleChangeType}
                          name={type}
                          disabled={submitting}
                        />
                      }
                      label={type}
                    />
                  ))}
                </div>
              </div>

              <Button
                variant="contained"
                color="primary"
                className="bg-blue-500"
                onClick={handleSubmit}
                disabled={submitting}
              >
                開始配對
              </Button>
            </FormControl>
          </div>
          <Snackbar
            open={hasError}
            autoHideDuration={6000}
            onClose={handleCloseError}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseError}
              severity="error"
              sx={{ width: "100%" }}
            >
              {"請填寫以下欄位：" + emptyFields.join("、")}
            </Alert>
          </Snackbar>
          {submitting && (
            <div className="mt-2 flex flex-col items-center">
              <Typography variant="h6" className="text-center mt-2 mb-3">
                你選擇的結果如下，你還有 {countdown} 秒鐘可以反悔， {countdown}{" "}
                秒鐘後會開始配對......
              </Typography>
              <div className="w-1/2 flex flex-col">
                <Typography variant="body1" className="text mt-2 mb-3">
                  選擇人數：{pplCount} 人
                </Typography>
                <Typography variant="body1" className="mt-2 mb-3">
                  選擇時間：{Number(selectedTime) % 24}:00 ~{" "}
                  {(Number(selectedTime) + 1) % 24}:00
                </Typography>
                <Typography variant="body1" className="mt-2 mb-3">
                  價格範圍：{priceRanges[Number(selectedPriceRange)]}
                </Typography>
                <Typography variant="body1" className="mt-2 mb-3">
                  選擇類型：{selectedTypes.join(", ")}
                </Typography>
              </div>
              <Button
                variant="contained"
                color="primary"
                className="bg-gray-500 hover:bg-gray-600"
                onClick={handleUndoSubmit}
                disabled={countdown === 0}
              >
                讓我再想想
              </Button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
