import { Box, Typography, Paper, Grid, Switch, FormControlLabel } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Email notifications"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Receive email notifications about policy updates, claims status, and payment reminders.
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="SMS notifications"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Receive SMS alerts for important updates and payment due dates.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Account Settings
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Email</Typography>
              <Typography color="text.secondary">{user?.email}</Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Name</Typography>
              <Typography color="text.secondary">{user?.name}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 