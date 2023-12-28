import Linkify from "react-linkify";
import Tooltip from "@mui/material/Tooltip";

import { cn } from "@/lib/utils/shadcn";
import Image from "next/image";

type MessageContainerProps = {
  username: string;
  senderUsername: string | null;
  content: string;
  avatarUrls: Object;
};

function Urlify(message: string) {
  return (
    <Linkify
      componentDecorator={(decoratedHref, decoratedText, key) => (
        <a
          target="blank"
          href={decoratedHref}
          key={key}
          className="hover:underline"
        >
          {decoratedText}
        </a>
      )}
    >
      {message}
    </Linkify>
  );
}

export default function MessageContainer({
  username,
  senderUsername,
  content,
  avatarUrls,
}: MessageContainerProps) {
  const fromServer = senderUsername === "server";
  const isMine = senderUsername && username === senderUsername;

  return (
    <>
      {fromServer && (
        <div className="w-full text-center">
          <p className="text-gray-400">{Urlify(content)}</p>
        </div>
      )}
      {!fromServer && isMine && (
        <div className="flex w-full items-end gap-2 justify-end">
          <div className="break-all px-3 py-1 bg-blue-500 text-white rounded-l-2xl rounded-tr-2xl">
            {Urlify(content)}
          </div>
          <Tooltip
            title={senderUsername ?? "[已刪除]"}
            placement="right"
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
            <Image
              src="/default-avatar.png"
              alt="default avatar"
              width={30}
              height={30}
              className="rounded-full min-w-[30px]"
            />
          </Tooltip>
        </div>
      )}
      {!fromServer && !isMine && (
        <div className="flex w-full items-end gap-2 justify-start">
          <Tooltip
            title={senderUsername ?? "[已刪除]"}
            placement="left"
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
            <Image
              src="/default-avatar.png"
              alt="default avatar"
              width={30}
              height={30}
              className="rounded-full min-w-[30px]"
            />
          </Tooltip>
          <div className="break-all px-3 py-1 bg-gray-100 text-black rounded-r-2xl rounded-tl-2xl">
            {Urlify(content)}
          </div>
        </div>
      )}
    </>
  );
}
