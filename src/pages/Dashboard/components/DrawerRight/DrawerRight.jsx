import React, { useContext, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Drawer, CssBaseline, List, Typography, Divider, ListItem, ListItemText, ListItemAvatar, Avatar, Hidden } from "@material-ui/core"

import { Colors } from "../../../../styles/Colors"
import { withRouter } from "react-router-dom"
import { Notification as NotificationSVG } from "../../../../assets/Icons/Icons"
import { Logout as LogoutSVG } from "../../../../assets/Icons/Icons"
import { ChatMessage as ChatMessageSVG } from "../../../../assets/Icons/Icons"
import { AuthContext } from "../../../../context/AuthContext"
import { customHistory } from "../../../../App"
import useUser from "../../../../data-access/useUser/useUser"

const drawerWidth = 300

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 1,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: Colors.blackShade1,
  },
  toolbar: theme.mixins.toolbar,
  avatar: {
    margin: theme.spacing(1, 2),
  },
}))

const chat = [
  {
    avatarUrl: "https://i.pinimg.com/236x/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888--no-face-facebook-profile.jpg",
    name: "Ujjwal Garg",
    email: "Lorem",
    unreadMessage: true,
  },
  {
    avatarUrl: "https://i.pinimg.com/236x/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888--no-face-facebook-profile.jpg",
    name: "Ujjwal Garg",
    email: "Lorem",
    unreadMessage: true,
  },
  {
    avatarUrl: "https://i.pinimg.com/236x/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888--no-face-facebook-profile.jpg",
    name: "Ujjwal Garg",
    email: "Lorem",
    unreadMessage: false,
  },
  {
    avatarUrl: "https://i.pinimg.com/236x/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888--no-face-facebook-profile.jpg",
    name: "Ujjwal Garg",
    email: "Lorem",
    unreadMessage: true,
  },
]

const DrawerRight = (props) => {
  const classes = useStyles()
  const { logout } = useContext(AuthContext)
  const { getUser, user } = useUser()

  useEffect(() => {
    getUser()
  }, [])
  const handleLogout = () => {
    logout()
  }
  return (
    <div>
      <CssBaseline />
      <Hidden smDown>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right"
        >
          <div className={classes.toolbar} style={{ display: "flex", alignItems: "center" }}>
            <Avatar alt="" src={user?.photo} className={classes.avatar} />
            <div>
              <p style={{ margin: "0", fontSize: "14px" }}>{user && user.name}</p>
              <p style={{ margin: "0", color: "grey", fontSize: "10px" }}>{user && user.email}</p>
            </div>
            <div
              style={{
                flexGrow: "1",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <NotificationSVG size="1.1rem" cursor="pointer" />
              <LogoutSVG
                size="1.1rem"
                cursor="pointer"
                onClick={() => {
                  handleLogout()
                }}
              />
            </div>
          </div>
          <Divider />

          <div
            style={{
              flexGrow: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Divider />
            <div
              style={{
                display: "flex",
                color: "#E0C097",
                padding: "10px 0",
              }}
            >
              <div style={{ padding: " 4px 12px 0 14px" }}>
                <ChatMessageSVG size="0.9rem" />
              </div>
              <div>Recent Message</div>
            </div>
            <List style={{ padding: 0 }}>
              {chat.map((user, index) => {
                const { avatarUrl, name, email, unreadMessage } = user

                return (
                  <div key={index}>
                    <ListItem button alignItems="flex-start" style={{ padding: "20px" }}>
                      <ListItemAvatar>
                        <Avatar alt={name} src={avatarUrl} />
                      </ListItemAvatar>

                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography style={{ fontSize: "14px" }}>{name}</Typography>
                          </React.Fragment>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography style={{ fontSize: "10px", color: "#9F9F9F" }}>{email}</Typography>
                          </React.Fragment>
                        }
                      />
                      {unreadMessage && (
                        <div
                          style={{
                            width: "25px",
                            height: "20px",
                            borderRadius: "60%",
                            backgroundColor: "green",
                            margin: "10px 24px 0",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                          }}
                        >
                          <div style={{ fontSize: "11px" }}>10+</div>
                        </div>
                      )}
                    </ListItem>
                    <Divider variant="middle" component="li" />
                  </div>
                )
              })}
            </List>
          </div>
        </Drawer>
      </Hidden>
    </div>
  )
}

export default withRouter(DrawerRight)
