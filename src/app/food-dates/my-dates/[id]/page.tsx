"use client";
import {
  APIProvider,
  Map,
  Marker,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import MessageContainer from "./_components/MessageContainer";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { Message } from "@/lib/types/db";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export default function Chat() {
  const { data: session } = useSession();
  const username = session?.user?.username;
  const userId = session?.user?.id;
  const router = useRouter();
  const { id } = useParams();
  const dateId = Array.isArray(id) ? id[0] : id;
  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("Loading chat...");
  const [avatarUrls, setAvatarUrls] = useState<
    { username: string; avatarUrl: string | null }[]
  >([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [position, setPosition] = useState({
    lat: 25.01834354450372,
    lng: 121.53977457666448,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const chineseNumbers = ["一", "二", "三", "四"];

  // initial fetching
  useEffect(() => {
    if (!username) return;
    if (id && !regex.test(dateId)) {
      router.push("/food-dates/my-dates");
      return;
    }
    const fetchMessages = async () => {
      const res = await fetch(`/api/date/chat/${dateId}`);
      if (res.status === 404 || !res.ok) {
        router.push("/food-dates/my-dates");
        return;
      }
      const data: {
        participantUsernames: (string | null)[];
        avatarUrls: { username: string; avatarUrl: string | null }[];
        messages: Message[];
      } = await res.json();
      const participantCount = data.participantUsernames.length;
      let userList = "";
      for (let i = 0; i < participantCount - 1; i++)
        userList += (data.participantUsernames[i] ?? "[已刪除]") + ", ";
      userList += data.participantUsernames[participantCount - 1];
      setTitle(chineseNumbers[participantCount - 1] + "人團：" + userList);
      setAvatarUrls(data.avatarUrls);
      setMessages(data.messages);
      setLoading(false);
    };
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, dateId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const content = inputRef.current!.value;
    if (!content) return;
    const res = await fetch(`/api/date/chat/${dateId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });
    if (!res.ok) return;
    const body: { messageId: string } = await res.json();
    inputRef.current!.value = "";
    setMessages((messages) => [
      {
        messageId: body.messageId,
        senderUsername: username!,
        content,
      },
      ...messages,
    ]);
    router.refresh();
  }

  if (!username || !userId) return;

  return (
    <>
      {loading && (
        <div className="h-full w-3/4 flex justify-center items-center">
          <p className="text-xl text-gray-400">Loading...</p>
        </div>
      )}
      {!loading && (
        <div className="flex w-3/4 h-full">
          <div className="h-full w-2/3 flex-col overflow-y-scroll flex">
            <div className="flex flex-row gap-2 border-b-2 w-full py-3 px-3 overflow-hidden items-center">
              <AvatarGroup spacing="small">
                {avatarUrls.map((element, index) => (
                  <Avatar
                    alt={element.username ?? ""}
                    key={index}
                    src={element.avatarUrl ?? ""}
                  />
                ))}
              </AvatarGroup>
              <p className="text-lg w-full whitespace-nowrap text-ellipsis overflow-hidden">
                {title}fewjiofewjfiwej reiowrjweoirjewirjewioj
              </p>
            </div>
            <div className="px-3 flex flex-col-reverse justify-start gap-2 h-full overflow-y-scroll">
              {messages.map((m, index) => (
                <MessageContainer
                  key={m.messageId}
                  username={username}
                  senderUsername={m.senderUsername}
                  content={m.content}
                  avatarUrls={avatarUrls}
                />
              ))}
            </div>
            <form className="my-5 px-3" onSubmit={handleSubmit}>
              <input
                className="h-10 w-full rounded-full border-none bg-gray-100 p-5 outline-none focus:outline-none"
                placeholder="Aa"
                name="content"
                ref={inputRef}
              />
            </form>
          </div>
          <div className="h-full w-1/3">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
              <Map
                center={position}
                zoom={15}
                mapId={process.env.NEXT_PUBLIC_MAP_ID}
                class="h-full"
              >
                {/* <Marker position={position} /> */}
              </Map>
            </APIProvider>
          </div>
        </div>
      )}
    </>
  );
}

const testMessages = [
  {
    messageId: "1",
    senderUsername: "togi",
    content:
      "HFEFHWIOFHJIWFJIWEFJIWFJIMJHFEFHWIOFHJIWFJIWEFJIWFJIMJHFEFHWIOFHJIWFJIWEFJIWFJIMJHFEFHWIOFHJIWFJIWEFJIWFJIMJHFEFHWIOFHJIWFJIWEFJIWFJIMJHFEFHWIOFHJIWFJIWEFJIWFJIMJHFEFHWIOFHJIWFJIWEFJIWFJIMJHFEFHWIOFHJIWFJIWEFJIWFJIMJHFEFHWIOFHJIWFJIWEFJIWFJIMJ",
  },
  {
    messageId: "2",
    senderUsername: "togi",
    content: "hello",
  },
  {
    messageId: "3",
    senderUsername: "togi",
    content: "hello",
  },
  {
    messageId: "4",
    senderUsername: "server",
    content: "hello",
  },
  {
    messageId: "5",
    senderUsername: "togi",
    content: "hello",
  },
  {
    messageId: "6",
    senderUsername: "server",
    content: "hello fewfwe few fwe fewf ewf ewf ewfew fewf ewf ewf we",
  },
  {
    messageId: "7",
    senderUsername: "server",
    content: "hefwefewfwello",
  },
];
