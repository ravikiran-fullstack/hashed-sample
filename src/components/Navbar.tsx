import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
          </Typography>
          <Button color="inherit" component={RouterLink} to="/catalog">
            Catalog
          </Button>
          <Button color="inherit" component={RouterLink} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/docs">
            Docs
          </Button>
          <Button color="inherit" component={RouterLink} to="/resources">
            Resources
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
