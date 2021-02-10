import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import React,{useState} from 'react';
import { Toolbar } from '@material-ui/core';

const AddMeme = (props) => {
    const [open, setOpen] = useState(false);
    const [meme, setMeme] = useState({name: '', caption: '', url: ''});
    
    const handleOpen = () => {
      setOpen(true);
    }
    const styles = theme => ({
      root: {
        flexGrow: 1
      },
      flex: {
        flex: 1
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20
      },
      toolbarMargin: theme.mixins.toolbar
    });
  
    const handleClose = () => {
      setOpen(false);
    }
    const handleChange = (event) => {
        setMeme({...meme, [event.target.name]: event.target.value});
      }

     
      const handleSave = (event) => {
        
        props.addMeme(meme)
        console.log(meme);
      handleClose();
      }
    return (
    
          <div >
      <Button style={{marginTop:15,marginBottom:20}} variant="outlined" color="primary" onClick={handleOpen}>
        Add Meme
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Meme Stream</DialogTitle>
        <DialogContent autoComplete="off">
        <TextField autoFocus margin="dense" value={meme.name}  required='required' validations={["required", "min:4"]}
    onChange={handleChange} name="name" label="Meme Owner" fullWidth />
    <TextField autoFocus margin="dense" value={meme.caption} required='required'
    onChange={handleChange} name="caption" label="Caption" fullWidth />
  <TextField autoFocus margin="dense" value={meme.url} required='required'
    onChange={handleChange} name="url" label="Meme URL" fullWidth />
    </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
           Submit
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
     
    );
  }

  export default AddMeme;