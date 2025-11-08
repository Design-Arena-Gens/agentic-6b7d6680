import { AffiliateConfig, ProductCandidate } from '../types';

export async function findTrendingOnFlipkart(config: AffiliateConfig): Promise<ProductCandidate[]> {
  const candidates: ProductCandidate[] = [
    { source: 'flipkart', title: 'Air Fryer 4L Rapid Heat', url: 'https://www.flipkart.com/item/EXAMPLE', imageUrl: '', price: '?4,499', score: 0.83 },
    { source: 'flipkart', title: 'Gaming Keyboard RGB', url: 'https://www.flipkart.com/item/EXAMPLE2', imageUrl: '', price: '?1,199', score: 0.8 },
  ];
  return candidates.map(c => ({ ...c, url: applyFlipkartAffiliate(c.url, config) }));
}

function applyFlipkartAffiliate(url: string, config: AffiliateConfig): string {
  if (!config.flipkartId) return url;
  const u = new URL(url);
  u.searchParams.set('affid', config.flipkartId);
  return u.toString();
}
