/**
 * The catalog. One entry per piece. To add or update stock: edit this file (or, after launch,
 * manage the same fields in Shopify — see README). Photos live in public/images.
 *
 * DEMO NOTE: prices, stock, dimensions, weights and origins below are SAMPLES or [TBC] placeholders.
 * Only the photos, mineral names and general mineral facts (e.g. Mohs hardness ranges) are real.
 */
export type Intention = 'grounding' | 'calm' | 'focus' | 'love' | 'protection' | 'confidence'
export type Kind = 'Heart' | 'Cluster' | 'Freeform' | 'Jewelry' | 'Home'

export interface Product {
  slug: string
  name: string
  fun: string                 // the one-line joke on the field card
  kind: Kind
  mineral: string
  group: string               // mineral group
  colors: string[]
  images: string[]            // first = main
  imageAlt: string
  price: number               // SAMPLE
  stock: number               // SAMPLE. 0 + sold=true keeps it visible as "sold"
  sold?: boolean
  oneOfAKind: boolean
  intentions: Intention[]
  chakra: string
  zodiac: string[]
  size: 'Small' | 'Medium' | 'Large'
  dims: string                // [TBC] until measured
  weight: string              // [TBC]
  origin: string              // [TBC]
  hardness: string            // Mohs, general range for the mineral
  composition: string
  facts: string[]             // mineral facts (science)
  tradition: string           // belief & folklore, kept separate on purpose
  lowRes?: boolean            // source photo is a small thumbnail; pages cap its display size until a bigger one is supplied
  added: string               // ISO date; drives "New arrivals"
  isNew?: boolean
}

const TBC = '[TBC]'

