import React, { Component } from 'react';
import {SERVER_URL} from './constants.js'
import { ToastContainer, toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import  AddMeme from './AddMeme';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import  DeleteIcon from '@material-ui/icons/Delete';
import EditMeme from './EditMeme.js';



class MemeList extends Component {
  constructor(props) {
    super(props);
    this.state = { memes: [] };
    
    
  } 
 
  componentDidMount() {
    this.fetchMemes();
  }

   useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      position:'fixed'
    },
    paper: {
      padding: theme.spacing(2),
      marginTop:'px',
      margin: 20,
      maxWidth: 200
     
      
    },
    image: {
      width: 128,
      height: 128,
    },
    card: {
      maxWidth: 300,
      margin: 'auto',
      marginTop:'10px',
      justifyContent: 'space-between',
      padding: 1,

    },
    img: {
     
      width: 128,
      height: 128,
      
    },
    toolbarMargin: theme.mixins.toolbar
  }));
 
  fetchMemes = () => {
    console.log("FETCH")
    fetch(SERVER_URL + 'memes',
     { 
     headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }}
  )
  .then((response) => response.json()) 
    .then((responseData) => { 
      this.setState({ 
        memes: responseData,
      }); 
    console.log(this.memes)})
    .catch(err => console.error(err)); 
    
  }
  //Add new meme
  addMeme(meme) {
  
    fetch(SERVER_URL + 'memes', 
      { method: 'POST', 
        headers: {
          'Accept': "application/json, text/plain, */*",
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },

        body:JSON.stringify(meme)
      })
      .then(console.log(JSON.stringify(meme)))
    .then(res => this.fetchMemes())
    .catch(err => console.error(err))
  } 
  editMeme(meme,id) {
    fetch(SERVER_URL + 'memes/' +id, 
    { method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meme)
    })
    .then(res => {
      toast.success("Changes saved", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      this.fetchMemes();
    })
    .catch(err => 
      toast.error("Error when saving", {
        position: toast.POSITION.BOTTOM_LEFT
      }) 
    )
  }

  //Deletes Meme with a given id
  onDelClick = (id) => {
    if (window.confirm('Are you sure to delete?')) {
      fetch(SERVER_URL + 'memes/' +id, {method: 'DELETE'})
      .then(res => {
        toast.success("Meme deleted", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        this.fetchMemes();
      })
      .catch(err => {
        toast.error("Error when deleting", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err)
      }) 
     
  }
}


  render(){
   

  return (
   
    <div className="App">
      <AddMeme addMeme={this.addMeme} fetchMemes={this.fetchMemes} />
      <div className="container"  >
        <Grid container justify="center" spacing='2' >
          <div className="App" >
          <Paper style={this.useStyles.paper} zDepth={2} >
        {this.state.memes.map((meme) => (
       <Card className={this.useStyles.card}>
      <CardHeader
        title={`${meme.name}`}
        avatar={
          <Avatar>
            <PersonIcon />
          </Avatar>
        }
      />
      <CardContent>
        <Typography variant="caption"><b>{meme.caption}</b></Typography>
        <p></p>
        <Grid item>
        <ButtonBase className={this.useStyles.image}>
        <img classname={this.useStyles.img} alt="complex" src={`${meme.url}`} width="300" height="300"/>
        </ButtonBase>
        </Grid>
      </CardContent>
      <CardActions disableActionSpacing>
     <IconButton onClick={()=>{this.onDelClick(meme.id)}}>
     <DeleteIcon />
      </IconButton>
      <EditMeme id = {meme.id} editMeme={this.editMeme} fetchMemes={this.fetchMemes} />
     
    </CardActions>
    </Card>
     ))}
     </Paper>
     </div>
    </Grid>
    </div>
    </div>
    
    

  );
}
}

export default MemeList;