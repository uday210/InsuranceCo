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
  Avatar,
  useMediaQuery
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

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  drawerWidth?: number;
}

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: HomeIcon },
  { path: '/policies', label: 'Policies', icon: DocumentDuplicateIcon },
  { path: '/claims', label: 'Claims', icon: ClipboardDocumentListIcon },
  { path: '/payments', label: 'Payments', icon: CreditCardIcon },
  { divider: true },
  { path: '/settings', label: 'Settings', icon: Cog6ToothIcon },
  { path: '/support', label: 'Support', icon: QuestionMarkCircleIcon },
];

export default function Sidebar({ open, onClose, drawerWidth = 280 }: SidebarProps) {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          background: theme.palette.mode === 'light' 
            ? 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)'
            : 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)',
          boxShadow: theme.palette.mode === 'light'
            ? '4px 0 24px rgba(0, 0, 0, 0.05)'
            : '4px 0 24px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Box sx={{ p: 3, mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, #3f51b5 0%, #2196F3 100%)',
              boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)',
            }}
          >
            IC
          </Avatar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #3f51b5, #2196F3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            InsuranceCo
          </Typography>
        </Box>

        <List sx={{ px: 1 }}>
          {menuItems.map((item, index) => 
            item.divider ? (
              <Divider key={index} sx={{ my: 2, opacity: 0.1 }} />
            ) : (
              <ListItem
                key={item.path}
                onClick={() => handleNavigation(item.path!)}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: isActive(item.path!) 
                    ? theme.palette.mode === 'light'
                      ? 'rgba(33, 150, 243, 0.08)'
                      : 'rgba(33, 150, 243, 0.15)'
                    : 'transparent',
                  color: isActive(item.path!)
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'light'
                      ? 'rgba(33, 150, 243, 0.08)'
                      : 'rgba(33, 150, 243, 0.15)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon>
                  <item.icon
                    style={{
                      width: 24,
                      height: 24,
                      color: isActive(item.path!)
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                      opacity: isActive(item.path!) ? 1 : 0.7,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: isActive(item.path!) ? 600 : 500,
                  }}
                />
                {isActive(item.path!) && (
                  <Box
                    sx={{
                      width: 4,
                      height: 32,
                      borderRadius: '0 4px 4px 0',
                      backgroundColor: theme.palette.primary.main,
                      position: 'absolute',
                      left: 0,
                    }}
                  />
                )}
              </ListItem>
            )
          )}
        </List>
      </Box>

      <Box
        sx={{
          mt: 'auto',
          p: 2,
          borderTop: '1px solid',
          borderColor: theme.palette.mode === 'light'
            ? 'rgba(0, 0, 0, 0.06)'
            : 'rgba(255, 255, 255, 0.06)',
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
    </Drawer>
  );
} 