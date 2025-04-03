import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Tabs, 
  Tab, 
  Box, 
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Home as HomeIcon,
  AccountBalance as PolicyIcon,
  Receipt as ClaimsIcon,
  Payment as PaymentIcon,
  ContactSupport as SupportIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const quickLinks = [
    { label: 'Home', icon: <HomeIcon />, path: '/' },
    { label: 'Policies', icon: <PolicyIcon />, path: '/policies' },
    { label: 'Claims', icon: <ClaimsIcon />, path: '/claims' },
    { label: 'Payments', icon: <PaymentIcon />, path: '/payments' },
    { label: 'Support', icon: <SupportIcon />, path: '/support' },
  ];

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Insurance Co
        </Typography>
        
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="navigation tabs"
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          {quickLinks.map((link, index) => (
            <Tab 
              key={link.label}
              icon={link.icon}
              label={link.label}
              onClick={() => navigate(link.path)}
            />
          ))}
        </Tabs>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          
          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
          >
            <PersonIcon />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 