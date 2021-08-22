import React from "react"
import { withRouter } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import MenuIcon from "@material-ui/icons/Menu"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import InputBase from "@material-ui/core/InputBase"
import SearchIcon from "@material-ui/icons/Search"
import moment from "moment"
import { Feed as FeedSVG } from "../../../../Icons/Icons"

const drawerWidth = 280

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.between("sm", "md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - 2*${drawerWidth}px)`,
      marginRight: drawerWidth,
      marginTop: "16px",
    },
    marginTop: "10px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // // necessary for content to be below app bar
  toolbar: {
    minHeight: "100px",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#1f1f1f",
  },

  search: {
    flexGrow: 1,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#212121",
    "&:hover": {
      opacity: "0.6",
    },
    marginRight: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
  },

  inputInput: {
    padding: theme.spacing(1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    [theme.breakpoints.up("lg")]: {
      width: "40ch",
    },
  },
  selected: {
    backgroundColor: "#A239EA !important",
  },
}))

const DrawerLeft = (props) => {
  const { history } = props

  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const urlNameToindex = {
    feed: 0,
    projects: 1,
    profile: 2,
    contest: 3,
    savedcontest: 4,
    message: 5,
  }

  // const pathnames = props.location.pathname.split("/").filter((x) => x)
  // console.log(pathnames)

  const [selectedIndex, setSelectedIndex] = React.useState(0)
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
      icon: <FeedSVG color="#fff" size="0.9rem" />,
      onClick: (event) => {
        handleListItemClick(event, 0)
        history.push("")
      },
    },
    {
      text: "Projects",
      // icon: <ProjectSVG />,
      selected: 1,
      onClick: (event) => {
        handleListItemClick(event, 1)
        history.push("/projects")
      },
    },
    {
      text: "Profile",
      // icon: <ProfileSVG />,
      selected: 2,
      onClick: (event) => {
        handleListItemClick(event, 2)
        history.push("/profile")
      },
    },
    {
      text: "Contest",
      // icon: <ContestSVG />,
      selected: 3,
      onClick: (event) => {
        handleListItemClick(event, 3)
        history.push("/contest")
      },
    },
    {
      text: "SavedContest",
      // icon: <SavedContestSVG />,
      selected: 4,
      onClick: (event) => {
        handleListItemClick(event, 4)
        history.push("/savedcontest")
      },
    },
    {
      text: "Messages",
      // icon: <MessageSVG />,
      selected: 5,
      onClick: (event) => {
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
        <Typography variant="h5">Crews Net</Typography>
      </div>
      <Divider variant="middle" />
      <List component="nav" aria-label="main mailbox folders">
        {itemsList.map((item, index) => {
          const { text, icon, onClick, selected } = item
          return (
            <ListItem button classes={{ selected: classes.selected }} selected={selectedIndex === selected} onClick={onClick} key={index}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
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
      <AppBar position="fixed" className={classes.appBar} color="primary" elevation={0}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Hidden smDown>
            <div>
              <Typography variant="caption" color="textSecondary">
                Today
              </Typography>
              <Typography variant="body2" color="textPrimary">
                {moment().format("dddd, Do MMMM YY")}
              </Typography>
            </div>
          </Hidden>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                input: classes.inputInput,
              }}
            />
          </div>
        </Toolbar>
      </AppBar>

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
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
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
