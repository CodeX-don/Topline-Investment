// Testimonial data model — TDD §6.1

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  rating: number;
  image?: string;
}
