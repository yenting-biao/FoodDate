"use client"

import AuthForm from "../_components/AuthForm";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Badge, IconButton, ListItemIcon, ListItemText, Tooltip, Typography, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import Settings from '@mui/icons-material/Settings';

export default function Header() {
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const handleOpenAuthModal = () => {
    setOpenAuthModal(true);
  };
  const handleCloseAuthModal = () => {
    setOpenAuthModal(false);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (path: string) => {
    setAnchorEl(null);
  };

  const router = useRouter();

  // temporary variables
  const [auth, setAuth] = useState<boolean>(true); 
  const userNotificationCount = 1; 
  const userName = "User Name"; 
  const avatarUrl = "/static/images/avatar/1.jpg"; 

  return (
    <>
      <header className="fixed top-0 w-full h-16 z-50 flex items-center gap-1 bg-slate-200 text-black py-3 px-2">
             
        <Typography variant="h5" className="ml-2">
          Food Date 不揪?
        </Typography>
        <div className="flex-grow">
          {/* any other things */}
        </div>
        <div>
        {auth ? 
          (
            <div className="flex items-center gap-3 p-3">
              <Tooltip title="More">
                <IconButton 
                  id="apps-button"
                  size="large"
                  aria-controls={open ? 'apps-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <AppsRoundedIcon color="action" sx={{width: 28, height: 28}}/>
                </IconButton>
              </Tooltip>
              <Menu
                id="apps-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'apps-button',
                }}
              >
                <MenuItem onClick={() => {
                  setAnchorEl(null);
                  router.push("/missions");
                }}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    每日任務
                  </ListItemText>
                </MenuItem>

                <MenuItem onClick={() => {
                  setAnchorEl(null);
                  router.push("/restaurants");
                }}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    找餐廳
                  </ListItemText>
                </MenuItem>

                <MenuItem onClick={() => {
                  setAnchorEl(null);
                  router.push("/food-dates");
                }}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    找飯友
                  </ListItemText>
                </MenuItem>
              </Menu>
              

              <Tooltip title="通知">
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={userNotificationCount} color="info">
                    <NotificationsIcon color="action" sx={{width: 28, height: 28}}/>
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <Tooltip title="帳號設定">
                <IconButton sx={{ p: 0 }}>
                  <Avatar
                    alt={userName}
                    src={avatarUrl}
                    sx={{ width: 30, height: 30 }}
                  />
                </IconButton>
              </Tooltip>
              
            </div>
          ) : (
            <button
              className="rounded-full hover:bg-gray-300 p-3"
              onClick={handleOpenAuthModal}
            >
              登入
            </button>
          )
        }
        </div>
      </header>
      {openAuthModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <AuthForm onCloseAuthModal={handleCloseAuthModal} />
        </div>
      )}
    </>
    
  );
}