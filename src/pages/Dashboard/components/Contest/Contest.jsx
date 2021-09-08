import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Colors } from "../../../../styles/Colors"
import { Typography, Grid, CircularProgress } from "@material-ui/core"
import BookmarkBorderRoundedIcon from "@material-ui/icons/BookmarkBorderRounded"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import "./Contest.scss"
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

const Contest = () => {
  const classes = useStyles()
  const { isUpdating, contests, getContest, saveContest, savedContests, getSavedContest } = useContest()
  const [isLoading, setIsLoading] = useState(false)
  const [hiddenIndexes, setHiddenIndexes] = useState([])

  const getInitialData = async () => {
    setIsLoading(true)
    await getSavedContest()
    await getContest()
    setIsLoading(false)
    // saveContest();
  }
  useEffect(() => getInitialData(), [])

  const handleContestSaving = async (contest, index) => {
    await saveContest(contest)
    setHiddenIndexes((prevState) => [...prevState, index])
  }
  console.log(hiddenIndexes)

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
        {contests.map((contest, index) => {
          const { name, site, start_time, end_time } = contest

          if (new Date().getTime() < new Date(start_time).getTime()) {
            const result = savedContests.filter((saved_contest) => saved_contest.start_time === start_time && saved_contest.site === site)
            if (result.length === 0) {
              return (
                <Grid item xl={4} className={`grid-card ${hiddenIndexes.includes(index) ? "hide-card" : ""}`} key={index}>
                  <div className="card">
                    <div
                      className="bookmark"
                      onClick={() => {
                        handleContestSaving(contest, index)
                      }}
                    >
                      <BookmarkBorderRoundedIcon fontSize="large" />
                    </div>
                    <div className="contest-date">
                      <Typography variant="h3">{moment(start_time).format("DD")}</Typography>
                      <Typography variant="subtitle1">{moment(start_time).format("MMMM - YY")}</Typography>
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
            }
          }
        })}
      </Grid>
    </div>
  )
}

export default Contest
