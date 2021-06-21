import React,{ useEffect, useState} from 'react';
import {Typography,IconButton,Collapse,Box,Button,Container,Grid,Card,CardActionArea,CardActions,CardContent,CardMedia} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import Image from '../images/index.jpg';
import Collection1 from '../images/collection1.jpg';
import Collection2 from '../images/collection2.jpg';
import Collection3 from '../images/collection3.jpg';

const useStyles=makeStyles((theme)=>({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'730px',
        fontFamily:'Nunito' ,
        backgroundImage:`linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position:'relative',
      
    },
    colorText:{
        color:'#052afa'
    },
    title:{
     color:'#3d3a3a',
     fontSize:'3rem'
    },
    container:{
        textAlign:'center'
    },
    goDown:{
        color:'#fff',
        fontSize:'4rem'
    },
    collectionContainer:{
        paddingTop:'24px'
    },
    collectionTitle:{
        fontWeight:'800',
        paddingBottom:'24px',
        textAlign:'center',
        fontFamily:'Nunito'
    },
    card:{
        maxWidth:'95%'
        
    },
    media:{
        height:'240px',
       
    }

}));
const Content = () => {

    const classes=useStyles();
    const [checked,setChecked]=useState(false);
    useEffect(()=>{
         setChecked(true);
    },[])
    return (
        <div>
            <Box className={classes.root} >
            <Collapse in={checked}  {...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
            <div className={classes.container}>
                <h1 className={classes.title}>
                    Welcome to <br/>Ceylon
                    <span className={classes.colorText}>Folk</span>   
                </h1>
                <IconButton>
                    <ExpandMoreIcon className={classes.goDown}/>
                </IconButton>
            </div>
            </Collapse> 
            </Box>
            <Container className={classes.collectionContainer} maxWidth="lg">
                <Typography variant="h4" className={classes.collectionTitle}>Top Collections</Typography>
         
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6} md={4}>
                         <Card className={classes.card}>
                            <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    style={{ backgroundImage:`url(${Collection1})`}}
                                    title="Snowy"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                            Snowy
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                               
                                </CardActions>
                         </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                        <CardMedia
                                        className={classes.media}
                                        style={{ backgroundImage:`url(${Collection2})`}}
                                        title="Marvel"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                                Marvel
                                            </Typography>
                                        </CardContent>
                                </CardActionArea>
                                <CardActions>
                                        
                                </CardActions>
                            </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                        <CardMedia
                                        className={classes.media}
                                        style={{ backgroundImage:`url(${Collection3})`}}
                                        title="BTS"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                                 BTS
                                            </Typography>
                                        </CardContent>
                                </CardActionArea>
                                <CardActions>
                                                    
                                </CardActions>
                            </Card>
                </Grid>
            </Grid>
            </Container>
        </div>
    );
};

export default Content;