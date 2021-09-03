import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Colors } from "../../../../styles/Colors";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(12, 3),
    backgroundColor: Colors.blackShade1,
    minHeight: "100vh",
  },
}));

const SavedContest = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Typography>SavedContest</Typography>
    </div>
  );
};

export default SavedContest;
