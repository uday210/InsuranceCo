import { Box, Paper, Typography, Tooltip, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface QuickLink {
  title: string;
  description: string;
  icon: string;
  path: string;
  gradient: [string, string];
}

const quickLinks: QuickLink[] = [
  {
    title: 'Get a Quote',
    description: 'Estimate your premium instantly',
    icon: '🧮',
    path: '/premium-estimation',
    gradient: ['#00b09b', '#96c93d']
  },
  {
    title: 'File a Claim',
    description: 'Submit a new insurance claim',
    icon: '🎯',
    path: '/claims',
    gradient: ['#2193b0', '#6dd5ed']
  },
  {
    title: 'Make Payment',
    description: 'Pay your premium or bills',
    icon: '💳',
    path: '/payments/new',
    gradient: ['#cc2b5e', '#753a88']
  },
  {
    title: 'View Policies',
    description: 'Check your active policies',
    icon: '📋',
    path: '/policies',
    gradient: ['#ff9966', '#ff5e62']
  },
  {
    title: 'Get Support',
    description: 'Contact our support team',
    icon: '💬',
    path: '/support',
    gradient: ['#4e54c8', '#8f94fb']
  },
  {
    title: 'View Dashboard',
    description: 'See your insurance overview',
    icon: '🏠',
    path: '/dashboard',
    gradient: ['#11998e', '#38ef7d']
  }
];

export default function QuickLinks() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ py: 4 }}>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 3,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: 60,
            height: 3,
            background: theme.palette.primary.main,
            borderRadius: 1.5
          }
        }}
      >
        <span role="img" aria-label="quick links" style={{ fontSize: '1.5rem' }}>⚡</span>
        Quick Actions
      </Typography>
      
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        },
        gap: 3
      }}>
        {quickLinks.map((link) => (
          <Tooltip 
            key={link.path} 
            title={link.description} 
            arrow 
            placement="top"
            enterDelay={300}
            leaveDelay={200}
          >
            <Paper
              elevation={0}
              onClick={() => navigate(link.path)}
              sx={{
                p: 2.5,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: 3,
                background: theme.palette.mode === 'light' ? '#fff' : 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'light' 
                  ? 'rgba(255, 255, 255, 0.3)'
                  : 'rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${link.gradient[0]}, ${link.gradient[1]})`,
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  zIndex: 0
                },
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 12px 24px -10px rgba(0,0,0,0.15)',
                  '&::before': {
                    opacity: 0.1
                  },
                  '& .icon-container': {
                    transform: 'scale(1.1) rotate(5deg)',
                    background: `linear-gradient(135deg, ${link.gradient[0]}, ${link.gradient[1]})`
                  },
                  '& .link-title': {
                    background: `linear-gradient(135deg, ${link.gradient[0]}, ${link.gradient[1]})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }
                }
              }}
            >
              <Box
                className="icon-container"
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${link.gradient[0]}20, ${link.gradient[1]}20)`,
                  fontSize: '1.75rem',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  zIndex: 1
                }}
              >
                <span role="img" aria-label={link.title}>
                  {link.icon}
                </span>
              </Box>
              <Box sx={{ zIndex: 1 }}>
                <Typography 
                  className="link-title"
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 0.5,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {link.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.mode === 'light' 
                      ? 'rgba(0,0,0,0.6)' 
                      : 'rgba(255,255,255,0.7)',
                    lineHeight: 1.4
                  }}
                >
                  {link.description}
                </Typography>
              </Box>
            </Paper>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
} 