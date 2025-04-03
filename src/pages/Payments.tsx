import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { payments, policies } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function Payments() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const userPolicies = policies.filter(policy => 
    user?.policyNumbers.includes(policy.id)
  );

  const userPayments = payments.filter(payment =>
    userPolicies.some(policy => policy.id === payment.policyId)
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Payment History</Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/payments/new')}
        >
          Make Payment
        </Button>
      </Box>

      <Paper sx={{ width: '100%', mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Payment ID</TableCell>
                <TableCell>Policy</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userPayments.map((payment) => {
                const policy = userPolicies.find(p => p.id === payment.policyId);
                return (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{policy?.type} ({payment.policyId})</TableCell>
                    <TableCell>${payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip 
                        label={payment.status} 
                        color={getStatusColor(payment.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined">
                        View Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Upcoming Payments</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          {userPolicies.map(policy => (
            <Paper key={policy.id} sx={{ p: 2 }}>
              <Typography variant="subtitle1">{policy.type}</Typography>
              <Typography variant="body2" color="text.secondary">
                Next Payment: ${(policy.premium / 12).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Due Date: {new Date().toLocaleDateString()}
              </Typography>
              <Button 
                variant="contained" 
                size="small" 
                sx={{ mt: 1 }}
                onClick={() => navigate(`/payments/new?policyId=${policy.id}`)}
              >
                Pay Now
              </Button>
            </Paper>
          ))}
        </Box>
      </Paper>
    </Box>
  );
} 