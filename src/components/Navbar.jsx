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

const Navbar = () => {

  const { username, isAdmin } = useAuth()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useSendLogoutMutation()

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
            href="/welcome"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
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
                <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" />
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
  

  return content;
}
export default Navbar;