// Portfolio data model — TDD §6.1

export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  location: string;
  year: number;
  images: ProjectImage[];
  featured: boolean;
  /** Optional service-page anchor for the project's discipline. */
  href?: string;
}
