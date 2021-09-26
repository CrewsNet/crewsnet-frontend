import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Colors } from "../../../../styles/Colors";
import useProfile from "../../../../data-access/useProfile/useProfile";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(12, 3),
    backgroundColor: Colors.blackShade1,
    minHeight: "100vh",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { profile, setProfile, getProfile, saveProfile } = useProfile();

  // useEffect(() => {
  //   getProfile();
  // }, []);

  return (
    <div className={classes.content}>
      <Typography>Profile</Typography>
    </div>
  );
};

export default Profile;
