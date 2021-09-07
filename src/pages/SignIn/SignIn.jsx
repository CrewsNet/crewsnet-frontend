import React, { useState } from "react"
import clsx from "clsx"
import { Box, Grid, TextField, Button, Typography, Checkbox, FormControlLabel, IconButton, CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Colors } from "../../styles/Colors"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.min.css"
import "./SignIn.scss"
// swiper core styles
import "swiper/swiper.min.css"
// modules styles
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper"
import LoginSVG1 from "../../assets/images/login1.svg"
import LoginSVG2 from "../../assets/images/login2.svg"
import { Google as GoogleSVG, Github as GithubSVG } from "../../assets/Icons/Icons"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import useGoogleAuth from "../../data-access/useGoogleAuth/useGoogleAuth"
import useLogin from "../../data-access/useLogin/useLogin"
import GoogleLogin from "react-google-login"
import { PATH, GITHUB_CLIENT_ID, GITHUB_REDIRECT_URL } from "../../constants/constants"

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation])

const useStyles = makeStyles({
  signInContainer: {
    width: "100vw",
    height: "100vh",
    background: Colors.blackShade1,
    overflow: "hidden",
    color: Colors.white,
  },
  signIn: {
    background: Colors.blackShade2,
    padding: "1.8rem 0",
  },
  signInButtons: {
    borderRadius: "20px",
    width: "95%",
    textTransform: "none",
    backgroundColor: Colors.blackShade3,
    border: "1px solid transparent",
    color: Colors.white,
    "&:hover": {
      backgroundColor: Colors.blackShade2,
      border: `1px solid ${Colors.blackShade3}`,
    },
  },
  legend: {
    position: "relative",
    zIndex: "2",
    backgroundColor: Colors.blackShade2,
    "&::before": {
      content: '" "',
      zIndex: "1",
      display: "block",
      position: "absolute",
      backgroundColor: "white",
      width: "105%",
      height: "0.8px",
      marginTop: "0.82rem",
      left: "-110%",
    },
    "&::after": {
      content: '" "',
      zIndex: "1",
      display: "block",
      position: "absolute",
      backgroundColor: "white",
      width: "110%",
      height: "0.8px",
      marginTop: "-0.5rem",
      left: "110%",
    },
  },
  inputFields: {
    padding: "0",
    width: "97%",
    marginBottom: "1rem",
  },
  loginButton: {
    padding: "0.3rem",
    fontWeight: "600",
    fontSize: "1.2rem",
  },
})

