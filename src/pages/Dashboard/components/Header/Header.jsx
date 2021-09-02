import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import moment from "moment";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.between("sm", "md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - 2*${drawerWidth}px)`,
      marginRight: drawerWidth,
      paddingTop: "16px",
    },
    paddingTop: "10px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    [theme.breakpoints.up("lg")]: {
      width: "40ch",
    },
  },
}));

const Header = ({ showDrawerLeft, setShowDrawerLeft }) => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />

      <AppBar
        position="fixed"
        className={classes.appBar}
        color="primary"
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            className={classes.menuButton}
            onClick={() => {
              setShowDrawerLeft(!showDrawerLeft);
            }}
          >
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
    </>
  );
};

export default Header;
