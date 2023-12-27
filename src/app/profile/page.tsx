"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Collapse, Divider, List, ListItem, ListItemButton, ListItemText, Snackbar, TextField, Typography } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import EmailIcon from '@mui/icons-material/Email';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useRouter } from "next/navigation";

import type { AlertProps } from '@mui/material/Alert';
import MuiAlert from '@mui/material/Alert';
import ProfileHeader from "./_components/ProfileHeader";
import { useSession } from "next-auth/react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session]);

  const username = session?.user?.username;
  const email = session?.user?.email;
  const bio = "嗨大家，我是大學生小明，生活在這個充滿活力的校園裡。我熱愛探索世界，對於不同的文化和飲食都充滿好奇心。平常喜歡參與社團活動，特別是戶外運動和攝影。我認為人生短暫，應該充實自己，讓每一天都過得有趣有意義。我是一個好相處的人，喜歡和不同背景的人交流，也喜歡嚐試新的食物。如果你對於冒險、音樂和美食有興趣，我們或許可以一起探索校園附近的好吃好玩之處，成為彼此生活的一部分！";
  const coinsLeft = session?.user?.coins;

  const [changePasswordButton, setChangePasswordButton] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newBio, setNewBio] = useState<string>(bio);

  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setHasError(true);
      setErrorMessage("新密碼與確認密碼不相符");
      return;
    }    
  };

  const handleChangeBio = async () => {
    console.log(newBio);
  }

  const handleCloseError = () => {
    setHasError(false);
  }

  const width = "w-7/12";
  return (<>{!!session && 
    <div className="flex flex-col items-center gap-3">
      <ProfileHeader 
        username={username}
        coinsLeft={coinsLeft}
        width={width}
      />
      <Divider 
        sx={{ borderColor: 'gray', borderWidth: 2 }} 
        className={`${width}`}
      />
      <div className={`${width}`}>
        <List
          sx={{ bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          className="w-full"
        >
          <ListItem className="gap-3">
            <EmailIcon />
            <ListItemText primary={email} />
          </ListItem>        
          <ListItemButton 
            onClick={() => {
              setChangePasswordButton(!changePasswordButton);
            }}
            className={`rounded-tl-lg rounded-tr-lg ${changePasswordButton && "bg-gray-100 hover:bg-gray-200"}`}
          >
            <ListItemText primary="更改密碼" />
            {changePasswordButton ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={changePasswordButton} timeout="auto" unmountOnExit className="bg-gray-100 rounded-bl-lg rounded-br-lg">
            <List component="div" disablePadding>
              <ListItem className="ml-2 w-full">                
                <TextField 
                  label="請輸入舊密碼"
                  variant="outlined" 
                  type="password"
                  className="w-full"
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                />
              </ListItem>
              <ListItem className="ml-2 w-full">                
                <TextField 
                  label="請輸入新密碼"
                  variant="outlined" 
                  type="password"
                  className="w-full"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </ListItem>
              <ListItem className="ml-2 w-full">                
                <TextField 
                  label="請再輸入一次新密碼"
                  variant="outlined" 
                  type="password"
                  className="w-full"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </ListItem>
              <ListItem>
                <Button 
                  className="ml-auto"
                  onClick={handleChangePassword}
                >
                  確定
                </Button>
              </ListItem>
            </List>
            <Snackbar 
              open={hasError} 
              autoHideDuration={5000} 
              onClose={handleCloseError}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
              </Alert>
            </Snackbar>            
          </Collapse>

          <ListItem className="flex flex-col items-start">
            <Typography>
              自我介紹
            </Typography>
            <TextareaAutosize 
              className="border-gray-500 border rounded-lg mt-2 w-full min-h-12 p-3"
              minRows={4}
              value={newBio}
              onChange={(e) => {
                setNewBio(e.target.value);
              }}
            />
          </ListItem>
          <ListItem>
            <Button 
              className="ml-auto"
              onClick={handleChangeBio}
            >
              確定
            </Button>
          </ListItem>
        </List>
        
      </div>
      <div>

      </div>
    </div>}</>    
  );
}