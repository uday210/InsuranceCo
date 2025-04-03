export const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123', // In a real app, this would be hashed
    name: 'John Doe',
    policyNumbers: ['POL-001', 'POL-002']
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
    endDate: '2024-12-31'
  },
  {
    id: 'POL-002',
    type: 'Home Insurance',
    status: 'Active',
    coverage: 200000,
    premium: 2400,
    paymentSchedule: 'monthly',
    startDate: '2024-01-01',
    endDate: '2024-12-31'
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
    documents: []
  },
  {
    id: 'CLM-002',
    policyId: 'POL-002',
    description: 'Water damage from pipe leak',
    amount: 5000,
    status: 'Approved',
    dateSubmitted: '2024-02-15',
    documents: []
  }
];

export const payments = [
  {
    id: 'PAY-001',
    policyId: 'POL-001',
    amount: 100,
    date: '2024-03-15',
    status: 'Completed',
    method: 'credit_card'
  },
  {
    id: 'PAY-002',
    policyId: 'POL-002',
    amount: 200,
    date: '2024-03-15',
    status: 'Completed',
    method: 'bank_transfer'
  },
  {
    id: 'PAY-003',
    policyId: 'POL-001',
    amount: 100,
    date: '2024-02-15',
    status: 'Completed',
    method: 'credit_card'
  }
]; 