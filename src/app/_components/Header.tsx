"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Badge,
  IconButton,
  ListItemText,
  Tooltip,
  Menu,
  MenuItem,
  ButtonBase,
  ListItemIcon,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null);
  const notificationOpen = Boolean(notificationAnchorEl);
  const handleNotificationClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const router = useRouter();
  const handleOpenAuthModal = () => {
    router.push("/login");
  };

  // temporary variables
  const { data: session } = useSession();
  const userNotificationCount = 10;

  // Access username and avatar URL from the session
  // const userName = session?.user?.username ?? "Guest";
  const isAdmin = (session?.user?.email === "admin@ntu.edu.tw");
  const avatarUrl = session?.user?.avatarUrl ?? "/static/images/avatar/1.jpg";

  const menuItemStyle = "py-3 px-6";

  return (
    <>
      <header className="fixed top-0 w-full h-16 z-50 flex items-center gap-1 bg-white text-black py-3 px-2 border-b-2 border-black">
        <ButtonBase className="p-2 rounded-xl" onClick={() => router.push("/")}>
          <Image
            src="/food-date-icon.jpg"
            alt="Food Date"
            height={14}
            width={200}
          />
          <Image
            src="/map-and-location.png"
            alt="Food Date"
            height={36}
            width={36}
            className="ml-2"
          />
        </ButtonBase>
        <div className="flex-grow">{/* any other things */}</div>
        <div className="flex items-center gap-3 p-3">
          <Tooltip title="展開所有功能">
            <IconButton
              id="apps-button"
              size="large"
              aria-controls={open ? "apps-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <AppsRoundedIcon color="action" sx={{ width: 28, height: 28 }} />
            </IconButton>
          </Tooltip>
          <Menu
            id="apps-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "apps-button",
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // adjust as needed
            transformOrigin={{ vertical: "top", horizontal: "center" }} // adjust as needed
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                router.push("/missions");
              }}
              className={menuItemStyle}
            >                  
              <ListItemText>
                任務列表
              </ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                router.push("/restaurants");
              }}
              className={menuItemStyle}
            >
              <ListItemText>找餐廳</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                router.push("/food-dates/find-dates");
              }}
              className={menuItemStyle}
            >
              <ListItemText>找飯友</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                router.push("/food-dates/my-dates");
              }}
              className={menuItemStyle}
            >
              <ListItemText>我的聚會</ListItemText>
            </MenuItem>
            {
              isAdmin && (
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    router.push("/admin-management");
                  }}
                  className={menuItemStyle}
                >
                  <ListItemText>admin 管理頁面</ListItemText>
                </MenuItem>
              )
            }
          </Menu>
          {session ? (
            <>
              <Tooltip title="通知">
                <IconButton
                  id="notification-button"
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  className="mr-2"
                  aria-controls={
                    notificationOpen ? "notificaion-menu" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={notificationOpen ? "true" : undefined}
                  onClick={handleNotificationClick}
                >
                  <Badge badgeContent={userNotificationCount} color="info">
                    <NotificationsIcon
                      color="action"
                      sx={{ width: 32, height: 32 }}
                    />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Menu
                id="notification-menu"
                anchorEl={notificationAnchorEl}
                open={notificationOpen}
                onClose={handleNotificationClose}
                MenuListProps={{
                  "aria-labelledby": "notification-button",
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // adjust as needed
                transformOrigin={{ vertical: "top", horizontal: "center" }} // adjust as needed
              >
                {Array.from({ length: userNotificationCount }).map((_, i) => {
                  return (
                    <MenuItem
                      className={`${menuItemStyle} max-w-xs`}
                      sx={{ whiteSpace: "normal" }}
                      key={i}
                    >
                      <ListItemIcon>
                        <NotificationsIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>
                        你加入的飯局已經開始了，趕快去吃飯吧！他們在等你喔
                      </ListItemText>
                    </MenuItem>
                  );
                })}
              </Menu>

              <Tooltip title="帳號設定">
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
                  <Avatar
                    src={avatarUrl}
                    sx={{ width: 42, height: 42 }}
                  />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <button
              className="rounded-full hover:bg-gray-300 p-3"
              onClick={handleOpenAuthModal}
            >
              登入
            </button>
          )}
        </div>
      </header>
    </>
  );
}
