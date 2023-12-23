import { Typography, TextField } from "@mui/material"
import MessageContainer from "./MessageContainer";

export default function DateDetails () {
  return (
    <div className="flex flex-col flex-grow h-screen">
      <div className="pl-4">
        <Typography 
          className="font-semibold border-b-2 w-full"
          variant="h5"
        >
          2023/12/12 麥當勞 四人團
        </Typography>
      </div>
      <div className="flex-grow overflow-y-scroll mt-3">
        <div className="flex flex-col items-center mb-3 text-gray-600">
          <div>
            系統提示：配對成功！
          </div>
          <div className="max-w-xl text-center">
            觸發任務：請在 2023/12/12 18:00 前到達 麥當勞長興店 並打卡，以獲得 100 金幣獎勵，所有人都到達每人再加碼 100 金幣！
          </div>          
        </div>
        <div>
          {Array.from({ length: 30}).map((_, i) => (
            <MessageContainer 
              key={i}
              isMyOwn={i % 2 === 0}
              message={`Message ${i}`}
              messageId={`messageId ${i}`}
              dateId={`chatroomId ${i}`}
              username={`username ${i}`}
              validity={i % 3 !== 0 ? "valid" : "invalid"}
            />          
          ))}          
        </div>        
      </div>
      <div className="p-1">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="輸入訊息"
        />
      </div>
    </div>
  );
}