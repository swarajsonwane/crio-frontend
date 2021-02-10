import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import React,{useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const EditMeme = (props) => {
    const [open, setOpen] = useState(false);
    const [meme, setMeme] = useState({caption: '', url: ''});
    
    const handleOpen = () => {
      setOpen(true);
    }
  
    const handleClose = () => {
      setOpen(false);
    }
    const handleChange = (event) => {
        setMeme({...meme, [event.target.name]: event.target.value});
      }

     
      const handleSave = (event) => {
        
        props.editMeme(meme,props.id)
        console.log(meme);
      handleClose();
      }
    return (
    
          <div>
       <IconButton onClick={handleOpen}>
          <EditIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Meme Stream</DialogTitle>
        <DialogContent autoComplete="off">
    <TextField autoFocus margin="dense" value={meme.caption} required='required'
    onChange={handleChange} name="caption" label="New Caption" fullWidth />
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

  export default EditMeme;