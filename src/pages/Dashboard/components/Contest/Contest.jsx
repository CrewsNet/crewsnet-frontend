import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "../../../../styles/Colors";
import { Typography, Grid, CircularProgress } from "@material-ui/core";
import Axios from "axios";

import BookmarkBorderRoundedIcon from "@material-ui/icons/BookmarkBorderRounded";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./Contest.scss";
import moment from "moment";
import { useImmer } from "use-immer";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(12, 3),
    backgroundColor: Colors.blackShade1,
    minHeight: "100vh",
  },
}));

const Contest = () => {
  const classes = useStyles();
  const [contest, setContest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useImmer({
    contestSaved: false,
    key: [],
  });

  const handleContestSaving = async (contest, key) => {
    try {
      // const response = await Axios.post("", { contest });
      console.log(key, contest);
      setState((draft) => {
        draft.contestSaved = true;
        draft.key.push(key);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchContest() {
      try {
        const response = await Axios.get("https://kontests.net/api/v1/all", {
          cancelToken: ourRequest.token,
        });
        setContest(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchContest();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  if (isLoading) {
    return (
      <div
        className={classes.content}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          color="secondary"
          style={{ width: "100px", height: "auto" }}
        />
      </div>
    );
  }

  return (
    <div className={classes.content}>
      <Grid container className="container">
        {contest.map((contest, key) => {
          const { name, site, start_time } = contest;
          return (
            <>
              <Grid item xl={4} style={{ margin: "auto" }}>
                <div className="card" key={key}>
                  <div
                    className="bookmark"
                    onClick={() => {
                      handleContestSaving(contest, key);
                    }}
                  >
                    {state.contestSaved && state.key.includes(key) ? (
                      <CheckCircleIcon fontSize="large" />
                    ) : (
                      <BookmarkBorderRoundedIcon fontSize="large" />
                    )}
                  </div>
                  <div className="contest-date">
                    <Typography variant="h3">08</Typography>
                    <Typography variant="subtitle1">June</Typography>
                  </div>
                  <div className="contest">
                    <div className="contest-site">{site}</div>
                    <div className="contest-name">{name}</div>
                    <div className="contest-time">7:30pm-10:30pm</div>
                  </div>
                </div>
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
};

export default Contest;
