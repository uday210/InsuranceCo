import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { mockPolicies } from '../data/mockData';

export default function Policies() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Please log in to view your policies</Typography>
      </Box>
    );
  }

  const userPolicies = mockPolicies.filter(policy => 
    user.policies.includes(policy.id)
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Policies
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Policy Number</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Coverage</TableCell>
              <TableCell>Premium</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userPolicies.map((policy) => (
              <TableRow key={policy.id}>
                <TableCell>{policy.number}</TableCell>
                <TableCell>{policy.type}</TableCell>
                <TableCell>{policy.status}</TableCell>
                <TableCell>${policy.coverage.toLocaleString()}</TableCell>
                <TableCell>${policy.premium.toLocaleString()}</TableCell>
                <TableCell>{new Date(policy.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(policy.endDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 