import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Avatar, Container, useTheme } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { policies, claims, payments } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import QuickLinks from '../components/QuickLinks';

const INSURANCE_ICONS: { [key: string]: string } = {
  'Auto Insurance': '🚗',
  'Home Insurance': '🏠',
  'Life Insurance': '❤️',
  'Health Insurance': '⚕️'
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

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
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box 
          sx={{ 
            mb: 6,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: 3,
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: 'primary.main',
              fontSize: '2rem',
              boxShadow: '0 8px 16px -4px rgba(0,0,0,0.1)'
            }}
          >
            {user?.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box>
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2196F3, #3f51b5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Welcome back, {user?.name.split(' ')[0] || 'John'}!
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ opacity: 0.8 }}>
              Here's an overview of your insurance portfolio
            </Typography>
          </Box>
        </Box>

        {/* Quick Links */}
        <Box sx={{ mb: 6 }}>
          <QuickLinks />
        </Box>

        {/* Overview Cards */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: 3, 
          mb: 6
        }}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)', 
              color: 'white',
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 70%)',
                pointerEvents: 'none'
              }
            }}
          >
            <Typography color="rgba(255,255,255,0.9)" gutterBottom fontSize="1.1rem">Active Policies</Typography>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>{userPolicies.length}</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.9)' }}>
              Across {new Set(userPolicies.map(p => p.type)).size} categories
            </Typography>
          </Paper>

          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)', 
              color: 'white',
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 70%)',
                pointerEvents: 'none'
              }
            }}
          >
            <Typography color="rgba(255,255,255,0.9)" gutterBottom fontSize="1.1rem">Pending Claims</Typography>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>{pendingClaims.length}</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.9)' }}>
              Total amount: ${pendingClaims.reduce((sum, claim) => sum + claim.amount, 0).toLocaleString()}
            </Typography>
          </Paper>

          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)', 
              color: 'white',
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 70%)',
                pointerEvents: 'none'
              }
            }}
          >
            <Typography color="rgba(255,255,255,0.9)" gutterBottom fontSize="1.1rem">Next Payment</Typography>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>${nextPayment.toLocaleString()}</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.9)' }}>
              Due in {Math.ceil((new Date('2024-04-01').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
            </Typography>
          </Paper>

          <Paper 
            elevation={0}
            onClick={() => navigate('/support')}
            sx={{ 
              p: 3, 
              background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)', 
              color: 'white',
              borderRadius: 4,
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 20px -10px rgba(156,39,176,0.4)'
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 70%)',
                pointerEvents: 'none'
              }
            }}
          >
            <Typography color="rgba(255,255,255,0.9)" gutterBottom fontSize="1.1rem">Need Help?</Typography>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>Contact Support</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.9)' }}>
              24/7 customer service
            </Typography>
          </Paper>
        </Box>

        {/* Recent Activity */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 6, 
            borderRadius: 4,
            border: '1px solid',
            borderColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
            background: theme.palette.mode === 'light' ? '#fff' : 'rgba(255,255,255,0.05)'
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5,
              fontWeight: 600,
              mb: 3
            }}
          >
            <span role="img" aria-label="activity" style={{ fontSize: '1.5rem' }}>📊</span> 
            Recent Activity
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>Activity</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, fontSize: '1rem' }}>Details</TableCell>
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
                      },
                      transition: 'background-color 0.2s ease'
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
                          minWidth: 90,
                          textAlign: 'center',
                          borderRadius: '6px'
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        size="small" 
                        sx={{ 
                          color: 'primary.main',
                          '&:hover': {
                            bgcolor: 'primary.main',
                            color: 'white'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span role="img" aria-label="view">👁️</span>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Payment Schedule */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4,
            borderRadius: 4,
            border: '1px solid',
            borderColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
            background: theme.palette.mode === 'light' ? '#fff' : 'rgba(255,255,255,0.05)'
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5,
              fontWeight: 600,
              mb: 3
            }}
          >
            <span role="img" aria-label="calendar" style={{ fontSize: '1.5rem' }}>📅</span> 
            Payment Schedule
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {userPolicies.map(policy => (
              <Paper
                key={policy.id} 
                elevation={0}
                sx={{ 
                  p: 3,
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  borderRadius: 3,
                  bgcolor: theme.palette.mode === 'light' ? 'grey.50' : 'rgba(255,255,255,0.03)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'light' ? 'grey.100' : 'rgba(255,255,255,0.05)',
                    transform: 'translateX(4px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Box
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      borderRadius: 2,
                      fontSize: '1.5rem',
                      background: 'linear-gradient(135deg, #3f51b5 0%, #2196F3 100%)',
                      color: 'white',
                      boxShadow: '0 4px 12px -2px rgba(33,150,243,0.3)'
                    }}
                  >
                    {INSURANCE_ICONS[policy.type]}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{policy.type}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Due on {new Date().toLocaleDateString('en-US', { 
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      color: 'primary.main'
                    }}
                  >
                    ${(policy.premium / 12).toLocaleString()}
                  </Typography>
                  <Button 
                    variant="contained"
                    onClick={() => navigate(`/payments/new?policyId=${policy.id}`)}
                    sx={{
                      textTransform: 'none',
                      borderRadius: 2,
                      px: 3,
                      background: 'linear-gradient(135deg, #3f51b5 0%, #2196F3 100%)',
                      boxShadow: '0 4px 12px -2px rgba(33,150,243,0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #3f51b5 0%, #2196F3 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px -2px rgba(33,150,243,0.4)'
                      }
                    }}
                  >
                    Pay Now
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 