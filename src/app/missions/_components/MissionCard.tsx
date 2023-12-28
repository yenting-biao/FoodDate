"use client"

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, useMediaQuery, useTheme } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import { useState } from "react";

type Props = {
  missionId: string;
  missionName: string;
  missionDescription: string;
  prize: number;
  finished: boolean;
}

export default function MissionCard({missionId, missionName, missionDescription, prize, finished}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  
  return (
    <>
      <div 
        className={`border border-gray-500 rounded-xl  w-full p-4 pb-12 ${finished ? "bg-gray-300 text-gray-600" : "hover:bg-gray-100 hover: cursor-pointer active:bg-gray-200"}`}
        onClick={() => {
          if(!finished) {            
            setOpen(true);
          }        
        }}
      >
        <Typography variant="h4" className="text-center pt-12">
          {missionName}
        </Typography>
        <Typography variant="subtitle1" className="text-center mr-6 pt-2">
          {finished ? (
            "已完成"
          ) : (<>
            <span className="text-xl mr-2"> + </span>
            <PaidIcon sx={{ color: 'gold', width: 32, height: 32, marginBottom: 1 }}/>
            {` ${prize}`}
          </>)}
        </Typography>
        
    </div>
      <MissionDialog 
        open={open}
        handleClose={() => {
          console.log("close!", open);
          setOpen(false);
        }}
        missionId={missionId}
        missionName={missionName}
        missionDescription={missionDescription}
        prize={prize}
      />
    </>
  )
}

type DialogProps = {
  open: boolean;
  handleClose: () => void;

  missionId: string;
  missionName: string;
  prize: number;
  missionDescription: string;
}

function MissionDialog({ open, handleClose, missionId, missionName, prize, missionDescription }: DialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle 
        id="responsive-dialog-title" 
        variant="h4"
        className="text-center pt-6"
      >
        {missionName + " "}
        <PaidIcon sx={{ color: 'gold', width: 32, height: 32, marginBottom: 1 }}/> {prize}
      </DialogTitle>
      <DialogContent>
        <DialogContentText variant="subtitle1" className="text-black">
          {missionDescription}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Disagree
        </Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}