import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {  Button } from "@material-ui/core";
import { Outlet, useNavigate } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ProfilePopUp from "../ModelPopUp/ProfilePopUp";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import img from '../Images/MicrosoftTeams-image (1).png'
import { getAccessToken } from "../UsersAxios/CrudOnUsers";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    marginBottom:'100px'

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuList: {
    padding: theme.spacing(2),
    marginTop:40 ,

  },

}));
export default function Home() {
  const classes = useStyles();
  const navigate=useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function onLogOut()
  {
   navigate("/");
   sessionStorage.removeItem('accessToken');
   const token=sessionStorage.getItem('accessToken');
  }

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const { details} = useSelector((state: any) => state.userDetails)

  const handleClose = () => {
    const token=sessionStorage.getItem("token");
    if(token)
    {
      window.alert(sessionStorage.getItem('token'));
    }
    
  setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
       <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap style={{marginRight:'1400px'}}>
            Welcome , {details.userName}
          </Typography>
          <Typography variant="h6" noWrap>
          <Avatar alt="sravis Howard" src={img} onClick={handleClick} style={{height:'60px',width:'60px',marginRight:'0px'}}/>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menuList}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
          <Avatar alt="sravis Howard" src={img} onClick={handleClick} style={{height:'80px',width:'80px',marginLeft:'70px'}}/>
        <MenuItem onClick={handleClose}>{details.emailId}</MenuItem>
        <MenuItem onClick={handleClose}>{details.mobileNumber}</MenuItem>
        <MenuItem onClick={onLogOut} style={{marginLeft:'50px'}}>Sign Out</MenuItem>
      </Menu>   
      </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List onClick={()=>{navigate('/HomePage/AddTodo')}}  style={{marginBottom:'20px',cursor:'pointer'}}>
       Add Todo<AddIcon/>
        </List>
        <Divider />
        <List onClick={()=>{navigate('/HomePage/AllTodos')}}  style={{marginBottom:'20px',cursor:'pointer'}}>
         All Todos <ListIcon/>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
      <div style={{marginTop:'100px',marginRight:'600px'}}>
      <Outlet ></Outlet>

       </div>
       <ProfilePopUp></ProfilePopUp>

    </div>
  );
}
