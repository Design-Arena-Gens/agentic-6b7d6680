import { getConfig, pushLog } from './store';
import { ProductCandidate } from './types';
import { findTrendingOnAmazon } from './vendors/amazon';
import { findTrendingOnFlipkart } from './vendors/flipkart';
import { findTrendingOnMeesho } from './vendors/meesho';
import { fetchViralCreativeFor } from './vendors/pinterest';
import { postToFacebook } from './vendors/facebook';
import { postToInstagram } from './vendors/instagram';
import { uploadYoutubeShort } from './vendors/youtube';

function pickTopProducts(list: ProductCandidate[], limit = 3): ProductCandidate[] {
  return [...list].sort((a, b) => b.score - a.score).slice(0, limit);
}

function buildCaption(product: ProductCandidate, link: string): string {
  return `${product.title} ? Best Offer!\n\nGet it here: ${link}\n\n#Deals #Viral #Trending`;
}

export async function runAgentOnce(): Promise<{ posted: number; considered: number; }> {
  const config = getConfig();
  pushLog('info', 'Agent started');

  // Research phase
  const [az, fk, ms] = await Promise.all([
    findTrendingOnAmazon(config.affiliate),
    findTrendingOnFlipkart(config.affiliate),
    findTrendingOnMeesho(config.affiliate),
  ]);
  const researched = [...az, ...fk, ...ms];
  pushLog('info', `Researched ${researched.length} candidates`);

  const selected = pickTopProducts(researched, 3);
  pushLog('info', `Selected top ${selected.length} products`);

  let posted = 0;
  for (const product of selected) {
    const landing = product.url || config.affiliate.fallbackLandingUrl || '';
    const assets = await fetchViralCreativeFor(product, config.social.pinterestToken);
    const asset = assets[0];

    const caption = buildCaption(product, landing);
    pushLog('info', `Prepared creative for ${product.title}`);

    const results = await Promise.all([
      postToFacebook(product, asset, caption, config.social.facebookToken),
      postToInstagram(product, asset, caption, config.social.instagramToken),
      uploadYoutubeShort(product, asset, caption, config.social.youtubeApiKey),
    ]);

    results.forEach(r => pushLog('info', r));
    posted += results.filter(r => r.includes(':posted:')).length;
  }

  pushLog('info', `Agent finished. Posted=${posted}`);
  return { posted, considered: researched.length };
}
