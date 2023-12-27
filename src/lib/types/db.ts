export type User = {
    id: string;
    username: string;
    email: string;
    avatarUrl: string;
    coins: number;
    provider: "credentials";
  };

export type Message = {
  messageId: string;
  senderUsername: string | null;
  content: string;
};