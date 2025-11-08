import { CreativeAsset, ProductCandidate } from '../types';

export async function postToFacebook(product: ProductCandidate, asset: CreativeAsset, link: string, token?: string): Promise<string> {
  if (!token) return 'facebook:skipped:no-token';
  // Placeholder: call Facebook Graph API to create a post
  return 'facebook:posted:' + product.title;
}
