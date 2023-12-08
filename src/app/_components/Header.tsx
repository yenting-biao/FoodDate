import { Menu } from "lucide-react";

export default function Header () {
  return (
    <header className="flex items-center gap-2 bg-slate-200 text-black py-3 px-2">
      <button className="rounded-full hover:bg-gray-300 p-1">
        <Menu size={22}/>
      </button>
      <div className="text-2xl">
        Food Date 不揪?
      </div>
      <div className="flex-grow">
        {/* any other things */}
      </div>
      <div>
        登入狀態或登入按鈕
      </div>
    </header>
  );
}