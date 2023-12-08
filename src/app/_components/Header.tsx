import { Menu } from "lucide-react";

type HeaderProps = {
  onOpenAuthModal: () => void;
};

export default function Header({ onOpenAuthModal }: HeaderProps) {
  return (
    <header className="flex items-center gap-2 bg-slate-200 text-black py-3 px-2">
      
        <Menu size={22} />
      <div className="text-2xl">
        Food Date 不揪?
      </div>
      <div className="flex-grow">
        {/* any other things */}
      </div>
      <div>
        <button
        className="rounded-full hover:bg-gray-300 p-1"
        onClick={onOpenAuthModal}
      >登入</button>
      </div>
    </header>
  );
}