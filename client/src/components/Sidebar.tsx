import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonIcon from '@mui/icons-material/Person';
import SellIcon from '@mui/icons-material/Sell';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
const drawerWidth = 280;


export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List >
        {['New order', 'New customer'].map((text: string, index: number) => (
          <Link to={index % 2 === 0 ? '/main/orders/new' : '/main/customers/new'}>
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>  
                  {index % 2 === 0 ? <AddShoppingCartIcon color="primary" /> : <PersonAddAlt1Icon color="primary" />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <Link to='/main/customers'>
          <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <PersonIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary='Customers' />
            </ListItemButton>            
          </ListItem>
        </Link> 

        <Link to='/main/orders'>
          <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <SellIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary='Orders' />
            </ListItemButton>            
          </ListItem>
        </Link> 

        <Link to='/main/statistics'>
          <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <TrendingUpIcon color="primary" />
                </ListItemIcon>
                <ListItemText sx={{fontSize: '50px'}} primary='Statistics'>Statistics</ListItemText>
            </ListItemButton>            
          </ListItem>
        </Link>
      </List>
    </div> 
  );


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: "100%" },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{fontSize: '26px'}} variant="h5" noWrap component="div">
            CarwashUI
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, zIndex: '1' }}
      >
        
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
      </Box> */}
    </Box>
  );
}