const SignIn = ({ history }) => {
  const matches960 = useMediaQuery("(max-width:960px)")
  const matches375 = useMediaQuery("(max-width:375px)")
  const matches1280 = useMediaQuery("(max-width:1280px)")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const { isLoading, message, setMessage, onLogin } = useLogin()
  const { responseErrorGoogle, responseSuccessGoogle } = useGoogleAuth()

  const handleLogin = async () => {
    await onLogin({ email, password })
  }
  // const handleGithubLogin = async () => {
  //   const response = await axios.get(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}?path=${PATH}&scope=user:email`)
  //   console.log(response)
  // }

  const classes = useStyles()
  return (
    <Box className={clsx(classes.signInContainer, "login-page")} display="flex" alignItems="center" justifyContent="center">
      <Grid
        container
        md={9}
        style={{
          overflow: "hidden",
          borderRadius: "15px",
          border: `rgb(38, 38, 38,0.2) 1px solid`,
        }}
      >
        <Grid item p={0} container xs={12} lg={6} style={{ height: matches1280 ? "100vh" : "" }} className={classes.signIn} display="flex" justifyContent="center" alignContent="center">
          <Grid xs={11} sm={6} md={8} item style={{ position: "relative" }}>
            <Typography
              variant="h3"
              color="initial"
              style={{
                fontWeight: "700",
                marginBottom: "0.8rem",
                letterSpacing: "0.7px",
              }}
            >
              CrewsNet
            </Typography>
            <Typography
              variant="h4"
              color="initial"
              style={{
                marginBottom: "7px",
                fontWeight: "600",
                letterSpacing: "0.7px",
              }}
            >
              Login
            </Typography>
            <Typography variant="caption" color="initial">
              Get connected with the world of Projects!
            </Typography>
            {/* <TextField id="outlined-basic" label="Email" variant="outlined" /> */}
            <Grid xs={12} container justifyContent="space-between" style={{ marginTop: "1rem" }}>
              <Grid item xs={6}>
                <Button variant="contained" startIcon={<GoogleSVG size="1.7rem" />} className={clsx(classes.signInButtons, "google-button")}>
                  {!matches375 ? "with Google" : "Sign In"}
                  <GoogleLogin disabled={false} className="google-login" clientId="915209891946-f0hlo4lerlgj7oumkv86r7v2693ntq60.apps.googleusercontent.com" buttonText={!matches375 ? "with Google" : "Sign In"} onSuccess={responseSuccessGoogle} onFailure={responseErrorGoogle} cookiePolicy={`single_host_origin`} />
                </Button>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "end" }}>
                <a href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}?path=${PATH}&scope=user:email`}>
                  <Button
                    variant="contained"
                    // onClick={() => {
                    //   handleGithubLogin()
                    // }}
                    style={{ textAlign: "start" }}
                    startIcon={<GithubSVG size="1.7rem" color="#161614" />}
                    className={clsx(classes.signInButtons, "github-button")}
                  >
                    {!matches375 ? "with Github" : "Sign in"}
                  </Button>
                </a>
              </Grid>
            </Grid>
            <Grid
              xs={12}
              style={{
                textAlign: "center",
                marginTop: "1rem",
                marginBottom: "1.4rem",
              }}
            >
              <Typography variant="caption" color="initial" textAlign="center" className={classes.legend}>
                or Login with Email
              </Typography>
            </Grid>
            <Grid className="formLogin">
              <TextField
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                className={classes.inputFields}
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
              <FormControl className={clsx(classes.margin, classes.textField, classes.inputFields)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} onMouseDown={(e) => e.preventDefault()} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <Typography variant="small" color="initial">
                <FormControlLabel control={<Checkbox name="rememberMe" />} label={"Remember Me"} />
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "0.8rem" }}>
              <Button
                variant="contained"
                style={{ textAlign: "center" }}
                onClick={() => {
                  handleLogin()
                }}
                className={clsx(classes.signInButtons, classes.loginButton)}
              >
                {isLoading ? <CircularProgress color="secondary" style={{ width: "35px", height: "auto" }} /> : "Login"}
              </Button>
            </Grid>
            <Grid xs={12} style={{ marginTop: "0.7rem" }}>
              <Typography variant="caption" color="initial" style={{ letterSpacing: "0.6px" }}>
                Not registered yet ? &nbsp;&nbsp;
                <Typography
                  variant="caption"
                  style={{ fontWeight: "700", cursor: "pointer" }}
                  color="initial"
                  onClick={() => {
                    history.push("/signup")
                  }}
                >
                  Create an Account
                </Typography>
              </Typography>
            </Grid>
            {/* <Grid xs={12} style={{ position: "absolute", bottom: "-3rem" }}>
              <Typography variant="caption" color="initial" style={{ fontSize: "7px" }}>
                ©2021 CrewsNet All rights reserved.
              </Typography>
            </Grid> */}
          </Grid>
        </Grid>
        {!matches1280 && (
          <Grid item md={6} style={{ overflow: "hidden" }}>
            <Swiper
              className="login-swiper"
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              className="mySwiper"
            >
              <SwiperSlide className="swiperSlide1">
                <img src={LoginSVG1} alt="" width="100%" />
              </SwiperSlide>
              <SwiperSlide className="swiperSlide2">
                <img src={LoginSVG2} alt="" width="100%" />
              </SwiperSlide>
            </Swiper>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default SignIn
