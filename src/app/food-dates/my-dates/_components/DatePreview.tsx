import { Calendar, UserRound } from "lucide-react";
import Link from "next/link";

export type ChatPreviewProps = {
  dateId: string;
  userCount: number;
  users: string[];
};

export default function ChatPreview() {
  return (
    <Link
      className={"flex flex-col py-2 px-2 hover:bg-gray-100 rounded-md"}
      href={`/food-dates/my-dates/${1}`}
    >
      {/* We can add profile photo like Messenger later */}
      <h3 className="text-lg">
        四人團：<span>Togi, Nuk, Biao</span>
      </h3>
      <p className="text-gray-500">Togi: Hello</p>
    </Link>
  );
}
