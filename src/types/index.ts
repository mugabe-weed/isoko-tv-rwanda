export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration?: string;
  views?: string;
  viewsCount?: number;
  category: 'Interviews' | 'Comedy' | 'Muzika' | 'News' | 'Culture' | 'Drama';
  channelTitle: string;
  youtubeUrl: string;
  isLive?: boolean;
}

export interface Show {
  id: string;
  title: string;
  kinyarwandaTitle: string;
  description: string;
  host: string;
  schedule: string;
  thumbnail: string;
  banner: string;
  episodeCount: number;
  playlistUrl?: string;
  category: string;
  recentEpisodes: {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    views: string;
    youtubeUrl: string;
  }[];
}

export interface DonationMethod {
  id: string;
  name: string;
  provider: 'MTN Mobile Money' | 'Airtel Money' | 'PayPal' | 'Streamlabs';
  accountName: string;
  accountNumber: string;
  ussdCode?: string;
  merchantCode?: string;
  instructions: string;
  kinyarwandaInstructions?: string;
  badge?: string;
  currency: string;
  externalLink?: string;
}

export interface MediaKitStats {
  subscribers: string;
  subscribersCount: number;
  monthlyViews: string;
  monthlyWatchHours: string;
  totalUploads: string;
  engagementRate: string;
  topCountries: { country: string; percentage: number; flag: string }[];
  ageDistribution: { ageRange: string; percentage: number }[];
  genderDistribution: { male: number; female: number };
  deviceDistribution: { mobile: number; tv: number; desktop: number };
}

export interface SponsorshipTier {
  id: string;
  name: string;
  tagline: string;
  priceRwf: string;
  priceUsd: string;
  duration: string;
  features: string[];
  recommendedFor: string;
  popular?: boolean;
}

export interface SponsorInquiry {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  packageId: string;
  targetTimeline: string;
  budgetRange: string;
  message: string;
}

export interface ContactMessage {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  category: 'interview' | 'ad' | 'music_promo' | 'news_tip' | 'general';
  message: string;
}

export interface TeamMember {
  name: string;
  role: string;
  kinyarwandaRole: string;
  bio: string;
  avatar: string;
  socialLink?: string;
}
