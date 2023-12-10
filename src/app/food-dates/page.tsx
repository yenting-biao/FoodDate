"use client"
import { useState, useEffect } from "react";

import { Button, Checkbox, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";

export default function FoodDatePage () {
  const currentHour = new Date().getHours() + 1;
  const restaurantTypes = ["台灣料理", "速食", "韓國料理", "義大利麵", "泰國菜", "素食"]; // temporary variables
  const priceRanges = ["$ （1～200元）", "$$ （200 ~ 400元）", "$$$ （400～600元）", "$$$$ （600元以上）"];

  const [pplCount, setPplCount] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentSelectedType = event.target.name as string;
    if (selectedTypes.includes(currentSelectedType)) {
      setSelectedTypes(selectedTypes.filter(type => type !== currentSelectedType));
    } else {
      setSelectedTypes([...selectedTypes, currentSelectedType]);
    }
    console.log("selectedTypes", selectedTypes);
  };

  const countdownValue = 8;
  const [submitting, setSubmitting] = useState<boolean>(false);  
  const [countdown, setCountdown] = useState<number>(countdownValue);
  const [hasSubmit, setHasSubmit] = useState<boolean>(false);
  const [dots, setDots] = useState(0);

  const handleUndoSubmit = () => {
    setSubmitting(false);
    setCountdown(countdownValue);
  }
  
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
  
  // TODO: Note that we have not checked if all the fields are filled or not. This needs to be implemented later.
  return (
    <main className="flex flex-col items-center w-full h-full mb-14">
      {hasSubmit ? 
      (
        <div className="flex flex-col items-center mt-5">
          <Typography variant="h4" className="text-center mt-2">
            配對中{'.'.repeat(dots)}
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
          <Divider className="w-1/4 my-4"/>
          <div className="w-1/4 mt-2">
            <FormControl fullWidth className="flex flex-col gap-5">
              <div className="flex flex-col items-start">
                <Typography variant="h6">
                  選擇人數：
                </Typography>
                <TextField
                  select
                  placeholder="選擇人數"
                  value={pplCount}
                  onChange={data => setPplCount(data.target.value)}
                  margin="normal"
                  variant="outlined"
                  className="w-full"
                  disabled={submitting}
                >
                  {Array.from({length: 4}, (_, i) => i + 1).map(count => (
                    <MenuItem key={count} value={count}>
                      {count} 人
                    </MenuItem>
                  ))}
                </TextField>            
              </div>
              <div className="flex flex-col items-start">
                <Typography variant="h6">
                  選擇時間：
                </Typography>
                <TextField
                  select
                  placeholder="選擇時間"
                  value={selectedTime}
                  onChange={data => setSelectedTime(data.target.value)}
                  margin="normal"
                  variant="outlined"
                  className="w-full"
                  disabled={submitting}
                >
                  {Array.from({length: 13}, (_, i) => currentHour + i).map(hour => (
                    <MenuItem key={hour} value={hour}>
                      {hour % 24}:00 ~ {(hour + 1) % 24}:00
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="flex flex-col items-start">
                <Typography variant="h6">
                  價格範圍：
                </Typography>
                <TextField
                  select
                  placeholder="價格範圍"
                  value={selectedPriceRange}
                  onChange={data => setSelectedPriceRange(data.target.value)}
                  margin="normal"
                  variant="outlined"
                  className="w-full"
                  disabled={submitting}
                >
                  {Array.from({length: 4}, (_, i) => i).map(count => (
                    <MenuItem key={count} value={count}>
                      {priceRanges[count]}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Typography variant="h6">
                  選擇類型：
                </Typography>
                <div className="w-full">
                  {restaurantTypes.map(type => (
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
                onClick={() => setSubmitting(true)}
                disabled={submitting}
              >
                開始配對
              </Button>
              
            </FormControl>
          </div>

          {submitting && 
          <div className="w-1/4 mt-2 flex flex-col items-center">
            <Typography variant="h6" className="text-center mt-2 mb-3">
              你選擇的結果如下，你還有{countdown}秒鐘可以反悔，{countdown}秒鐘後會開始配對......
            </Typography>
            <div className="w-1/2 flex flex-col">
              <Typography variant="body1" className="text mt-2 mb-3">
                選擇人數：{pplCount} 人
              </Typography>
              <Typography variant="body1" className="mt-2 mb-3">
                選擇時間：{Number(selectedTime) % 24}:00 ~ {(Number(selectedTime) + 1) % 24}:00
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
          </div>}
        </>
      )}
      
    </main>
  );
}