import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import EmailIcon from '@material-ui/icons/Email';
import ExploreIcon from '@material-ui/icons/Explore';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '70px',
    width:'70%',
    margin:'10px auto',   
    padding:theme.spacing(5)
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor:'#3a75bd',
  },
  textStyle:{
    fontFamily:'Nunito',
    color:'#3a75bd',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ConatactUs() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.textStyle}>
            Get in Touch
          </Typography>
          <form className={classes.form} noValidate>
          <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="mobileNumber"
                label="Mobile Number"
                name="mobileNumber"
                autoComplete="mobileno"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={4}
          defaultValue="Message or Complaint"
          variant="outlined"
        />
        </Grid>
        <Grid item>
        <Button
            type="submit"
            width="80%"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Message
          </Button>
          </Grid>
        </Grid>
        </form>
        </div>   
      </Grid>
    
      <Grid item xs={12} sm={4} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PhoneInTalkIcon/>
          </Avatar>
          <Typography component="h1" variant="h6">
          071 461 1122
          </Typography>

          <Avatar className={classes.avatar}>
            <EmailIcon/>
          </Avatar>
          <Typography component="h1" variant="h6">
          ceylonfolk@gmail.com
          </Typography>

          <Avatar className={classes.avatar}>
            <ExploreIcon/>
          </Avatar>
          <Typography component="h1" variant="h6">
          328 Kaduwela Rd, Colombo 10115
          </Typography>
    
        </div>   
      </Grid>
    
    </Grid>
  );
}