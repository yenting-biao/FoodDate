"use client";
import { useEffect, useState } from "react";
import DatePreview from "./DatePreview";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Message } from "@/lib/types/db";
import Link from "next/link";
import { datePreviewType } from "../layout";

export default function chatListPage(props: { dates: datePreviewType[] }) {
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const { id } = useParams();
  const currDateId = Array.isArray(id) ? id[0] : id;
  const [dates, setDates] = useState<datePreviewType[]>(props.dates);
  const [selectedDateId, setSelectedDateId] = useState<string>("");
  const chineseNumbers = ["一", "二", "三", "四"];

  useEffect(() => {
    if (pathname === "/chat") setSelectedDateId("");
    else setSelectedDateId(currDateId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, pathname]);

  useEffect(() => {
    setDates(props.dates);
  }, [props.dates.length]);

  return (
    <div className="w-1/4 border-r-2 h-full overflow-y-scroll px-1 flex flex-col items-center">
      <h2 className="w-full text-center font-bold text-2xl py-3 bg-white">
        我的聚會
      </h2>
      <div className="flex flex-col w-full">
        {!dates.length && (
          <div className="text-center w-full text-gray-400">
            立即
            <Link className="underline" href="/food-dates/find-dates">
              找飯友
            </Link>
          </div>
        )}
        {dates.map((date) => (
          <DatePreview
            key={date.dateId}
            dateId={date.dateId}
            title={date.title}
            lastMessage={date.lastMessage}
            avatarUrls={date.avatarUrls}
          />
        ))}
      </div>
    </div>
  );
}
