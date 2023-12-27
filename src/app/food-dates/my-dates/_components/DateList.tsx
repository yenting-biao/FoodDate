"use client";
import { useEffect, useState } from "react";
import DatePreview from "./DatePreview";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function chatListPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { id } = useParams();
  const currDateId = Array.isArray(id) ? id[0] : id;
  const [selectedDateId, setSelectedDateId] = useState<string>("");
  useEffect(() => {
    if (pathname === "/chat") setSelectedDateId("");
    else setSelectedDateId(currDateId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, pathname]);

  return (
    <div className="w-1/4 border-r-2 h-full overflow-scroll">
      <h2 className="w-full text-center font-bold text-2xl py-3">我的約會</h2>
      <div className="flex flex-col w-full">
        {Array.from({ length: 15 }).map((_, index) => (
          <DatePreview key={index} />
        ))}
      </div>
    </div>
  );
}