export const PRODUCTS: Product[] = [
  {
    slug: 'amethyst-druzy-heart-on-stand',
    lowRes: true,
    name: 'Amethyst Druzy Heart',
    fun: 'Has never once been left on read.',
    kind: 'Heart', mineral: 'Amethyst', group: 'Quartz', colors: ['Purple'],
    images: ['images/amethyst-heart.jpg', 'images/amethyst-heart-instore.jpg'],
    imageAlt: 'A heart-shaped slab of purple amethyst druzy on a black metal stand, in front of a woven basket and green plants',
    price: 185, stock: 1, oneOfAKind: true, intentions: ['calm', 'love'],
    chakra: 'Crown', zodiac: ['Pisces', 'Aquarius'], size: 'Medium',
    dims: TBC, weight: TBC, origin: TBC, hardness: '7', composition: 'Silicon dioxide (SiO₂), colored by trace iron',
    facts: ['A purple variety of quartz.', 'The sparkle is druzy: a layer of tiny crystals that grew inside a cavity.', 'Hardness 7 on the Mohs scale — tougher than a steel knife.'],
    tradition: 'In folklore amethyst is linked with calm and clear-headedness, and the name comes from a Greek word about not being intoxicated. That is tradition, not science.',
    added: '2026-09-20', isNew: true,
  },
  {
    slug: 'amethyst-cluster-on-tripod-stand',
    lowRes: true,
    name: 'Amethyst Cluster on Tripod',
    fun: 'A tiny purple mountain range for your desk.',
    kind: 'Cluster', mineral: 'Amethyst', group: 'Quartz', colors: ['Purple'],
    images: ['images/amethyst-cluster.jpg'],
    imageAlt: 'A cluster of deep purple amethyst crystals held on a black three-legged stand over a woven basket',
    price: 95, stock: 1, oneOfAKind: true, intentions: ['calm', 'focus'],
    chakra: 'Third eye', zodiac: ['Virgo', 'Pisces'], size: 'Small',
    dims: TBC, weight: TBC, origin: TBC, hardness: '7', composition: 'Silicon dioxide (SiO₂)',
    facts: ['Points grow outward from a rocky base, called the matrix.', 'Color deepens where more iron was present as the crystal grew.'],
    tradition: 'Some people keep amethyst on a desk as a reminder to slow down. It is a lovely habit, not a medical treatment.',
    added: '2026-09-18', isNew: true,
  },
  {
    slug: 'amethyst-druzy-slab-on-stand',
    lowRes: true,
    name: 'Amethyst Druzy Diamond',
    fun: 'Big “this is my whole personality now” energy.',
    kind: 'Freeform', mineral: 'Amethyst', group: 'Quartz', colors: ['Purple'],
    images: ['images/amethyst-diamond.jpg'],
    imageAlt: 'A diamond-shaped slab of amethyst druzy on a black round stand, next to a small dark mineral tree',
    price: 240, stock: 1, oneOfAKind: true, intentions: ['calm', 'confidence'],
    chakra: 'Crown', zodiac: ['Pisces', 'Aquarius'], size: 'Large',
    dims: TBC, weight: TBC, origin: TBC, hardness: '7', composition: 'Silicon dioxide (SiO₂)',
    facts: ['A cut and polished edge frames the natural crystal surface.', 'Displayed on a stand so the druzy catches light from every angle.'],
    tradition: 'Amethyst is a February birthstone in the modern list. Birthstones are a tradition, not a rule.',
    added: '2026-09-12',
  },
  {
    slug: 'lapis-lazuli-heart-on-ring-stand',
    lowRes: true,
    name: 'Lapis Lazuli Heart',
    fun: 'Deep blue, gold veins, zero chill about it.',
    kind: 'Heart', mineral: 'Lapis lazuli', group: 'Rock (lazurite, calcite, pyrite)', colors: ['Blue'],
    images: ['images/lapis-heart.jpg'],
    imageAlt: 'A carved heart of deep blue lapis lazuli with white and gold veining, on a gold ring stand',
    price: 120, stock: 1, oneOfAKind: true, intentions: ['confidence', 'focus', 'love'],
    chakra: 'Throat / third eye', zodiac: ['Sagittarius', 'Libra'], size: 'Small',
    dims: TBC, weight: TBC, origin: TBC, hardness: '5–5.5', composition: 'A rock: mainly lazurite, with calcite and specks of pyrite',
    facts: ['Lapis is a rock, not a single mineral.', 'The gold flecks are pyrite; the white swirls are calcite.', 'Prized as a pigment for centuries: ground lapis became ultramarine blue.'],
    tradition: 'Lapis has long been associated with wisdom and honest speech in many cultures. That is symbolism, not science.',
    added: '2026-09-22', isNew: true,
  },
  {
    slug: 'lapis-lazuli-freeform-on-stand',
    lowRes: true,
    name: 'Lapis Lazuli Freeform',
    fun: 'Looks like a night sky. Costs way less than a telescope.',
    kind: 'Freeform', mineral: 'Lapis lazuli', group: 'Rock (lazurite, calcite, pyrite)', colors: ['Blue'],
    images: ['images/lapis-freeform.jpg'],
    imageAlt: 'A tall polished freeform slab of deep blue lapis lazuli with gold veins, standing in a wooden holder next to a succulent',
    price: 165, stock: 1, oneOfAKind: true, intentions: ['focus', 'confidence'],
    chakra: 'Third eye', zodiac: ['Sagittarius'], size: 'Medium',
    dims: TBC, weight: TBC, origin: TBC, hardness: '5–5.5', composition: 'A rock: mainly lazurite, with calcite and pyrite',
    facts: ['Polished flat so the color is even and the pyrite catches light.', 'Softer than quartz, so keep it away from sand and keys.'],
    tradition: 'Often chosen as a “focus” stone for desks and study spaces. Belief, not medicine.',
    added: '2026-09-10',
  },
  {
    slug: 'lapis-lazuli-bead-necklace',
    lowRes: true,
    name: 'Lapis Lazuli Bead Necklace',
    fun: 'Goes with literally everything. We checked.',
    kind: 'Jewelry', mineral: 'Lapis lazuli', group: 'Rock (lazurite, calcite, pyrite)', colors: ['Blue'],
    images: ['images/lapis-necklace.jpg'],
    imageAlt: 'A necklace of faceted deep blue lapis lazuli beads on a cream display bust',
    price: 68, stock: 3, oneOfAKind: false, intentions: ['confidence', 'love'],
    chakra: 'Throat', zodiac: ['Sagittarius', 'Libra'], size: 'Small',
    dims: 'Length [TBC]', weight: TBC, origin: TBC, hardness: '5–5.5', composition: 'A rock: mainly lazurite, with calcite and pyrite',
    facts: ['Beads are cut and drilled from rough lapis.', 'Store away from perfume and water; lapis can dull over time.'],
    tradition: 'Lapis jewelry is worn for meaning and style. Wear it because you love it.',
    added: '2026-09-15',
  },
  {
    slug: 'banded-stone-vase',
    lowRes: true,
    name: 'Banded Stone Vase',
    fun: 'A vase that looks like a slice of weather.',
    kind: 'Home', mineral: '[MATERIAL — confirm with owner]', group: TBC, colors: ['Blue', 'White', 'Brown'],
    images: ['images/banded-vase.jpg'],
    imageAlt: 'A tall carved vase of banded translucent stone in white, gray-blue and amber, standing on a round wooden base',
    price: 110, stock: 1, oneOfAKind: true, intentions: ['grounding', 'calm'],
    chakra: TBC, zodiac: [], size: 'Large',
    dims: TBC, weight: TBC, origin: TBC, hardness: TBC, composition: TBC,
    facts: ['Carved from a single block of banded stone, then polished.', 'Each vase has its own pattern, so no two match.'],
    tradition: 'Nothing here but a beautiful object. Sometimes a vase is just a vase.',
    added: '2026-09-08',
  },
  {
    slug: 'citrine-druzy-heart-on-chain-stand',
    name: 'Citrine Druzy Heart',
    fun: 'Like a sunset you can put next to your coffee maker.',
    kind: 'Heart', mineral: 'Citrine', group: 'Quartz', colors: ['Orange', 'Yellow'],
    images: ['images/citrine-heart.jpg'],
    imageAlt: 'A heart of golden-orange citrine druzy held on a gold chain-link stand in front of a white planter',
    price: 175, stock: 1, oneOfAKind: true, intentions: ['confidence', 'love'],
    chakra: 'Solar plexus', zodiac: ['Gemini', 'Leo'], size: 'Medium',
    dims: TBC, weight: TBC, origin: TBC, hardness: '7', composition: 'Silicon dioxide (SiO₂), colored by iron',
    facts: ['Citrine is quartz colored yellow to orange by iron.', 'Much commercial citrine is produced by heating amethyst; ask us about this piece if you are curious.'],
    tradition: 'Citrine is called the “merchant’s stone” in folklore, tied to abundance. Enjoy the story; it will not change your bank balance.',
    added: '2026-09-21', isNew: true,
  },
  {
    slug: 'citrine-cluster-on-basket-stand',
    name: 'Citrine Cluster on Stand',
    fun: 'Honey-colored, extremely photogenic, knows it.',
    kind: 'Cluster', mineral: 'Citrine', group: 'Quartz', colors: ['Orange', 'Yellow'],
    images: ['images/citrine-cluster.jpg', 'images/citrine-lineup.jpg'],
    imageAlt: 'A large honey-orange citrine cluster on a gold stand, seen in front of glass display shelves',
    price: 210, stock: 0, sold: true, oneOfAKind: true, intentions: ['confidence', 'focus'],
    chakra: 'Solar plexus', zodiac: ['Gemini', 'Leo'], size: 'Large',
    dims: TBC, weight: TBC, origin: TBC, hardness: '7', composition: 'Silicon dioxide (SiO₂), colored by iron',
    facts: ['Cluster points grow from a shared base.', 'Warm color comes from iron inside the quartz.'],
    tradition: 'Often chosen for sunny, optimistic spaces. A lovely thing to look at.',
    added: '2026-08-30',
  },
]

export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug)
export const INTENTIONS: { id: Intention; label: string; blurb: string }[] = [
  { id: 'grounding', label: 'Grounding', blurb: 'For when you need both feet on the floor.' },
  { id: 'calm', label: 'Calm', blurb: 'Turn the volume down on the day.' },
  { id: 'focus', label: 'Focus', blurb: 'Desk-friendly. Tab-closing energy.' },
  { id: 'love', label: 'Love', blurb: 'For hearts, gifts, and big feelings.' },
  { id: 'protection', label: 'Protection', blurb: 'Bouncer-at-the-door vibes.' },
  { id: 'confidence', label: 'Confidence', blurb: 'Walk in like you own the place.' },
]
