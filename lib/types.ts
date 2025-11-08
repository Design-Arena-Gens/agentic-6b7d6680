export type LogLevel = 'info' | 'warn' | 'error';

export interface LogItem { timestamp: string; level: LogLevel; message: string; }

export interface AffiliateConfig {
  amazonTag?: string;
  flipkartId?: string;
  meeshoId?: string;
  fallbackLandingUrl?: string;
}

export interface SocialConfig {
  facebookToken?: string;
  instagramToken?: string;
  pinterestToken?: string;
  youtubeApiKey?: string;
}

export interface Config {
  affiliate: AffiliateConfig;
  social: SocialConfig;
}

export interface ProductCandidate {
  source: 'amazon' | 'flipkart' | 'meesho';
  title: string;
  url: string;
  imageUrl?: string;
  price?: string;
  score: number; // popularity score
}

export interface CreativeAsset {
  type: 'image' | 'video';
  url: string;
  title?: string;
}
