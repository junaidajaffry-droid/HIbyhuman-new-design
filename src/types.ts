export interface StudioStat {
  value: string;
  label: string;
  sub: string;
}

export interface StudioInfo {
  phone: string;
  email: string;
  location: string;
  website: string;
  stats: StudioStat[];
}

export interface CoreService {
  id: string;
  number: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  highlights: string[];
  gradient: string;
  iconName: string;
}

export interface WorkDeliverable {
  id: string;
  number: string;
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  specs: Record<string, string>;
  techStack: string[];
  gradient: string;
  deliverables: string[];
}

export interface PipelineCategoryInfo {
  count: number;
  unit: string;
  statement: string;
  description: string;
  badge: string;
}

export interface PipelineItem {
  id: string;
  step: string;
  source: string;
  target: string;
  category: "frontend" | "backend" | "cloud" | "marketing";
  protocol: string;
  status: "Active" | "Synced" | "Optimal" | "Sub-Second";
  latency: string;
  description: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: CaseStudyMetric[];
  tags: string[];
  image: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  category:
    | "Logo"
    | "Website"
    | "Ecommerce"
    | "SEO"
    | "Digital Marketing"
    | "Social Media Management"
    | "Branding"
    | "Book Writing & Publishing";
  price: string;
  currency: string;
  turnaround: string;
  popular?: boolean;
  description: string;
  features: string[];
  guarantees: string[];
}

export interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface ClientTestimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  verified: boolean;
  serviceCategory?: string;
  metric?: string;
  avatarGradient?: string;
}

export interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

export interface ProposalFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  company: string;
  serviceType: string;
  budgetRange: string;
  notes: string;
}
