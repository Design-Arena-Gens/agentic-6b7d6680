import { AffiliateConfig, ProductCandidate } from '../types';

export async function findTrendingOnAmazon(config: AffiliateConfig): Promise<ProductCandidate[]> {
  // Placeholder heuristic results
  const candidates: ProductCandidate[] = [
    { source: 'amazon', title: 'Wireless Earbuds Pro ANC', url: 'https://www.amazon.in/dp/B0EXAMPLE', imageUrl: '', price: '?2,999', score: 0.91 },
    { source: 'amazon', title: 'Smart Watch AMOLED 1.75"', url: 'https://www.amazon.in/dp/B0EXAMPLE2', imageUrl: '', price: '?3,499', score: 0.87 },
  ];
  return candidates.map(c => ({ ...c, url: applyAmazonAffiliate(c.url, config) }));
}

function applyAmazonAffiliate(url: string, config: AffiliateConfig): string {
  if (!config.amazonTag) return url;
  const u = new URL(url);
  u.searchParams.set('tag', config.amazonTag);
  return u.toString();
}
