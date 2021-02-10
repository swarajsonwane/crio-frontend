import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <div className="App">
    <AppBar position="fixed" color="default">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Xmeme
        </Typography>
      </Toolbar>

    </AppBar> 
    <Toolbar/>
  </div>
  );
}

export default App;
