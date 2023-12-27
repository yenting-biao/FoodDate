import DateList from "./_components/DateList";

export default function ChatsPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row h-full">
      <DateList />
      {children}
    </div>
  );
}
