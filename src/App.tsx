import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { useState } from 'react';
import theme from './theme';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Policies from './pages/Policies';
import Claims from './pages/Claims';
import Payments from './pages/Payments';
import NewPayment from './pages/NewPayment';
import Support from './pages/Support';
import Sidebar from './components/Sidebar';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppBar from './components/AppBar';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

function AppContent() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3, md: 4 },
                    width: { sm: `calc(100% - 240px)` },
                    ml: { sm: '240px' },
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    minHeight: '100vh',
                  }}
                >
                  <AppBar handleDrawerToggle={handleDrawerToggle} />
                  <Box sx={{ mt: 8 }}>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/policies" element={<Policies />} />
                      <Route path="/claims" element={<Claims />} />
                      <Route path="/payments" element={<Payments />} />
                      <Route path="/payments/new" element={<NewPayment />} />
                      <Route path="/support" element={<Support />} />
                    </Routes>
                  </Box>
                </Box>
              </Box>
            </PrivateRoute>
          }
        />
      </Routes>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
