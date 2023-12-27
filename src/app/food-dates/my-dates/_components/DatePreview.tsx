import Link from "next/link";

export type ChatPreviewProps = {
  dateId: string;
  title: string;
  lastMessage: string;
};

export default function ChatPreview({
  dateId,
  title,
  lastMessage,
}: ChatPreviewProps) {
  return (
    <Link
      className={"flex flex-col py-2 px-2 hover:bg-gray-100 rounded-md"}
      href={`/food-dates/my-dates/${dateId}`}
    >
      {/* We can add profile photo like Messenger later */}
      <h3 className="text-lg overflow-hidden overflow-ellipsis h-8 w-full">
        {title}
      </h3>
      <p className="text-gray-500 h-6 overflow-hidden overflow-ellipsis w-5/6">
        {lastMessage}
      </p>
    </Link>
  );
}
