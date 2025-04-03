import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Policies from './pages/Policies';
import Claims from './pages/Claims';
import Payments from './pages/Payments';
import NewPayment from './pages/NewPayment';
import Support from './pages/Support';

// Layout components
import Sidebar from './components/Sidebar';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        {children}
      </Box>
    </Box>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/policies" element={<PrivateRoute><Policies /></PrivateRoute>} />
      <Route path="/claims" element={<PrivateRoute><Claims /></PrivateRoute>} />
      <Route path="/payments" element={<PrivateRoute><Payments /></PrivateRoute>} />
      <Route path="/payments/new" element={<PrivateRoute><NewPayment /></PrivateRoute>} />
      <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
