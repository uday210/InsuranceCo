import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, TextField, MenuItem, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { policies } from '../data/mockData';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function NewPayment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedPolicy, setSelectedPolicy] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [error, setError] = useState('');

  const userPolicies = policies.filter(policy => 
    user?.policyNumbers.includes(policy.id)
  );

  useEffect(() => {
    const policyId = searchParams.get('policyId');
    if (policyId && userPolicies.some(p => p.id === policyId)) {
      setSelectedPolicy(policyId);
      const policy = userPolicies.find(p => p.id === policyId);
      if (policy) {
        setAmount((policy.premium / 12).toString());
      }
    }
  }, [searchParams, userPolicies]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPolicy || !amount || !paymentMethod) {
      setError('Please fill in all fields');
      return;
    }

    // Here you would typically make an API call to process the payment
    console.log('Processing payment:', {
      policyId: selectedPolicy,
      amount,
      paymentMethod
    });

    // Simulate successful payment
    navigate('/payments', { state: { paymentSuccess: true } });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Make a Payment</Typography>
      
      <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {error && (
              <Alert severity="error">{error}</Alert>
            )}

            <TextField
              select
              fullWidth
              label="Select Policy"
              value={selectedPolicy}
              onChange={(e) => setSelectedPolicy(e.target.value)}
              required
            >
              {userPolicies.map((policy) => (
                <MenuItem key={policy.id} value={policy.id}>
                  {policy.type} - ${(policy.premium / 12).toLocaleString()} monthly
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              InputProps={{
                startAdornment: '$',
              }}
            />

            <TextField
              select
              fullWidth
              label="Payment Method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <MenuItem value="credit_card">Credit Card</MenuItem>
              <MenuItem value="debit_card">Debit Card</MenuItem>
              <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
            </TextField>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Process Payment
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
} 