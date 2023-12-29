import { Button } from "@mui/material";
import Link from "next/link";

export default function AdminPage () {
  return (
    <div className="flex flex-col p-4">
      <Link href="/admin-management/mission">
        <Button variant="contained" className="bg-blue-500 px-10 py-5 text-2xl">
          任務管理
        </Button>
      </Link>
    </div>
  )
}