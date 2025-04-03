import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  Stack,
  Slider,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Alert
} from '@mui/material';

interface InsuranceFactors {
  age?: { weight: number; baseline: number };
  drivingHistory?: { weight: number };
  healthStatus?: { weight: number };
  healthHistory?: { weight: number };
  propertyValue?: { weight: number };
  location?: { weight: number };
  coverage: { weight: number };
}

interface InsuranceType {
  label: string;
  basePrice: number;
  factors: InsuranceFactors;
}

// Insurance types and their base premiums
const INSURANCE_TYPES: Record<string, InsuranceType> = {
  auto: {
    label: 'Auto Insurance',
    basePrice: 1200,
    factors: {
      age: { weight: 0.3, baseline: 25 },
      drivingHistory: { weight: 0.4 },
      coverage: { weight: 0.3 }
    }
  },
  home: {
    label: 'Home Insurance',
    basePrice: 1500,
    factors: {
      propertyValue: { weight: 0.4 },
      location: { weight: 0.3 },
      coverage: { weight: 0.3 }
    }
  },
  life: {
    label: 'Life Insurance',
    basePrice: 800,
    factors: {
      age: { weight: 0.4, baseline: 30 },
      healthStatus: { weight: 0.4 },
      coverage: { weight: 0.2 }
    }
  },
  health: {
    label: 'Health Insurance',
    basePrice: 2000,
    factors: {
      age: { weight: 0.3, baseline: 30 },
      healthHistory: { weight: 0.4 },
      coverage: { weight: 0.3 }
    }
  }
};

