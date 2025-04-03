import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { policies, claims, payments } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const INSURANCE_ICONS: { [key: string]: string } = {
  'Auto Insurance': '🚗',
  'Home Insurance': '🏠',
  'Life Insurance': '❤️',
  'Health Insurance': '⚕️'
};

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
      status: payment.status,
      details: payment.details
    })),
    ...userClaims.map(claim => ({
      date: new Date(claim.dateSubmitted),
      activity: `Claim submitted for ${userPolicies.find(p => p.id === claim.policyId)?.type}`,
      status: claim.status,
      details: claim.details
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
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar 
          sx={{ 
            width: 64, 
            height: 64, 
            bgcolor: 'primary.main',
            fontSize: '1.5rem'
          }}
        >
          {user?.name.split(' ').map(n => n[0]).join('')}
        </Avatar>
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome back, {user?.name.split(' ')[0] || 'John'}!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Here's an overview of your insurance portfolio
          </Typography>
        </Box>
      </Box>

      {/* Overview Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: 3, 
        mb: 4 
      }}>
        <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)', color: 'white' }}>
          <Typography color="rgba(255,255,255,0.8)" gutterBottom>Active Policies</Typography>
          <Typography variant="h3">{userPolicies.length}</Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.8)' }}>
            Across {new Set(userPolicies.map(p => p.type)).size} categories
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)', color: 'white' }}>
          <Typography color="rgba(255,255,255,0.8)" gutterBottom>Pending Claims</Typography>
          <Typography variant="h3">{pendingClaims.length}</Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.8)' }}>
            Total amount: ${pendingClaims.reduce((sum, claim) => sum + claim.amount, 0).toLocaleString()}
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)', color: 'white' }}>
          <Typography color="rgba(255,255,255,0.8)" gutterBottom>Next Payment</Typography>
          <Typography variant="h3">${nextPayment.toLocaleString()}</Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.8)' }}>
            Due in {Math.ceil((new Date('2024-04-01').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
          </Typography>
        </Paper>

        <Paper 
          sx={{ 
            p: 3, 
            background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)', 
            color: 'white',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}
          onClick={() => navigate('/support')}
        >
          <Typography color="rgba(255,255,255,0.8)" gutterBottom>Need Help?</Typography>
          <Typography variant="h6">Contact Support</Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.8)' }}>
            24/7 customer service
          </Typography>
        </Paper>
      </Box>

      {/* Recent Activity */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span role="img" aria-label="activity">📊</span> Recent Activity
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Activity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentActivity.map((activity, index) => (
                <TableRow 
                  key={index}
                  sx={{ 
                    '&:hover': { 
                      bgcolor: 'action.hover',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <TableCell>{activity.date.toLocaleDateString('en-US', { 
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}</TableCell>
                  <TableCell>{activity.activity}</TableCell>
                  <TableCell>
                    <Chip 
                      label={activity.status} 
                      color={getStatusColor(activity.status) as any}
                      size="small"
                      sx={{ 
                        fontWeight: 500,
                        minWidth: 80,
                        textAlign: 'center'
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary">
                      <span role="img" aria-label="view">👁️</span>
                    </IconButton>
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
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span role="img" aria-label="calendar">📅</span> Payment Schedule
          </Typography>
          {userPolicies.map(policy => (
            <Box 
              key={policy.id} 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 2,
                p: 2,
                borderRadius: 1,
                bgcolor: 'background.default',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderRadius: 1,
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText'
                  }}
                >
                  {INSURANCE_ICONS[policy.type]}
                </Typography>
                <Box>
                  <Typography>{policy.type}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Due on {new Date().toLocaleDateString('en-US', { 
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" color="primary">
                  ${(policy.premium / 12).toLocaleString()}
                </Typography>
                <Button 
                  variant="contained" 
                  size="small"
                  onClick={() => navigate(`/payments/new?policyId=${policy.id}`)}
                  sx={{
                    textTransform: 'none',
                    boxShadow: 2
                  }}
                >
                  Pay Now
                </Button>
              </Box>
            </Box>
          ))}
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span role="img" aria-label="actions">⚡</span> Quick Actions
          </Typography>
          <Box sx={{ display: 'grid', gap: 2 }}>
            {[
              { icon: '📝', label: 'File a Claim', path: '/claims/new', color: '#2196F3' },
              { icon: '➕', label: 'Add Policy', path: '/policies/new', color: '#4CAF50' },
              { icon: '💬', label: 'Contact Support', path: '/support', color: '#9C27B0' },
              { icon: '👤', label: 'Update Profile', path: '/profile', color: '#FF9800' }
            ].map((action, index) => (
              <Button 
                key={index}
                variant="outlined"
                startIcon={<span role="img" aria-label={action.label}>{action.icon}</span>}
                onClick={() => navigate(action.path)}
                sx={{
                  color: action.color,
                  borderColor: action.color,
                  '&:hover': {
                    borderColor: action.color,
                    bgcolor: `${action.color}10`
                  },
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  py: 1.5
                }}
              >
                {action.label}
              </Button>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
} 