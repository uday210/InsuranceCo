import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { policies } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function Policies() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const userPolicies = policies.filter(policy => 
    user?.policyNumbers.includes(policy.id)
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Your Policies</Typography>
        <Button variant="contained" color="primary">
          Add New Policy
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {userPolicies.map(policy => (
          <Paper key={policy.id} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>{policy.type}</Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Policy Number</Typography>
              <Typography variant="body1">{policy.id}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Status</Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: policy.status === 'Active' ? 'success.main' : 'error.main',
                  fontWeight: 'bold'
                }}
              >
                {policy.status}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Coverage</Typography>
              <Typography variant="body1">${policy.coverage.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Premium</Typography>
              <Typography variant="body1">${policy.premium.toLocaleString()} / {policy.paymentSchedule}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Period</Typography>
              <Typography variant="body1">
                {new Date(policy.startDate).toLocaleDateString()} - {new Date(policy.endDate).toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button variant="outlined" size="small">
                View Details
              </Button>
              <Button variant="outlined" size="small">
                Make Payment
              </Button>
              <Button variant="outlined" size="small" color="error">
                Cancel Policy
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
} 