export default function PremiumEstimation() {
  const [insuranceType, setInsuranceType] = useState('');
  const [formData, setFormData] = useState({
    age: 30,
    drivingHistory: 'good',
    healthStatus: 'excellent',
    healthHistory: 'none',
    propertyValue: 300000,
    location: 'urban',
    coverage: 'standard'
  });
  const [estimatedPremium, setEstimatedPremium] = useState<number | null>(null);

  const calculatePremium = () => {
    if (!insuranceType) return;

    const insurance = INSURANCE_TYPES[insuranceType];
    let premium = insurance.basePrice;
    const factors = insurance.factors;

    // Apply factors based on insurance type
    switch (insuranceType) {
      case 'auto':
        if (factors.age && factors.drivingHistory) {
          const ageFactorAuto = Math.max(1, Math.abs(formData.age - factors.age.baseline) * 0.02);
          const drivingFactor = formData.drivingHistory === 'excellent' ? 0.8 : 
                               formData.drivingHistory === 'good' ? 1 : 1.5;
          premium *= (ageFactorAuto * factors.age.weight +
                     drivingFactor * factors.drivingHistory.weight +
                     (formData.coverage === 'basic' ? 0.8 : 
                      formData.coverage === 'standard' ? 1 : 1.3) * 
                      factors.coverage.weight);
        }
        break;

      case 'home':
        if (factors.propertyValue && factors.location) {
          const propertyFactor = formData.propertyValue / 300000;
          const locationFactor = formData.location === 'urban' ? 1.2 :
                                formData.location === 'suburban' ? 1 : 0.9;
          premium *= (propertyFactor * factors.propertyValue.weight +
                     locationFactor * factors.location.weight +
                     (formData.coverage === 'basic' ? 0.8 : 
                      formData.coverage === 'standard' ? 1 : 1.3) * 
                      factors.coverage.weight);
        }
        break;

      case 'life':
      case 'health':
        if (factors.age && (factors.healthStatus || factors.healthHistory)) {
          const ageFactor = Math.max(1, Math.abs(formData.age - factors.age.baseline) * 0.03);
          const healthFactor = formData.healthStatus === 'excellent' ? 0.8 :
                              formData.healthStatus === 'good' ? 1 : 1.4;
          
          const healthWeight = insuranceType === 'life' && factors.healthStatus ? 
            factors.healthStatus.weight :
            factors.healthHistory?.weight || 0;

          premium *= (ageFactor * factors.age.weight +
                     healthFactor * healthWeight +
                     (formData.coverage === 'basic' ? 0.8 : 
                      formData.coverage === 'standard' ? 1 : 1.3) * 
                      factors.coverage.weight);
        }
        break;
    }

    setEstimatedPremium(Math.round(premium));
  };

  const handleChange = (field: string) => (event: any) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Premium Estimation
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Get an estimate of your insurance premium based on your profile
        </Typography>

        <Paper sx={{ p: 3, mt: 4 }}>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Insurance Type</InputLabel>
              <Select
                value={insuranceType}
                label="Insurance Type"
                onChange={(e) => setInsuranceType(e.target.value)}
              >
                {Object.entries(INSURANCE_TYPES).map(([key, value]) => (
                  <MenuItem key={key} value={key}>{value.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {insuranceType && (
              <>
                <Divider />
                
                {/* Age Slider */}
                <Box>
                  <Typography gutterBottom>Age</Typography>
                  <Slider
                    value={formData.age}
                    onChange={(_, value) => setFormData({ ...formData, age: value as number })}
                    min={18}
                    max={80}
                    marks={[
                      { value: 18, label: '18' },
                      { value: 80, label: '80' }
                    ]}
                    valueLabelDisplay="auto"
                  />
                </Box>

                {/* Insurance-specific fields */}
                {insuranceType === 'auto' && (
                  <FormControl fullWidth>
                    <InputLabel>Driving History</InputLabel>
                    <Select
                      value={formData.drivingHistory}
                      label="Driving History"
                      onChange={handleChange('drivingHistory')}
                    >
                      <MenuItem value="excellent">Excellent (No accidents/claims)</MenuItem>
                      <MenuItem value="good">Good (1 minor claim)</MenuItem>
                      <MenuItem value="fair">Fair (Multiple claims)</MenuItem>
                    </Select>
                  </FormControl>
                )}

                {insuranceType === 'home' && (
                  <>
                    <TextField
                      label="Property Value"
                      type="number"
                      value={formData.propertyValue}
                      onChange={handleChange('propertyValue')}
                      InputProps={{
                        startAdornment: <Typography>$</Typography>
                      }}
                    />
                    <FormControl fullWidth>
                      <InputLabel>Location</InputLabel>
                      <Select
                        value={formData.location}
                        label="Location"
                        onChange={handleChange('location')}
                      >
                        <MenuItem value="urban">Urban</MenuItem>
                        <MenuItem value="suburban">Suburban</MenuItem>
                        <MenuItem value="rural">Rural</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                )}

                {(insuranceType === 'life' || insuranceType === 'health') && (
                  <FormControl fullWidth>
                    <InputLabel>Health Status</InputLabel>
                    <Select
                      value={formData.healthStatus}
                      label="Health Status"
                      onChange={handleChange('healthStatus')}
                    >
                      <MenuItem value="excellent">Excellent</MenuItem>
                      <MenuItem value="good">Good</MenuItem>
                      <MenuItem value="fair">Fair</MenuItem>
                    </Select>
                  </FormControl>
                )}

                {/* Coverage Level */}
                <FormControl fullWidth>
                  <InputLabel>Coverage Level</InputLabel>
                  <Select
                    value={formData.coverage}
                    label="Coverage Level"
                    onChange={handleChange('coverage')}
                  >
                    <MenuItem value="basic">Basic Coverage</MenuItem>
                    <MenuItem value="standard">Standard Coverage</MenuItem>
                    <MenuItem value="premium">Premium Coverage</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  size="large"
                  onClick={calculatePremium}
                  sx={{ mt: 2 }}
                >
                  Calculate Premium
                </Button>

                {estimatedPremium && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="subtitle1">
                      Estimated Monthly Premium: ${(estimatedPremium / 12).toFixed(2)}
                    </Typography>
                    <Typography variant="subtitle1">
                      Estimated Annual Premium: ${estimatedPremium.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Note: This is an estimate. Actual premium may vary based on additional factors and underwriting.
                    </Typography>
                  </Alert>
                )}
              </>
            )}
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
} 