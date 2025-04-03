import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { mockClaims, mockPolicies } from '../data/mockData';

export default function Claims() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Please log in to view your claims</Typography>
      </Box>
    );
  }

  const userPolicies = mockPolicies.filter(policy => 
    user.policies.includes(policy.id)
  );

  const userClaims = mockClaims.filter(claim => 
    userPolicies.some(policy => policy.id === claim.policyId)
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Claims
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Claim ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date Submitted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userClaims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell>{claim.id}</TableCell>
                <TableCell>{claim.type}</TableCell>
                <TableCell>
                  <Chip 
                    label={claim.status} 
                    color={claim.status === 'Approved' ? 'success' : claim.status === 'Pending' ? 'warning' : 'error'} 
                    size="small"
                  />
                </TableCell>
                <TableCell>${claim.amount.toLocaleString()}</TableCell>
                <TableCell>{new Date(claim.dateSubmitted).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 