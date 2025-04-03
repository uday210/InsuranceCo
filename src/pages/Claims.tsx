import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { claims, policies } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function Claims() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const userPolicies = policies.filter(policy => 
    user?.policyNumbers.includes(policy.id)
  );

  const userClaims = claims.filter(claim =>
    userPolicies.some(policy => policy.id === claim.policyId)
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Your Claims</Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/claims/new')}
        >
          Submit New Claim
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {userClaims.map(claim => {
          const policy = userPolicies.find(p => p.id === claim.policyId);
          return (
            <Paper key={claim.id} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Claim #{claim.id}</Typography>
                <Chip 
                  label={claim.status} 
                  color={getStatusColor(claim.status) as any}
                  size="small"
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Policy</Typography>
                <Typography variant="body1">{policy?.type} ({claim.policyId})</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Description</Typography>
                <Typography variant="body1">{claim.description}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Amount</Typography>
                <Typography variant="body1">${claim.amount.toLocaleString()}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Date Submitted</Typography>
                <Typography variant="body1">
                  {new Date(claim.dateSubmitted).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button variant="outlined" size="small">
                  View Details
                </Button>
                <Button variant="outlined" size="small">
                  Upload Documents
                </Button>
                <Button variant="outlined" size="small" color="error">
                  Cancel Claim
                </Button>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
} 