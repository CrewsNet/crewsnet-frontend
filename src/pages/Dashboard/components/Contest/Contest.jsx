import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Colors } from "../../../../styles/Colors"
import { Typography, Grid, CircularProgress } from "@material-ui/core"
import BookmarkBorderRoundedIcon from "@material-ui/icons/BookmarkBorderRounded"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import "./Contest.scss"
import { useImmer } from "use-immer"
import useContest from "../../../../data-access/useContests/useContest"

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
  const { isLoading, contests, getContest } = useContest()

  const [state, setState] = useImmer({
    contestSaved: false,
    key: [],
  })
  useEffect(() => getContest(), [])

  const handleContestSaving = async (contests, key) => {
    try {
      // const response = await Axios.post("", { contests });
      console.log(key, contests)
      setState((draft) => {
        draft.contestSaved = true
        draft.key.push(key)
      })
    } catch (error) {
      console.log(error)
    }
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
        {contests.map((contests, key) => {
          const { name, site, start_time } = contests
          return (
            <>
              <Grid item xl={4} style={{ margin: "auto" }}>
                <div className="card" key={key}>
                  <div
                    className="bookmark"
                    onClick={() => {
                      handleContestSaving(contests, key)
                    }}
                  >
                    {state.contestSaved && state.key.includes(key) ? <CheckCircleIcon fontSize="large" /> : <BookmarkBorderRoundedIcon fontSize="large" />}
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
          )
        })}
      </Grid>
    </div>
  )
}

export default Contest
