// Service data model — TDD §6.1

export type ServiceCategory =
  | 'residential'
  | 'commercial'
  | 'renovation'
  | 'finishing';

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  features: string[];
  image?: string;
  category: ServiceCategory;
}
