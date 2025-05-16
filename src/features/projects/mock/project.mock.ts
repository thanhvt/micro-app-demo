import { 
  Project, 
  ProjectStatus, 
  ProjectPriority, 
  ProjectType, 
  ProjectCategory, 
  ProjectSize,
  RiskLevel,
  ApprovalStatus,
  CurrencyCode,
  PaymentMethod,
  PaymentStatus,
  TaskStatus,
  MilestoneStatus,
  DocumentType,
  StakeholderRole,
  TechnologyCategory
} from '../types/project.types';

import { 
  PROJECT_STATUS, 
  PROJECT_PRIORITY, 
  PROJECT_TYPE, 
  PROJECT_CATEGORY, 
  PROJECT_SIZE,
  RISK_LEVEL,
  APPROVAL_STATUS,
  CURRENCY,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  TASK_STATUS,
  MILESTONE_STATUS,
  DOCUMENT_TYPE,
  STAKEHOLDER_ROLE,
  TECHNOLOGY_CATEGORY
} from '../constants/project.constants';

// Helper function to generate random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper function to generate random date within a range
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

// Helper function to get random item from array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper function to get random items from array
const getRandomItems = <T>(array: T[], min: number, max: number): T[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Convert object values to array
const projectStatuses = Object.values(PROJECT_STATUS);
const projectPriorities = Object.values(PROJECT_PRIORITY);
const projectTypes = Object.values(PROJECT_TYPE);
const projectCategories = Object.values(PROJECT_CATEGORY);
const projectSizes = Object.values(PROJECT_SIZE);
const riskLevels = Object.values(RISK_LEVEL);
const approvalStatuses = Object.values(APPROVAL_STATUS);
const currencies = Object.values(CURRENCY);
const paymentMethods = Object.values(PAYMENT_METHOD);
const paymentStatuses = Object.values(PAYMENT_STATUS);
const taskStatuses = Object.values(TASK_STATUS);
const milestoneStatuses = Object.values(MILESTONE_STATUS);
const documentTypes = Object.values(DOCUMENT_TYPE);
const stakeholderRoles = Object.values(STAKEHOLDER_ROLE);
const technologyCategories = Object.values(TECHNOLOGY_CATEGORY);

// Sample data for technologies
const technologies = [
  { name: 'React', category: TECHNOLOGY_CATEGORY.FRONTEND, version: '18.0.0' },
  { name: 'Angular', category: TECHNOLOGY_CATEGORY.FRONTEND, version: '15.0.0' },
  { name: 'Vue.js', category: TECHNOLOGY_CATEGORY.FRONTEND, version: '3.2.0' },
  { name: 'Node.js', category: TECHNOLOGY_CATEGORY.BACKEND, version: '18.12.0' },
  { name: 'Spring Boot', category: TECHNOLOGY_CATEGORY.BACKEND, version: '3.0.0' },
  { name: 'Django', category: TECHNOLOGY_CATEGORY.BACKEND, version: '4.1.0' },
  { name: 'PostgreSQL', category: TECHNOLOGY_CATEGORY.DATABASE, version: '15.0' },
  { name: 'MongoDB', category: TECHNOLOGY_CATEGORY.DATABASE, version: '6.0' },
  { name: 'MySQL', category: TECHNOLOGY_CATEGORY.DATABASE, version: '8.0' },
  { name: 'Docker', category: TECHNOLOGY_CATEGORY.INFRASTRUCTURE, version: '20.10' },
  { name: 'Kubernetes', category: TECHNOLOGY_CATEGORY.INFRASTRUCTURE, version: '1.25' },
  { name: 'AWS', category: TECHNOLOGY_CATEGORY.INFRASTRUCTURE, version: 'Latest' },
  { name: 'React Native', category: TECHNOLOGY_CATEGORY.MOBILE, version: '0.70' },
  { name: 'Flutter', category: TECHNOLOGY_CATEGORY.MOBILE, version: '3.3' },
  { name: 'Electron', category: TECHNOLOGY_CATEGORY.DESKTOP, version: '22.0' }
];

// Sample data for team members
const teamMembers = [
  { name: 'Nguyễn Văn A', department: 'Engineering', role: 'Software Engineer' },
  { name: 'Trần Thị B', department: 'Engineering', role: 'Frontend Developer' },
  { name: 'Lê Văn C', department: 'Engineering', role: 'Backend Developer' },
  { name: 'Phạm Thị D', department: 'Engineering', role: 'DevOps Engineer' },
  { name: 'Hoàng Văn E', department: 'Engineering', role: 'QA Engineer' },
  { name: 'Ngô Thị F', department: 'Design', role: 'UI/UX Designer' },
  { name: 'Đặng Văn G', department: 'Product', role: 'Product Manager' },
  { name: 'Vũ Thị H', department: 'Product', role: 'Business Analyst' },
  { name: 'Bùi Văn I', department: 'Management', role: 'Project Manager' },
  { name: 'Đỗ Thị K', department: 'Management', role: 'Team Lead' }
];

// Sample data for clients
const clients = [
  { name: 'Công ty TNHH ABC', contactPerson: 'Nguyễn Văn X' },
  { name: 'Tập đoàn XYZ', contactPerson: 'Trần Thị Y' },
  { name: 'Công ty Cổ phần DEF', contactPerson: 'Lê Văn Z' },
  { name: 'Ngân hàng GHI', contactPerson: 'Phạm Thị W' },
  { name: 'Tổng công ty JKL', contactPerson: 'Hoàng Văn V' }
];

// Generate a random project
export const generateProject = (): Project => {
  const now = new Date();
  const startDate = randomDate(new Date(now.getFullYear() - 1, 0, 1), now);
  const endDate = randomDate(now, new Date(now.getFullYear() + 1, 11, 31));
  
  const client = getRandomItem(clients);
  const projectManager = getRandomItem(teamMembers);
  
  // Generate random team members
  const randomTeamMembers = getRandomItems(teamMembers, 3, 8).map(member => ({
    id: generateId(),
    name: member.name,
    email: `${member.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
    phone: `0${Math.floor(Math.random() * 900000000) + 100000000}`,
    department: member.department,
    role: member.role,
    startDate: startDate,
    endDate: Math.random() > 0.7 ? endDate : undefined,
    allocation: Math.floor(Math.random() * 50) + 50, // 50-100%
    skills: getRandomItems(['JavaScript', 'TypeScript', 'React', 'Angular', 'Node.js', 'Java', 'Python', 'SQL', 'NoSQL', 'AWS', 'Docker', 'Kubernetes'], 2, 5),
    responsibilities: `Responsible for ${member.role} tasks in the project.`
  }));
  
  // Generate random technologies
  const randomTechnologies = getRandomItems(technologies, 3, 8).map(tech => ({
    id: generateId(),
    name: tech.name,
    category: tech.category as TechnologyCategory,
    version: tech.version,
    description: `${tech.name} is used for ${tech.category} development.`,
    purpose: `Main ${tech.category} technology for the project.`
  }));
  
  // Generate random milestones
  const milestones = [];
  const milestoneCount = Math.floor(Math.random() * 3) + 3; // 3-5 milestones
  
  for (let i = 0; i < milestoneCount; i++) {
    const milestoneDate = new Date(new Date(startDate).getTime() + (i + 1) * (new Date(endDate).getTime() - new Date(startDate).getTime()) / (milestoneCount + 1));
    
    milestones.push({
      id: generateId(),
      name: `Milestone ${i + 1}`,
      description: `Description for Milestone ${i + 1}`,
      dueDate: milestoneDate.toISOString(),
      status: getRandomItem(milestoneStatuses) as MilestoneStatus,
      completionDate: Math.random() > 0.5 ? randomDate(new Date(startDate), milestoneDate) : undefined,
      deliverables: [`Deliverable ${i + 1}.1`, `Deliverable ${i + 1}.2`]
    });
  }
  
  // Generate random tasks
  const tasks = [];
  const taskCount = Math.floor(Math.random() * 10) + 5; // 5-15 tasks
  
  for (let i = 0; i < taskCount; i++) {
    const taskStartDate = randomDate(new Date(startDate), new Date(endDate));
    const taskDueDate = randomDate(new Date(taskStartDate), new Date(endDate));
    
    tasks.push({
      id: generateId(),
      name: `Task ${i + 1}`,
      description: `Description for Task ${i + 1}`,
      assignee: getRandomItem(randomTeamMembers).name,
      startDate: taskStartDate,
      dueDate: taskDueDate,
      status: getRandomItem(taskStatuses) as TaskStatus,
      completionPercentage: Math.floor(Math.random() * 101), // 0-100%
      priority: getRandomItem(projectPriorities) as ProjectPriority,
      dependencies: i > 0 ? [tasks[Math.floor(Math.random() * i)].id] : [],
      notes: `Notes for Task ${i + 1}`
    });
  }
  
  return {
    id: generateId(),
    basicInfo: {
      projectCode: `PRJ-${Date.now().toString().slice(-6)}`,
      projectName: `Project ${Math.floor(Math.random() * 1000) + 1}`,
      projectType: getRandomItem(projectTypes) as ProjectType,
      projectCategory: getRandomItem(projectCategories) as ProjectCategory,
      projectSize: getRandomItem(projectSizes) as ProjectSize,
      status: getRandomItem(projectStatuses) as ProjectStatus,
      priority: getRandomItem(projectPriorities) as ProjectPriority,
      startDate: startDate,
      endDate: endDate,
      description: `This is a sample project description for Project ${Math.floor(Math.random() * 1000) + 1}.`,
      objectives: 'Sample project objectives.',
      scope: 'Sample project scope.',
      constraints: 'Sample project constraints.',
      assumptions: 'Sample project assumptions.',
      client: {
        name: client.name,
        contactPerson: client.contactPerson,
        email: `contact@${client.name.toLowerCase().replace(/\s+/g, '')}.com`,
        phone: `0${Math.floor(Math.random() * 900000000) + 100000000}`,
        address: 'Sample address'
      }
    },
    financialInfo: {
      budget: Math.floor(Math.random() * 900000000) + 100000000,
      currency: getRandomItem(currencies) as CurrencyCode,
      exchangeRate: Math.random() * 23000 + 23000,
      actualCost: Math.floor(Math.random() * 900000000) + 100000000,
      estimatedCost: Math.floor(Math.random() * 900000000) + 100000000,
      costVariance: Math.floor(Math.random() * 10000000) - 5000000,
      contingencyReserve: Math.floor(Math.random() * 50000000) + 10000000,
      managementReserve: Math.floor(Math.random() * 30000000) + 5000000,
      roi: Math.random() * 0.5 + 0.1, // 10-60%
      npv: Math.floor(Math.random() * 500000000) - 100000000,
      irr: Math.random() * 0.3 + 0.05, // 5-35%
      paybackPeriod: Math.floor(Math.random() * 24) + 6, // 6-30 months
      fundingSources: [
        {
          id: generateId(),
          name: 'Internal Budget',
          amount: Math.floor(Math.random() * 500000000) + 100000000,
          description: 'Funding from internal company budget'
        },
        {
          id: generateId(),
          name: 'Client Payment',
          amount: Math.floor(Math.random() * 500000000) + 100000000,
          description: 'Funding from client payments'
        }
      ],
      expenses: [
        {
          id: generateId(),
          category: 'Personnel',
          description: 'Team salaries and benefits',
          amount: Math.floor(Math.random() * 300000000) + 100000000,
          date: randomDate(new Date(startDate), now),
          status: getRandomItem(paymentStatuses) as PaymentStatus
        },
        {
          id: generateId(),
          category: 'Equipment',
          description: 'Hardware and software purchases',
          amount: Math.floor(Math.random() * 100000000) + 10000000,
          date: randomDate(new Date(startDate), now),
          status: getRandomItem(paymentStatuses) as PaymentStatus
        },
        {
          id: generateId(),
          category: 'Services',
          description: 'External services and consultants',
          amount: Math.floor(Math.random() * 100000000) + 10000000,
          date: randomDate(new Date(startDate), now),
          status: getRandomItem(paymentStatuses) as PaymentStatus
        }
      ],
      paymentSchedules: [
        {
          id: generateId(),
          installment: 1,
          dueDate: randomDate(new Date(startDate), new Date(endDate)),
          amount: Math.floor(Math.random() * 300000000) + 100000000,
          method: getRandomItem(paymentMethods) as PaymentMethod,
          status: getRandomItem(paymentStatuses) as PaymentStatus,
          note: 'Initial payment'
        },
        {
          id: generateId(),
          installment: 2,
          dueDate: randomDate(new Date(startDate), new Date(endDate)),
          amount: Math.floor(Math.random() * 300000000) + 100000000,
          method: getRandomItem(paymentMethods) as PaymentMethod,
          status: getRandomItem(paymentStatuses) as PaymentStatus,
          note: 'Milestone payment'
        },
        {
          id: generateId(),
          installment: 3,
          dueDate: randomDate(new Date(startDate), new Date(endDate)),
          amount: Math.floor(Math.random() * 300000000) + 100000000,
          method: getRandomItem(paymentMethods) as PaymentMethod,
          status: getRandomItem(paymentStatuses) as PaymentStatus,
          note: 'Final payment'
        }
      ]
    },
    teamInfo: {
      projectManager: {
        id: generateId(),
        name: projectManager.name,
        email: `${projectManager.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        phone: `0${Math.floor(Math.random() * 900000000) + 100000000}`,
        department: projectManager.department,
        role: projectManager.role
      },
      teamMembers: randomTeamMembers,
      stakeholders: [
        {
          id: generateId(),
          name: client.contactPerson,
          organization: client.name,
          role: STAKEHOLDER_ROLE.CLIENT,
          email: `${client.contactPerson.toLowerCase().replace(/\s+/g, '.')}@${client.name.toLowerCase().replace(/\s+/g, '')}.com`,
          phone: `0${Math.floor(Math.random() * 900000000) + 100000000}`,
          influence: getRandomItem(['low', 'medium', 'high']),
          interest: getRandomItem(['low', 'medium', 'high']),
          expectations: 'Successful project delivery within budget and timeline',
          communicationFrequency: getRandomItem(['daily', 'weekly', 'monthly', 'quarterly', 'as_needed'])
        },
        {
          id: generateId(),
          name: 'Nguyễn Văn Sponsor',
          organization: 'Internal',
          role: STAKEHOLDER_ROLE.SPONSOR,
          email: 'sponsor@example.com',
          phone: `0${Math.floor(Math.random() * 900000000) + 100000000}`,
          influence: 'high',
          interest: 'high',
          expectations: 'Project ROI and business value',
          communicationFrequency: 'monthly'
        }
      ],
      resourceRequirements: [
        {
          id: generateId(),
          resourceType: 'Developer',
          quantity: Math.floor(Math.random() * 5) + 3,
          skills: ['JavaScript', 'React', 'Node.js'],
          startDate: startDate,
          endDate: endDate,
          notes: 'Full-stack developers needed'
        },
        {
          id: generateId(),
          resourceType: 'Designer',
          quantity: Math.floor(Math.random() * 2) + 1,
          skills: ['UI/UX', 'Figma', 'Adobe XD'],
          startDate: startDate,
          endDate: endDate,
          notes: 'UI/UX designers needed'
        }
      ]
    },
    technicalInfo: {
      technologies: randomTechnologies,
      infrastructure: [
        {
          id: generateId(),
          name: 'AWS EC2',
          type: 'Cloud Server',
          provider: 'AWS',
          specifications: 't3.large, 8GB RAM, 100GB SSD',
          cost: Math.floor(Math.random() * 5000000) + 1000000,
          startDate: startDate,
          endDate: endDate
        },
        {
          id: generateId(),
          name: 'AWS RDS',
          type: 'Database',
          provider: 'AWS',
          specifications: 'PostgreSQL, 16GB RAM, 500GB SSD',
          cost: Math.floor(Math.random() * 5000000) + 1000000,
          startDate: startDate,
          endDate: endDate
        }
      ],
      architecture: {
        description: 'Microservices architecture with React frontend and Node.js backend',
        diagrams: ['architecture-diagram.png'],
        components: [
          {
            id: generateId(),
            name: 'Frontend',
            description: 'React-based SPA',
            dependencies: ['API Gateway']
          },
          {
            id: generateId(),
            name: 'API Gateway',
            description: 'Express.js API Gateway',
            dependencies: ['Auth Service', 'Core Service']
          },
          {
            id: generateId(),
            name: 'Auth Service',
            description: 'Authentication and Authorization Service',
            dependencies: ['Database']
          },
          {
            id: generateId(),
            name: 'Core Service',
            description: 'Core Business Logic Service',
            dependencies: ['Database']
          },
          {
            id: generateId(),
            name: 'Database',
            description: 'PostgreSQL Database',
            dependencies: []
          }
        ]
      },
      integrations: [
        {
          id: generateId(),
          system: 'Payment Gateway',
          description: 'Integration with payment processing system',
          integrationMethod: 'REST API',
          dataFlow: 'Bidirectional',
          status: 'Planned'
        },
        {
          id: generateId(),
          system: 'CRM',
          description: 'Integration with customer relationship management system',
          integrationMethod: 'REST API',
          dataFlow: 'Bidirectional',
          status: 'In Progress'
        }
      ],
      securityRequirements: [
        {
          id: generateId(),
          category: 'Authentication',
          description: 'Implement OAuth 2.0 and JWT for authentication',
          priority: 'high',
          implementationStatus: 'Planned'
        },
        {
          id: generateId(),
          category: 'Data Protection',
          description: 'Encrypt sensitive data at rest and in transit',
          priority: 'high',
          implementationStatus: 'Planned'
        }
      ],
      performanceRequirements: [
        {
          id: generateId(),
          category: 'Response Time',
          description: 'API response time should be under 200ms for 95% of requests',
          metrics: 'Response time (ms)',
          targetValues: '<200ms for p95'
        },
        {
          id: generateId(),
          category: 'Throughput',
          description: 'System should handle at least 100 requests per second',
          metrics: 'Requests per second',
          targetValues: '>100 RPS'
        }
      ]
    },
    progressInfo: {
      milestones,
      tasks,
      risks: [
        {
          id: generateId(),
          name: 'Resource Availability',
          description: 'Risk of key team members being unavailable',
          category: 'Resource',
          probability: 'medium',
          impact: 'high',
          level: 'high',
          mitigationPlan: 'Cross-train team members and document knowledge',
          contingencyPlan: 'Have backup resources identified',
          owner: projectManager.name,
          status: 'open'
        },
        {
          id: generateId(),
          name: 'Technology Risk',
          description: 'Risk of selected technologies not meeting requirements',
          category: 'Technical',
          probability: 'low',
          impact: 'high',
          level: 'medium',
          mitigationPlan: 'Conduct thorough technology evaluation and POCs',
          contingencyPlan: 'Identify alternative technologies',
          owner: getRandomItem(randomTeamMembers).name,
          status: 'mitigated'
        }
      ],
      issues: [
        {
          id: generateId(),
          name: 'API Performance',
          description: 'API response times are higher than expected',
          category: 'Technical',
          priority: 'high',
          severity: 'medium',
          reportedDate: randomDate(new Date(startDate), now),
          reportedBy: getRandomItem(randomTeamMembers).name,
          assignee: getRandomItem(randomTeamMembers).name,
          status: 'in_progress',
          resolutionDate: undefined,
          resolution: undefined
        }
      ],
      changes: [
        {
          id: generateId(),
          name: 'Scope Change',
          description: 'Add new feature to the project scope',
          requestedBy: client.contactPerson,
          requestedDate: randomDate(new Date(startDate), now),
          impact: 'Medium impact on timeline and budget',
          priority: 'medium',
          status: getRandomItem(approvalStatuses) as ApprovalStatus,
          approvedBy: Math.random() > 0.5 ? projectManager.name : undefined,
          approvedDate: Math.random() > 0.5 ? randomDate(new Date(startDate), now) : undefined,
          implementationDate: undefined,
          notes: 'Evaluating impact on project timeline and resources'
        }
      ]
    },
    documentsInfo: {
      documents: [
        {
          id: generateId(),
          name: 'Project Charter',
          type: 'contract',
          version: '1.0',
          uploadDate: randomDate(new Date(startDate), now),
          uploadedBy: projectManager.name,
          description: 'Project charter document',
          url: 'project-charter.pdf',
          size: Math.floor(Math.random() * 5000000) + 100000,
          status: 'approved'
        },
        {
          id: generateId(),
          name: 'Requirements Specification',
          type: 'specification',
          version: '1.2',
          uploadDate: randomDate(new Date(startDate), now),
          uploadedBy: getRandomItem(randomTeamMembers).name,
          description: 'Detailed requirements specification',
          url: 'requirements-spec.pdf',
          size: Math.floor(Math.random() * 10000000) + 500000,
          status: 'approved'
        }
      ],
      approvals: [
        {
          id: generateId(),
          stage: 'Project Initiation',
          approver: 'Nguyễn Văn Sponsor',
          role: 'Sponsor',
          dueDate: randomDate(new Date(startDate), new Date(new Date(startDate).getTime() + 7 * 24 * 60 * 60 * 1000)),
          status: 'approved',
          approvalDate: randomDate(new Date(startDate), new Date(new Date(startDate).getTime() + 7 * 24 * 60 * 60 * 1000)),
          comments: 'Approved with minor comments'
        }
      ],
      notes: 'Additional project documentation notes'
    },
    createdAt: randomDate(new Date(new Date(startDate).getTime() - 30 * 24 * 60 * 60 * 1000), new Date(startDate)),
    updatedAt: randomDate(new Date(startDate), now),
    createdBy: projectManager.name,
    updatedBy: projectManager.name
  };
};

// Generate mock projects
export const mockProjects: Project[] = Array.from({ length: 10 }, () => generateProject());
