import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Colors } from "../../../../styles/Colors"
import { Typography, Grid, CircularProgress } from "@material-ui/core"
import BookmarkBorderRoundedIcon from "@material-ui/icons/BookmarkBorderRounded"
import BookmarkIcon from "@material-ui/icons/Bookmark"
import "../Contest/Contest.scss"
import { useImmer } from "use-immer"
import useContest from "../../../../data-access/useContests/useContest"
import moment from "moment"

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(12, 3),
    backgroundColor: Colors.blackShade1,
    minHeight: "100vh",
  },
}))

const SavedContest = () => {
  const classes = useStyles()
  const { isLoading, isUpdating, savedContests, unSaveContest, getSavedContest } = useContest()
  const [hiddenIndexes, setHiddenIndexes] = useState([])
  useEffect(() => getSavedContest(), [])

  const handleContestUnSaving = async (savedContests, index) => {
    await unSaveContest(savedContests)
    setHiddenIndexes((prevState) => [...prevState, index])
  }

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
        <CircularProgress color="secondary" style={{ width: "100px", height: "auto" }} />
      </div>
    )
  }

  return (
    <div className={classes.content}>
      <Grid container className="container">
        {savedContests.map((contests, index) => {
          const { name, site, start_time, end_time } = contests
          return (
            <Grid item xl={4} key={index} className={`grid-card ${hiddenIndexes.includes(index) ? "hide-card" : ""}`}>
              <div className="card">
                <div
                  className="bookmark"
                  onClick={() => {
                    handleContestUnSaving(contests, index)
                  }}
                >
                  <BookmarkIcon fontSize="large" />
                </div>
                <div className="contest-date">
                  <Typography variant="h3">{moment(start_time).format("DD")}</Typography>
                  <Typography variant="subtitle1">{moment(start_time).format("MMMM")}</Typography>
                </div>
                <div className="contest">
                  <div className="contest-site">{site}</div>
                  <div className="contest-name">{name}</div>
                  <div className="contest-time">
                    {moment(start_time).format("hh:mm A")} - {moment(end_time).format("hh:mm A")}
                  </div>
                </div>
              </div>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default SavedContest
