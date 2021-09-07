import React, { useState, useEffect, useContext } from "react"
import { withRouter } from "react-router-dom"

import { List, ListItem, ListItemIcon, ListItemText, Typography, Hidden, Divider, CssBaseline, Drawer } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { Feed as FeedSVG } from "../../../../assets/Icons/Icons"
import { Contest as ContestSVG } from "../../../../assets/Icons/Icons"
import { Profile as ProfileSVG } from "../../../../assets/Icons/Icons"
import { Project as ProjectSVG } from "../../../../assets/Icons/Icons"
import { SavedContest as SavedContestSVG } from "../../../../assets/Icons/Icons"
import { Message as MessageSVG } from "../../../../assets/Icons/Icons"
import { Logout as LogoutSVG } from "../../../../assets/Icons/Icons"
import { Colors } from "../../../../styles/Colors"
import { AuthContext } from "../../../../context/AuthContext"

const drawerWidth = 280

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  toolbar: {
    minHeight: "100px",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: Colors.blackShade2,
  },
  selected: {
    backgroundColor: "#A239EA !important",
  },
}))

const DrawerLeft = ({ history, showDrawerLeft, location }) => {
  useEffect(() => {
    handleDrawerToggle()
  }, [showDrawerLeft])

  //logout
  const { logout } = useContext(AuthContext)
  const handleLogout = () => {
    logout()
  }
  /////

  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)

  const urlNameToindex = {
    feed: 0,
    projects: 1,
    profile: 2,
    contest: 3,
    savedcontest: 4,
    messages: 5,
  }

  const pathnames = location.pathname.split("/").filter((x) => x)

  const [selectedIndex, setSelectedIndex] = React.useState(urlNameToindex[pathnames] || 0)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  const itemsList = [
    {
      text: "Feed",
      selected: 0,
      icon: <FeedSVG size="1.2rem" />,
      onClick: (event) => {
        handleListItemClick(event, 0)
        handleDrawerToggle()
        history.push("")
      },
    },
    {
      text: "Projects",
      icon: <ProjectSVG size="1.2rem" />,
      selected: 1,
      onClick: (event) => {
        handleDrawerToggle()
        handleListItemClick(event, 1)
        history.push("/projects")
      },
    },
    {
      text: "Profile",
      icon: <ProfileSVG size="1.2rem" />,
      selected: 2,
      onClick: (event) => {
        handleDrawerToggle()
        handleListItemClick(event, 2)
        history.push("/profile")
      },
    },
    {
      text: "Contest",
      icon: <ContestSVG size="1.2rem" />,
      selected: 3,
      onClick: (event) => {
        handleDrawerToggle()
        handleListItemClick(event, 3)
        history.push("/contest")
      },
    },
    {
      text: "SavedContest",
      icon: <SavedContestSVG size="1.2rem" />,
      selected: 4,
      onClick: (event) => {
        handleDrawerToggle()
        handleListItemClick(event, 4)
        history.push("/savedcontest")
      },
    },
    {
      text: "Messages",
      icon: <MessageSVG size="1.2rem" />,
      selected: 5,
      onClick: (event) => {
        handleDrawerToggle()
        handleListItemClick(event, 5)
        history.push("/messages")
      },
    },
  ]

  const drawer = (
    <div>
      <div
        className={classes.toolbar}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" style={{ fontWeight: "700", letterSpacing: "1px" }}>
          CrewsNet
        </Typography>
      </div>
      <Divider variant="middle" />
      <List component="nav" aria-label="main mailbox folders">
        {itemsList.map((item, index) => {
          const { text, icon, onClick, selected } = item
          return (
            <ListItem button classes={{ selected: classes.selected }} selected={selectedIndex === selected} onClick={onClick} key={index}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        })}
      </List>
    </div>
  )

  return (
    <>
      <CssBaseline />
      <nav className={classes.drawer}>
        <Hidden smUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
            <div style={{ display: "flex", alignItems: "flex-end", flexGrow: 1 }}>
              <ListItem
                button
                onClick={() => {
                  handleLogout()
                }}
                style={{ backgroundColor: "goldenrod" }}
              >
                <ListItemIcon style={{ minWidth: "32px" }}>
                  <LogoutSVG size="1.2rem" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </div>
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  )
}

export default withRouter(DrawerLeft)
