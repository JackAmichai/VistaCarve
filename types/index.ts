export type PortfolioProject = {
  _id: string;
  title: string;
  slug: string;
  shortSummary: string;
  fullDescription: string;
  coverImage: string;
  techStack: string[];
  liveLink: string;
  isFeatured: boolean;
};

export type Testimonial = {
  _id: string;
  title: string;
  company: string;
  review: string;
  rating: number;
  clientAvatar: string;
};

export type FreelancerBio = {
  _id: string;
  title: string;
  jobRole: string;
  tagline: string;
  aboutMe: string;
  profilePicture: string;
  githubUrl: string;
  hourlyRate: number;
};
