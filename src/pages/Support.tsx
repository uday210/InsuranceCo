import { 
  Box, 
  Typography, 
  Paper, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const faqs = [
  {
    question: "How do I file a claim?",
    answer: "You can file a claim by clicking on the 'Submit New Claim' button in the Claims section of your dashboard. You'll need to provide details about the incident and any supporting documentation."
  },
  {
    question: "How can I update my policy?",
    answer: "To update your policy, go to the Policies section and click on the policy you want to modify. You can then make changes to your coverage or personal information."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and electronic checks. You can set up automatic payments in the Payments section of your dashboard."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach our customer support team 24/7 at 1-800-INSURANCE or through the contact form below. Our average response time is less than 2 hours."
  }
];

export default function Support() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Support Center
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              required
              type="email"
            />
            <TextField
              fullWidth
              label="Subject"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Message"
              margin="normal"
              required
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Send Message
            </Button>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Box>
    </Box>
  );
} 