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
import { AddTask, MenuBook, Group, SupervisedUserCircle,CurrencyExchange, Settings } from '@mui/icons-material';
import { pink,deepOrange,teal,red,lightGreen,brown,lightBlue } from '@mui/material/colors';
import { Logout, ManageAccounts } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { useEffect } from 'react';


const Navbar = () => {

  const { username, isAdmin, avatar } = useAuth()

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

  const pagesAdmin = [
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
  
  const settings = [
  { name: 'Account', route: '/welcome' , icon:<ManageAccounts sx={{ color: lightBlue[800], marginRight:'1rem' }}/>}
];
  
  

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

if(isAdmin){
pages = pagesAdmin
  }else{
pages = pagesEmployee
  }

  

  content = (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AddHomeWorkIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={()=>navigate('/welcome')}           
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor:'pointer'
            }}
          >
            ROOMY
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
          <AddHomeWorkIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/welcome"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Dosis',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ROOMY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
              key={page.name}
              component={Link}
              to={page.route}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'black', display: 'block' }}
            >
              {page.name}
            </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={username} src={avatar} />
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
              {settings.map((setting) => (
              
               <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                {setting.icon}
                  <Typography textAlign="center" sx={{my: 1.2, 
                      color: 'black', display: 'block' ,fontFamily:'Dosis', 
                      fontSize:'1.2em', textShadow:'1px 1px 3px #616161'}}>{setting.name}</Typography>
                </MenuItem>
               
              ))}    
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