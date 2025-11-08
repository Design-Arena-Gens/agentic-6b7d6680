import { CreativeAsset, ProductCandidate } from '../types';

export async function postToInstagram(product: ProductCandidate, asset: CreativeAsset, link: string, token?: string): Promise<string> {
  if (!token) return 'instagram:skipped:no-token';
  // Placeholder: call Instagram Graph API for media publish
  return 'instagram:posted:' + product.title;
}
