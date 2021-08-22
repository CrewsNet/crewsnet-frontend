import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Hidden from "@material-ui/core/Hidden";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, withRouter } from "react-router-dom";
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";

import { customHistory } from "../../../../App";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 1,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#181818",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  avatar: {
    margin: theme.spacing(1, 2),
  },
}));

const chat = [
  {
    avatarUrl:
      "https://i.pinimg.com/236x/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888--no-face-facebook-profile.jpg",
    name: "Ujjwal Garg",
    email: "Lorem",
    unreadMessage: true,
  },
  {
    avatarUrl:
      "https://i.pinimg.com/236x/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888--no-face-facebook-profile.jpg",
    name: "Ujjwal Garg",
    email: "Lorem",
    unreadMessage: true,
  },
  {
    avatarUrl:
      "https://i.pinimg.com/236x/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888--no-face-facebook-profile.jpg",
    name: "Ujjwal Garg",
    email: "Lorem",
    unreadMessage: false,
  },
  {
    avatarUrl:
      "https://i.pinimg.com/236x/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888--no-face-facebook-profile.jpg",
    name: "Ujjwal Garg",
    email: "Lorem",
    unreadMessage: true,
  },
];

const DrawerRight = (props) => {
  const classes = useStyles();

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
          <div
            className={classes.toolbar}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Avatar
              alt=""
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              className={classes.avatar}
            />
            <div>
              <p style={{ margin: "0", fontSize: "14px" }}>Ujjwal Garg</p>
              <p style={{ margin: "0", color: "grey", fontSize: "10px" }}>
                ujjwalgarg.252@gmail.com
              </p>
            </div>
            <div style={{ flexGrow: "1" }}>
              {/* <Link
                to="/signin"
                style={{
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                }}
              > */}
              <ExitToAppIcon
                onClick={() => {
                  console.log(customHistory);
                  customHistory.push("/signin");
                }}
              />

              {/* </Link> */}
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
                padding: "10px 0 20px",
              }}
            >
              <div style={{ padding: " 0px 12px 0 14px" }}>
                <QuestionAnswerRoundedIcon />
              </div>
              <div>Recent Message</div>
            </div>
            <List style={{ padding: 0 }}>
              {chat.map((user, index) => {
                const { avatarUrl, name, email, unreadMessage } = user;

                return (
                  <div key={index}>
                    <ListItem
                      button
                      alignItems="flex-start"
                      style={{ padding: "20px" }}
                    >
                      <ListItemAvatar>
                        <Avatar alt={name} src={avatarUrl} />
                      </ListItemAvatar>

                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography style={{ fontSize: "14px" }}>
                              {name}
                            </Typography>
                          </React.Fragment>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              style={{ fontSize: "10px", color: "#9F9F9F" }}
                            >
                              {email}
                            </Typography>
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
                );
              })}
            </List>
          </div>
        </Drawer>
      </Hidden>
    </div>
  );
};

export default withRouter(DrawerRight);
