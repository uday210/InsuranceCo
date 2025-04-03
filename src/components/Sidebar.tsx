import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  useTheme,
  Collapse,
  IconButton,
  Divider,
  Tooltip,
  Avatar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Description as PolicyIcon,
  Receipt as ClaimsIcon,
  Payment as PaymentIcon,
  Support as SupportIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import {
  HomeIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const DRAWER_WIDTH = 240;

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: HomeIcon },
  { path: '/policies', label: 'Policies', icon: DocumentDuplicateIcon },
  { path: '/claims', label: 'Claims', icon: ClipboardDocumentListIcon },
  { path: '/payments', label: 'Payments', icon: CreditCardIcon },
  { divider: true },
  { path: '/settings', label: 'Settings', icon: Cog6ToothIcon },
  { path: '/support', label: 'Support', icon: QuestionMarkCircleIcon },
];

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export default function Sidebar({ mobileOpen, handleDrawerToggle }: SidebarProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const { user, logout } = useAuth();

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #2563eb 0%, #7c3aed 100%)',
        color: 'white',
      }}
    >
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #ffffff 30%, #e2e8f0 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          InsureCo
        </Typography>
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{ color: 'white' }}
        >
          {open ? <ChevronLeftIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => 
          item.divider ? (
            <Divider key={index} sx={{ my: 2, opacity: 0.1 }} />
          ) : (
            <ListItem
              key={item.path}
              disablePadding
            >
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  color: 'white',
                  opacity: 0.8,
                  '&:hover': {
                    opacity: 1,
                    background: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&.Mui-selected': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    opacity: 1,
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.25)',
                    },
                  },
                }}
                selected={location.pathname === item.path}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                  <item.icon
                    style={{
                      width: 24,
                      height: 24,
                      color: location.pathname === item.path ? 'white' : 'rgba(255, 255, 255, 0.7)',
                      opacity: location.pathname === item.path ? 1 : 0.7,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: 500,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>

      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 40,
                height: 40,
              }}
            >
              {user.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>
        )}
        
        <Tooltip title="Logout">
          <IconButton
            onClick={logout}
            sx={{
              width: '100%',
              borderRadius: 2,
              color: theme.palette.error.main,
              border: `1px solid ${theme.palette.error.main}20`,
              '&:hover': {
                backgroundColor: theme.palette.error.main + '10',
              },
            }}
          >
            <ArrowLeftOnRectangleIcon style={{ width: 20, height: 20 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
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
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
} 