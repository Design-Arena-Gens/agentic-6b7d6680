import { AffiliateConfig, ProductCandidate } from '../types';

export async function findTrendingOnMeesho(config: AffiliateConfig): Promise<ProductCandidate[]> {
  const candidates: ProductCandidate[] = [
    { source: 'meesho', title: 'Trendy Kurti Set', url: 'https://www.meesho.com/item/EXAMPLE', imageUrl: '', price: '?699', score: 0.79 },
    { source: 'meesho', title: 'Portable Juicer', url: 'https://www.meesho.com/item/EXAMPLE2', imageUrl: '', price: '?1,099', score: 0.76 },
  ];
  return candidates.map(c => ({ ...c, url: applyMeeshoAffiliate(c.url, config) }));
}

function applyMeeshoAffiliate(url: string, config: AffiliateConfig): string {
  if (!config.meeshoId) return url;
  const u = new URL(url);
  u.searchParams.set('utm_source', 'affiliate');
  u.searchParams.set('utm_medium', config.meeshoId);
  return u.toString();
}
