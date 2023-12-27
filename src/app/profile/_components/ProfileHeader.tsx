"use client"
import { useState } from "react";
import { Avatar, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  username: string;
  coinsLeft: number;
  width: string;
}

export default function ProfileHeader({username, coinsLeft, width}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={`flex items-center gap-2 ${width}`}>
      <div className="flex w-full items-center gap-5 text-4xl">
        <Avatar
          sx={{ width: 56, height: 56 }}
          className="text-3xl"
        >
          H
        </Avatar>
        <Typography variant="h4" className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          {username}
        </Typography>
        {!isSmallScreen && <div className="flex items-center text-lg gap-2">
          <PaidIcon sx={{ color: 'gold', width: 32, height: 32 }}/>
          <Typography variant="h6" className="mt-0.5">
            {coinsLeft}
          </Typography>
          <button
            className="hover:bg-gray-100 active:bg-gray-200 rounded-full p-2"
            onClick={() => setOpen(true)}
          >
            <AddCircleOutlineIcon 
              sx={{width: 24, height: 24}} 
            />
          </button>                        
        </div>}
      </div>
      
      <div>
        <Button 
          variant="contained"
          className="bg-blue-500"
        >
          登出
        </Button>
      </div>
      <PayDialog open={open} onClose={() => setOpen(false)}/>
    </div>
  );
}

type PayDialogProps = {
  open: boolean;
  onClose: () => void;
}

function PayDialog({open, onClose}: PayDialogProps) {  
  return (
    <Dialog onClose={onClose} open = {open}>
      <DialogTitle className="font-semibold">你要課金嗎？</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 12,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        100 金幣相當於 10 元台幣，儲值 1000 金幣，再送 100 金幣。
      </DialogContent>
    </Dialog>
  );
}