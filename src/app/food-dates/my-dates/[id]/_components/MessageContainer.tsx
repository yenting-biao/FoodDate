"use client";

import { useState } from "react";
import Linkify from "react-linkify";

import { cn } from "@/lib/utils/shadcn";

type UrifyProps = {
  message: string;
};

function Urlify({ message }: UrifyProps) {
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

type MessageProps = {
  isMyOwn: boolean;
  message: string;
  messageId: string;
  dateId: string;
  username: string;
  validity: string;
};

export default function MessageContainer({
  isMyOwn,
  message,
  messageId,
  dateId,
  username,
  validity,
}: MessageProps) {
  const [modalOpen, setModalOpen] = useState(false);

  //console.log("validity: " + validity);
  const seenable =
    validity === "valid" || (validity === "senderInvalid" && !isMyOwn);

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!seenable) return;
    // Handle right click event here
    setModalOpen(true);
  };
  return (
    <div
      className={`mb-2 flex flex-row justify-start gap-2 ${
        isMyOwn ? "justify-end" : "justify-start"
      }`}
    >
      {/*<div className="flex flex-col items-center justify-center w-10 h-10 rounded-full bg-gray-500">
        <div className="text-white">
          Other
        </div>
  </div>*/}
      <div
        className={cn(
          `flex flex-col items-end justify-center break-all rounded-xl px-2 py-1 text-white
        ${
          isMyOwn
            ? "rounded-br-none bg-blue-600 hover:bg-blue-500"
            : "rounded-bl-none bg-gray-500 hover:bg-gray-400"
        } max-w-md 
        ${modalOpen ? "z-10 backdrop-blur-none" : ""}`,
          `${
            !seenable
              ? "border-2 border-solid border-gray-500 bg-black text-gray-400 hover:bg-black"
              : ""
          }`,
        )}
        onContextMenu={handleRightClick}
      >
        <p className="break-all">
          {validity === "valid" ? (
            <Urlify message={message} />
          ) : validity === "invalid" ? (
            "The message has been unsent for everyone"
          ) : seenable ? (
            <Urlify message={message} />
          ) : (
            "The message has been unsent for you"
          )}
        </p>
      </div>
    </div>
  );
}