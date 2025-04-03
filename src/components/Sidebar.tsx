import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Button, ListItemButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Navigation items
const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { path: '/policies', label: 'Policies', icon: '📋' },
  { path: '/claims', label: 'Claims', icon: '🎯' },
  { path: '/payments', label: 'Payments', icon: '💳' },
  { path: '/support', label: 'Support', icon: '💬' }
];

const DRAWER_WIDTH = 240;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: 'primary.main',
          color: 'white'
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
          InsureCo
        </Typography>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                bgcolor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <span role="img" aria-label={item.label}>
                  {item.icon}
                </span>
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, mt: 'auto' }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={logout}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
} 