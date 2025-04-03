import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Avatar, Container, useTheme, Grid } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { mockPolicies, mockClaims, mockPayments, Policy, Claim, Payment } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import QuickLinks from '../components/QuickLinks';
import { 
  ShieldCheckIcon, 
  DocumentCheckIcon, 
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

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

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Please log in to view the dashboard</Typography>
      </Box>
    );
  }

  const userPolicies = mockPolicies.filter(policy => 
    user.policies.includes(policy.id)
  );

  const userClaims = mockClaims.filter(claim => 
    userPolicies.some(policy => policy.id === claim.policyId)
  );

  const userPayments = mockPayments.filter(payment => 
    userPolicies.some(policy => policy.id === payment.policyId)
  );

  const pendingClaims = userClaims.filter(claim => claim.status === 'pending').length;
  const nextPayment = userPayments
    .filter(payment => new Date(payment.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const totalCoverage = userPolicies.reduce((sum, policy) => sum + (policy.coverage || 0), 0);
  const totalPremium = userPolicies.reduce((sum, policy) => sum + (policy.premium || 0), 0);

  const recentActivity = [
    ...userPayments.map(payment => ({
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

  const stats = [
    {
      title: 'Active Policies',
      value: userPolicies.length || 0,
      icon: ShieldCheckIcon,
      color: theme.palette.primary.main,
      trend: userPolicies.length > 0 ? `${userPolicies.length} active` : 'No active policies'
    },
    {
      title: 'Pending Claims',
      value: pendingClaims || 0,
      icon: DocumentCheckIcon,
      color: theme.palette.warning.main,
      trend: pendingClaims > 0 ? 'Needs attention' : 'All clear'
    },
    {
      title: 'Next Payment',
      value: nextPayment ? `$${nextPayment.amount.toLocaleString()}` : '$0',
      icon: CurrencyDollarIcon,
      color: theme.palette.success.main,
      trend: nextPayment ? `Due ${new Date(nextPayment.date).toLocaleDateString()}` : 'No upcoming payments'
    },
    {
      title: 'Total Coverage',
      value: `$${totalCoverage.toLocaleString()}`,
      icon: ChartBarIcon,
      color: theme.palette.info.main,
      trend: `$${totalPremium.toLocaleString()} monthly premium`
    }
  ];

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
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: `linear-gradient(135deg, ${stat.color}10, ${stat.color}05)`,
                  border: `1px solid ${stat.color}20`,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 24px ${stat.color}20`,
                    background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}10)`
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: `${stat.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2.5,
                      boxShadow: `0 4px 12px ${stat.color}20`
                    }}
                  >
                    <stat.icon style={{ width: 28, height: 28, color: stat.color }} />
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'text.secondary',
                      fontWeight: 500,
                      fontSize: '1.1rem'
                    }}
                  >
                    {stat.title}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 2,
                    fontWeight: 700,
                    background: `linear-gradient(45deg, ${stat.color}, ${theme.palette.mode === 'dark' ? stat.color + '80' : stat.color + '60'})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '2rem', sm: '2.25rem' }
                  }}
                >
                  {stat.value}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    mt: 'auto',
                    fontSize: '0.95rem',
                    opacity: 0.8,
                    pt: 1
                  }}
                >
                  {stat.trend}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activity */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 6, 
            mt: 4,
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