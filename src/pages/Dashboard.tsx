import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { policies, claims, payments } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const userPolicies = policies.filter(policy => 
    user?.policyNumbers.includes(policy.id)
  );

  const userClaims = claims.filter(claim =>
    userPolicies.some(policy => policy.id === claim.policyId)
  );

  const pendingClaims = userClaims.filter(claim => claim.status.toLowerCase() === 'pending');
  const nextPayment = userPolicies.reduce((min, policy) => {
    const monthlyPayment = policy.premium / 12;
    return monthlyPayment < min ? monthlyPayment : min;
  }, Infinity);

  const recentActivity = [
    ...payments.map(payment => ({
      date: new Date(payment.date),
      activity: `Premium payment for ${userPolicies.find(p => p.id === payment.policyId)?.type}`,
      status: payment.status
    })),
    ...userClaims.map(claim => ({
      date: new Date(claim.dateSubmitted),
      activity: `Claim submitted for ${userPolicies.find(p => p.id === claim.policyId)?.type}`,
      status: claim.status
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Welcome, {user?.name || 'John Doe'}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Here's an overview of your insurance portfolio
      </Typography>

      {/* Overview Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 3, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography color="text.secondary" gutterBottom>Active Policies</Typography>
          <Typography variant="h4" color="primary">{userPolicies.length}</Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography color="text.secondary" gutterBottom>Pending Claims</Typography>
          <Typography variant="h4" color="primary">{pendingClaims.length}</Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography color="text.secondary" gutterBottom>Next Payment</Typography>
          <Typography variant="h4" color="primary">${nextPayment.toLocaleString()}</Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography color="text.secondary" gutterBottom>Support</Typography>
          <Typography variant="h6" color="primary" sx={{ cursor: 'pointer' }} onClick={() => navigate('/support')}>
            Contact Us
          </Typography>
        </Paper>
      </Box>

      {/* Recent Activity */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Recent Activity</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Activity</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentActivity.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell>{activity.date.toLocaleDateString()}</TableCell>
                  <TableCell>{activity.activity}</TableCell>
                  <TableCell>
                    <Chip 
                      label={activity.status} 
                      color={getStatusColor(activity.status) as any}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Payment Schedule and Quick Actions */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Payment Schedule</Typography>
          {userPolicies.map(policy => (
            <Box key={policy.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography>{policy.type}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Due on {new Date().toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography>${(policy.premium / 12).toLocaleString()}</Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => navigate(`/payments/new?policyId=${policy.id}`)}
                >
                  Pay Now
                </Button>
              </Box>
            </Box>
          ))}
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Quick Actions</Typography>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<span>📝</span>}
              onClick={() => navigate('/claims/new')}
            >
              File a Claim
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<span>➕</span>}
              onClick={() => navigate('/policies/new')}
            >
              Add Policy
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<span>💬</span>}
              onClick={() => navigate('/support')}
            >
              Contact Support
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<span>👤</span>}
              onClick={() => navigate('/profile')}
            >
              Update Profile
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
} 