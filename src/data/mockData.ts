export const users = [
  {
    id: 'USR-001',
    email: 'john.doe@example.com',
    password: 'password123', // In a real app, this would be hashed
    name: 'John Doe',
    policyNumbers: ['POL-001', 'POL-002', 'POL-003', 'POL-004']
  }
];

export const policies = [
  {
    id: 'POL-001',
    type: 'Auto Insurance',
    status: 'Active',
    coverage: 50000,
    premium: 1200,
    paymentSchedule: 'monthly',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    details: {
      vehicleMake: 'Toyota',
      vehicleModel: 'Camry',
      vehicleYear: '2022',
      coverageType: 'Comprehensive'
    }
  },
  {
    id: 'POL-002',
    type: 'Home Insurance',
    status: 'Active',
    coverage: 500000,
    premium: 2400,
    paymentSchedule: 'monthly',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    details: {
      propertyType: 'Single Family Home',
      address: '123 Main St, Anytown, USA',
      squareFeet: 2500,
      yearBuilt: 2010
    }
  },
  {
    id: 'POL-003',
    type: 'Life Insurance',
    status: 'Active',
    coverage: 1000000,
    premium: 150,
    paymentSchedule: 'monthly',
    startDate: '2024-01-15',
    endDate: '2054-01-15',
    details: {
      policyType: 'Term Life',
      termLength: '30 years',
      beneficiaries: ['Jane Doe', 'Jimmy Doe']
    }
  },
  {
    id: 'POL-004',
    type: 'Health Insurance',
    status: 'Active',
    coverage: 2000000,
    premium: 450,
    paymentSchedule: 'monthly',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    details: {
      planType: 'PPO',
      deductible: 1500,
      coPayment: 25,
      familyCoverage: true
    }
  }
];

export const claims = [
  {
    id: 'CLM-001',
    policyId: 'POL-001',
    description: 'Minor car accident - front bumper damage',
    amount: 2500,
    status: 'Pending',
    dateSubmitted: '2024-02-28',
    documents: ['accident_report.pdf', 'damage_photos.jpg'],
    details: {
      location: '456 Oak Ave, Anytown, USA',
      date: '2024-02-27',
      description: 'Collision with another vehicle at intersection'
    }
  },
  {
    id: 'CLM-002',
    policyId: 'POL-002',
    description: 'Water damage from pipe leak',
    amount: 5000,
    status: 'Approved',
    dateSubmitted: '2024-02-15',
    documents: ['plumber_report.pdf', 'damage_assessment.pdf'],
    details: {
      location: 'Master Bathroom',
      date: '2024-02-14',
      description: 'Burst pipe caused water damage to ceiling and walls'
    }
  },
  {
    id: 'CLM-003',
    policyId: 'POL-004',
    description: 'Emergency room visit',
    amount: 3500,
    status: 'Completed',
    dateSubmitted: '2024-03-01',
    documents: ['medical_report.pdf', 'hospital_bill.pdf'],
    details: {
      hospital: 'City General Hospital',
      date: '2024-02-29',
      treatment: 'Broken arm treatment and cast'
    }
  }
];

export const payments = [
  {
    id: 'PAY-001',
    policyId: 'POL-001',
    amount: 100,
    date: '2024-03-15',
    status: 'Completed',
    method: 'credit_card',
    details: {
      cardType: 'Visa',
      last4: '4242',
      receiptNumber: 'RCP-2024-001'
    }
  },
  {
    id: 'PAY-002',
    policyId: 'POL-002',
    amount: 200,
    date: '2024-03-15',
    status: 'Completed',
    method: 'bank_transfer',
    details: {
      bankName: 'National Bank',
      last4: '9876',
      receiptNumber: 'RCP-2024-002'
    }
  },
  {
    id: 'PAY-003',
    policyId: 'POL-003',
    amount: 150,
    date: '2024-03-15',
    status: 'Completed',
    method: 'credit_card',
    details: {
      cardType: 'Mastercard',
      last4: '1234',
      receiptNumber: 'RCP-2024-003'
    }
  },
  {
    id: 'PAY-004',
    policyId: 'POL-004',
    amount: 450,
    date: '2024-03-15',
    status: 'Pending',
    method: 'bank_transfer',
    details: {
      bankName: 'City Bank',
      last4: '5432',
      receiptNumber: 'RCP-2024-004'
    }
  },
  {
    id: 'PAY-005',
    policyId: 'POL-001',
    amount: 100,
    date: '2024-02-15',
    status: 'Completed',
    method: 'credit_card',
    details: {
      cardType: 'Visa',
      last4: '4242',
      receiptNumber: 'RCP-2024-005'
    }
  }
]; 