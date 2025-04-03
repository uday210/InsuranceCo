import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  Stack,
  Container
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuth } from '../context/AuthContext';

// FAQ data
const faqs = [
  {
    question: 'How do I file a claim?',
    answer: 'You can file a claim by clicking on the "File a Claim" button in the Quick Actions section of your dashboard. Follow the step-by-step process and upload any relevant documents.'
  },
  {
    question: 'How long does it take to process a claim?',
    answer: 'Most claims are processed within 5-7 business days. Complex claims may take longer. You can check the status of your claim in the Claims section of your dashboard.'
  },
  {
    question: 'How do I update my policy information?',
    answer: 'To update your policy information, navigate to the Policies section, select the policy you want to update, and click on the "Edit" button. Make your changes and save.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept credit/debit cards (Visa, Mastercard, American Express) and bank transfers. You can set up automatic payments in the Payments section.'
  },
  {
    question: 'How do I download my insurance documents?',
    answer: 'You can find all your insurance documents in the Documents section of each policy. Click on the document name to download it.'
  }
];

// Contact channels
const contactChannels = [
  {
    icon: '📞',
    title: 'Phone Support',
    description: '24/7 Emergency Support',
    contact: '1-800-123-4567',
    availability: 'Always available'
  },
  {
    icon: '💬',
    title: 'Live Chat',
    description: 'Quick Response Time',
    contact: 'Start Chat',
    availability: 'Mon-Fri, 9AM-6PM'
  },
  {
    icon: '📧',
    title: 'Email Support',
    description: 'Detailed Assistance',
    contact: 'support@insureco.com',
    availability: '24-48 hour response'
  }
];

export default function Support() {
  const { user } = useAuth();
  const [expandedFaq, setExpandedFaq] = useState<string | false>(false);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    description: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate initial data loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleFaqChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedFaq(isExpanded ? panel : false);
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) { // 90% success rate
            resolve(true);
          } else {
            reject(new Error('Failed to submit ticket'));
          }
        }, 1500);
      });
      
      setShowSuccess(true);
      setTicketForm({
        subject: '',
        description: '',
        category: ''
      });
    } catch (error) {
      console.error('Error submitting ticket:', error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            How can we help you today?
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Get support from our team or browse through our help resources
          </Typography>
        </Box>

        {/* Contact Cards */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
          {contactChannels.map((channel, index) => (
            <Card 
              key={index}
              sx={{ 
                flex: 1,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h2" sx={{ mb: 2 }}>
                  {channel.icon}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {channel.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {channel.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                  {channel.contact}
                </Typography>
                <Chip 
                  label={channel.availability} 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                />
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Support Ticket Form */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span role="img" aria-label="ticket">🎫</span> Create Support Ticket
          </Typography>
          <form onSubmit={handleTicketSubmit}>
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <TextField
                  fullWidth
                  label="Subject"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  required
                />
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={ticketForm.category}
                  onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                  required
                  SelectProps={{ native: true }}
                >
                  <option value="">Select a category</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="claims">Claims</option>
                  <option value="policy">Policy Changes</option>
                  <option value="technical">Technical Support</option>
                </TextField>
              </Stack>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={ticketForm.description}
                onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                required
              />
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{ minWidth: 200 }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Submit Ticket'
                  )}
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>

        {/* FAQs */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span role="img" aria-label="faq">❓</span> Frequently Asked Questions
          </Typography>
          <Box sx={{ mt: 2 }}>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expandedFaq === `panel${index}`}
                onChange={handleFaqChange(`panel${index}`)}
                sx={{
                  '&:before': {
                    display: 'none',
                  },
                  boxShadow: 'none',
                  '&:not(:last-child)': {
                    borderBottom: 1,
                    borderColor: 'divider',
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  <Typography fontWeight="medium">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Paper>

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setShowSuccess(false)} 
            severity="success"
            variant="filled"
          >
            Support ticket submitted successfully! We'll get back to you soon.
          </Alert>
        </Snackbar>

        {/* Add Error Snackbar */}
        <Snackbar
          open={showError}
          autoHideDuration={6000}
          onClose={() => setShowError(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setShowError(false)} 
            severity="error"
            variant="filled"
          >
            Failed to submit support ticket. Please try again.
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
} 