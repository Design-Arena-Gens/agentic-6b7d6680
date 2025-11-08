import { CreativeAsset, ProductCandidate } from '../types';

export async function uploadYoutubeShort(product: ProductCandidate, asset: CreativeAsset, link: string, apiKey?: string): Promise<string> {
  if (!apiKey) return 'youtube:skipped:no-key';
  // Placeholder: use YouTube Data API to upload a short
  return 'youtube:posted:' + product.title;
}
