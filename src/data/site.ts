/**
 * Single source of truth for business facts.
 * Anything wrapped in [BRACKETS] is a placeholder the owner still needs to supply.
 */
export const SITE = {
  name: 'Crystals World',
  short: 'Crystals World',
  tagline: 'Crystal shop, Austin, Texas',
  street: '3202 Guadalupe St Ste C',
  city: 'Austin, TX 78705',
  phone: '(737) 320-8079',
  tel: 'tel:+17373208079',
  email: '[CONTACT EMAIL]',
  ownerStory: '[OWNER STORY — a few honest sentences from the owner about why the shop exists]',
  // From the shop's Linktree
  instagram: 'https://www.instagram.com/crystals_world01/',
  tiktok: 'https://www.tiktok.com/@crystals_world01',
  facebook: 'https://www.facebook.com/share/19NQg3GGVh/',
  linktree: 'https://linktr.ee/Crystalsworld001',
  yelp: 'https://www.yelp.com/search?find_desc=Crystals+World&find_loc=Austin%2C+TX', // [YELP PAGE URL] once confirmed
  directions: 'https://www.google.com/maps/dir/?api=1&destination=Crystals+World%2C+3202+Guadalupe+St+Ste+C%2C+Austin%2C+TX+78705',
  mapEmbed: 'https://www.google.com/maps?q=Crystals+World+3202+Guadalupe+St+Ste+C+Austin+TX+78705&output=embed',
  googleProfile: 'https://www.google.com/maps/search/?api=1&query=Crystals+World+3202+Guadalupe+St+Ste+C+Austin+TX+78705',
  parking: '[PARKING INFO — where customers should park, any validation or time limits]',
  accessibility: '[ACCESSIBILITY INFO — step-free entrance? aisle width? accessible restroom?]',
  shippingRates: '[SHIPPING RATES — flat rate / weight bands / free-shipping threshold]',
  // Demo estimates used only so the cart has numbers. Replace with real values (or let Shopify do it).
  demo: { shipping: 12, giftWrap: 5, freeShippingOver: 150 },
}

/**
 * Opening hours. 0 = Sunday … 6 = Saturday. [open, close] in 24h "HH:MM", or null when closed.
 * SAMPLE VALUES: the only confirmed fact is a 10 PM closing time from the shop's Google listing.
 * Replace with the real schedule; the "Open now" badge updates automatically.
 */
export const HOURS_ARE_SAMPLE = true
export const HOURS: Record<number, [string, string] | null> = {
  0: ['11:00', '22:00'], 1: ['11:00', '22:00'], 2: ['11:00', '22:00'], 3: ['11:00', '22:00'],
  4: ['11:00', '22:00'], 5: ['11:00', '22:00'], 6: ['11:00', '22:00'],
}
