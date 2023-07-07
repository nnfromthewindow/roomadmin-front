import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import { Link } from 'react-router-dom';
import useAuth from '../features/hooks/useAuth';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import AddTask from '@mui/icons-material/AddTask';
import MenuBook from '@mui/icons-material/MenuBook';
import Group from '@mui/icons-material/Group';
import SupervisedUserCircle from '@mui/icons-material/SupervisedUserCircle';
import CurrencyExchange from '@mui/icons-material/CurrencyExchange';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
//import ManageAccounts from '@mui/icons-material/ManageAccounts';
import pink from '@mui/material/colors/pink';
import deepOrange from '@mui/material/colors/deepOrange';
import teal from '@mui/material/colors/teal';
import red from '@mui/material/colors/red';
import lightGreen from '@mui/material/colors/lightGreen';
import brown from '@mui/material/colors/brown';
//import lightBlue from '@mui/material/colors/lightBlue';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { useEffect } from 'react';


const Navbar = () => {

  const { username, isAdmin, isManager, avatar } = useAuth()

  const navigate = useNavigate()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useSendLogoutMutation()

useEffect(() => {
  if (isSuccess) navigate('/')
}, [isSuccess, navigate])

  const privatePages = [
    { name: 'Todos', route: '/todos',icon: <AddTask sx={{ color: pink[700] }}/> },
    { name: 'Bookings', route: '/bookings',icon: <MenuBook sx={{ color: deepOrange[500] }}/> },
    { name: 'Customers', route: '/customers',icon: <Group sx={{ color: teal[700] }}/> },
    { name: 'Users', route: '/users',icon: <SupervisedUserCircle sx={{ color: red[700] }}/> },
    { name: 'Ledger', route: '/ledger',icon: <CurrencyExchange sx={{ color: lightGreen['A400'] }}/> },
    { name: 'Rooms', route: '/rooms',icon: <Settings sx={{ color: brown[500] }}/> }
  ];
  const pagesEmployee = [
    { name: 'Todos', route: `todos/${username}`,icon: <AddTask sx={{ color: pink[700] }}/> }
  ];
 
  /*
  const settings = [
  { name: 'Account', route: '/welcome' , icon:<ManageAccounts sx={{ color: lightBlue[800], marginRight:'1rem' }}/>}
];
  */
  

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  let pages
  let content;

if(isAdmin || isManager){
pages = privatePages
  }else{
pages = pagesEmployee
  }

  

  content = (
    <AppBar position="static" sx={{backgroundColor:'var(--background-public)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography component="a"
            onClick={()=>navigate('/welcome')}   fontFamily={'Pacifico'} fontSize={'3em'} sx={{
              display: { xs: 'none', md: 'flex' },  color: 'inherit',
              WebkitTextStroke: '2px #B0B0B0',
              WebkitTextStrokeWidth: '1px',
              borderRadius: '4px', 
              textDecoration: 'none',
              cursor:'pointer'
            }}>R</Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={()=>navigate('/welcome')}  
            fontFamily={'Pacifico'}     
              
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              color: 'inherit',
              WebkitTextStroke: '2px #B0B0B0',
              WebkitTextStrokeWidth: '1px',
              borderRadius: '4px', 
              textDecoration: 'none',
              cursor:'pointer'
            }}
          >OOMY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
            className='menu_popup'
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none'},
              }}
            >
              <div className="menu">
             
              {pages.map((page) => (
                <div className='menu_items' key={page.name}>
                  
                  <div className="menu_icons">
                      {page.icon}
                  </div>
                  <Button                   
                    component={Link}
                    to={page.route}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 1.2, 
                      color: 'black', display: 'block' ,fontFamily:'Dosis', 
                      fontSize:'1.2em', textShadow:'1px 1px 3px #616161' }}
                  >
                    {page.name}
                  </Button>  
                </div>      
              ))}      
              </div> 
            </Menu>
          </Box>

          <Typography component="a" 
            onClick={()=>navigate('/welcome')} fontFamily={'Pacifico'} fontSize={'3em'} sx={{ display: { xs: 'flex', md: 'none', WebkitTextStroke: '2px #B0B0B0', WebkitTextStrokeWidth: '1px',
            borderRadius: '4px', color: 'inherit',
            textDecoration: 'none', cursor:'pointer'},
           }}>R</Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={()=>navigate('/welcome')}
            fontFamily={'Pacifico'}
            fontSize={'1.3em'}  
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              letterSpacing: '.3rem',
              color: 'inherit',
              WebkitTextStroke: '2px #B0B0B0',
              WebkitTextStrokeWidth: '1px',
              borderRadius: '4px', 
              textDecoration: 'none',
              cursor:'pointer'
            }}
          >
            OOMY
          </Typography>
          <Box sx={{ paddingLeft:'2rem', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
              key={page.name}
              component={Link}
              to={page.route}
              onClick={handleCloseNavMenu}
              sx={{ fontFamily:'Dosis', fontWeight:'regular', fontSize:'1.3em', my: 2, color: 'white', display: 'block' }}
            >
              {page.name}
            </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={username} src={avatar} imgProps={{loading:'lazy'}}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >     
              {/*settings.map((setting) => (
              
               <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                {setting.icon}
                  <Typography textAlign="center" sx={{my: 1.2, 
                      color: 'black', display: 'block' ,fontFamily:'Dosis', 
                      fontSize:'1.2em', textShadow:'1px 1px 3px #616161'}}>{setting.name}</Typography>
                </MenuItem>
               
                  ))*/}    
              <MenuItem key='Logout' onClick={handleCloseUserMenu}>
                  <Logout sx={{ color: red[500], marginRight:'1rem'}}/>
                  <Typography textAlign="center" onClick={sendLogout} sx={{my: 1.2, 
                      color: 'black', display: 'block' ,fontFamily:'Dosis', 
                      fontSize:'1.2em', textShadow:'1px 1px 3px #616161'}}>Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
  
  if(isLoading){
    <div className="spinner" style={{position:'fixed', margin:'auto',
      width: '100vw',
      height: '100vh',
      top:'0rem',
      left:'0rem',
      paddingTop:'30vh',
      backgroundColor: '#ffffffc7',
      zIndex: '3000'}}>
                  <ColorRing
                      visible={true}
                      height="200"
                      width="200"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                      />
                </div>
  }else{
    return content;
  }
}
export default Navbar;