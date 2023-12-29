"use client";
import { Divider, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import Stack from "@mui/material/Stack";

export default function FindDatePage() {
  async function joinDate(dateId: string) {
    //TODO:
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      <Typography variant="h4" className="text-center mt-7">
        找不到人一起吃飯嗎？那你來對地方了！
      </Typography>
      <Typography variant="h6" className="text-center mt-1">
        一起吃飯，賺取金幣，換取獎勵！
      </Typography>
      <Divider className="w-1/4 my-4" />
      <Typography variant="h6" className="text-center mt-1 text-gray-500">
        點選加入以下約會，或
        <Link className="underline" href="/food-dates/find-dates/create">
          新增自己的約會
        </Link>
      </Typography>
      <div className="w-full max-w-[500px] mt-5">
        <Tooltip
          arrow
          title="加入約會"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          <button
            className="active:bg-gray-200 hover:bg-gray-100 rounded-lg w-full px-2 py-2 flex flex-col items-start"
            onClick={(event) => {
              event.preventDefault();
              joinDate("hello");
            }}
          >
            <div className="flex items-center gap-2">
              <Stack direction="row" spacing={-1} className="">
                <Avatar className="w-6 h-6" />
                <Avatar className="w-6 h-6" />
                <Avatar className="w-6 h-6" />
              </Stack>
              <p className="text-xl">四人團缺二</p>
            </div>
            <div className="mt-2 text-gray-600">時間：午餐 (12:00 ~ 1:00)</div>
            <div
              title="有聘請顧問, 含雜貨店, 注重健康, 拉麵洗腎幫, 泰式料理, 主打蔬食"
              className="text-gray-600 w-full text-start whitespace-nowrap overflow-hidden text-ellipsis"
            >
              想去的餐廳類型："有聘請顧問", "含雜貨店", "注重健康",
              "拉麵洗腎幫", "泰式料理", "主打蔬食",
            </div>
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
