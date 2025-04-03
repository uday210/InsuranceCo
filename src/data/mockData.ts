export interface User {
  id: string;
  name: string;
  email: string;
  policies: string[];
}

export interface Policy {
  id: string;
  type: string;
  number: string;
  status: string;
  coverage: number;
  premium: number;
  startDate: string;
  endDate: string;
  details: {
    [key: string]: any;
  };
}

export interface Claim {
  id: string;
  policyId: string;
  type: string;
  status: string;
  amount: number;
  dateSubmitted: string;
  details: {
    [key: string]: any;
  };
}

export interface Payment {
  id: string;
  policyId: string;
  amount: number;
  date: string;
  status: string;
  details: {
    [key: string]: any;
  };
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    policies: ['1', '2']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    policies: ['3', '4']
  }
];

export const mockPolicies: Policy[] = [
  {
    id: '1',
    type: 'Auto',
    number: 'AUTO-001',
    status: 'Active',
    coverage: 50000,
    premium: 1200,
    startDate: '2023-01-01',
    endDate: '2024-01-01',
    details: {
      vehicle: 'Toyota Camry 2020',
      vin: '1HGCM82633A123456'
    }
  },
  {
    id: '2',
    type: 'Home',
    number: 'HOME-001',
    status: 'Active',
    coverage: 300000,
    premium: 1500,
    startDate: '2023-01-01',
    endDate: '2024-01-01',
    details: {
      address: '123 Main St',
      yearBuilt: 2010
    }
  },
  {
    id: '3',
    type: 'Life',
    number: 'LIFE-001',
    status: 'Active',
    coverage: 1000000,
    premium: 2000,
    startDate: '2023-01-01',
    endDate: '2024-01-01',
    details: {
      beneficiary: 'Jane Smith',
      term: '20 years'
    }
  },
  {
    id: '4',
    type: 'Health',
    number: 'HLTH-001',
    status: 'Active',
    coverage: 500000,
    premium: 1800,
    startDate: '2023-01-01',
    endDate: '2024-01-01',
    details: {
      planType: 'PPO',
      deductible: 2000
    }
  }
];

export const mockClaims: Claim[] = [
  {
    id: '1',
    policyId: '1',
    type: 'Auto',
    status: 'Pending',
    amount: 5000,
    dateSubmitted: '2023-06-15',
    details: {
      description: 'Rear-end collision',
      location: 'Main Street'
    }
  },
  {
    id: '2',
    policyId: '2',
    type: 'Home',
    status: 'Approved',
    amount: 10000,
    dateSubmitted: '2023-05-20',
    details: {
      description: 'Water damage',
      cause: 'Pipe burst'
    }
  },
  {
    id: '3',
    policyId: '3',
    type: 'Life',
    status: 'Pending',
    amount: 1000000,
    dateSubmitted: '2023-07-01',
    details: {
      description: 'Death benefit claim',
      cause: 'Natural causes'
    }
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    policyId: '1',
    amount: 1200,
    date: '2023-07-01',
    status: 'Completed',
    details: {
      method: 'Credit Card',
      receipt: 'RC-001'
    }
  },
  {
    id: '2',
    policyId: '2',
    amount: 1500,
    date: '2023-07-01',
    status: 'Completed',
    details: {
      method: 'Bank Transfer',
      receipt: 'RC-002'
    }
  },
  {
    id: '3',
    policyId: '3',
    amount: 2000,
    date: '2023-07-01',
    status: 'Completed',
    details: {
      method: 'Credit Card',
      receipt: 'RC-003'
    }
  },
  {
    id: '4',
    policyId: '4',
    amount: 1800,
    date: '2023-07-01',
    status: 'Completed',
    details: {
      method: 'Bank Transfer',
      receipt: 'RC-004'
    }
  },
  {
    id: '5',
    policyId: '1',
    amount: 1200,
    date: '2023-08-01',
    status: 'Pending',
    details: {
      method: 'Credit Card',
      receipt: 'RC-005'
    }
  }
]; 