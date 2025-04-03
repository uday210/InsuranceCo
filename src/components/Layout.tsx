import { Box, Container, Drawer, useTheme, useMediaQuery, Typography } from '@mui/material';
import { useState } from 'react';
import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[100],
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              © 2024 Insurance Co. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Privacy Policy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Terms of Service
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contact Us
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
} 