# Crystals World — online shop (concept build)

A playful, Austin-flavored storefront for **Crystals World**, 3202 Guadalupe St Ste C, Austin TX 78705.
Vite · React · TypeScript · Tailwind CSS v4 · React Router.

> **This is a front-end demo.** Prices, stock counts, dimensions, weights, origins, hours and events are
> **samples or `[PLACEHOLDERS]`**. The cart works, but checkout is a stub: it takes no payment and
> sends no data anywhere. Anything in `[BRACKETS]` still needs a real answer from the owner.

## Run it
```
npm install
npm run dev
```

## Where things live
| To change… | Edit |
|---|---|
| Address, phone, links, parking/accessibility text, shipping-rate text | `src/data/site.ts` |
| **Opening hours** (drives the "Open now / Closed" badge, in Austin time) | `HOURS` in `src/data/site.ts` |
| Products, prices, stock, sold status, new arrivals | `src/data/products.ts` |
| Events & workshops | `EVENTS` in `src/pages/Events.tsx` |
| Quiz questions | `QUESTIONS` in `src/pages/Quiz.tsx` |
| Product photos | `public/images/` |
| Fun copy (button labels, 404, empty states) | in the page files, plain sentences |

**Sold pieces:** set `stock: 0` and `sold: true`. They stay visible, greyed, at the end of the list.
**New arrivals:** `isNew: true` puts a piece in the homepage strip.
**One-of-a-kind:** `oneOfAKind: true` caps the cart at 1 and shows "Only 1 in stock".

## Going live: recommended platform
**Shopify (Basic plan) with this design as the storefront theme, or via Shopify's Storefront API.**
Why it fits a small crystal shop:
- **Inventory is a spreadsheet-style admin.** A one-of-a-kind piece sells and stock drops to 0. No code.
- **Syncs with in-store sales** through Shopify POS, so a piece sold at the counter can't also sell online.
- Built-in **local pickup**, **gift cards**, **gift notes**, shipping rates, tax, and hosted, PCI-compliant checkout.
- Product photos, prices and "sold" status all live in one place the owner can use from a phone.

Cheaper alternative: **Square Online** (free tier) if the shop already uses a Square register. Stripe/Snipcart
work too but leave inventory and shipping rates for you to build.

To connect: in Shopify create products with these fields (name, photos, price, stock, tags = type/color/intention,
metafields for origin/hardness/dimensions/weight), then swap the `PRODUCTS` array for a Storefront API fetch.

## SEO
LocalBusiness data is in `index.html`; each product page injects Product schema (see `src/pages/Product.tsx`).
For real search ranking, host with real URLs (switch `HashRouter` → `BrowserRouter` in `src/main.tsx`, set
`base: '/'` in `vite.config.ts`) and remove the `noindex` meta in `index.html`.

## Deploy the demo
`./deploy.sh` builds and publishes to the `gh-pages` branch (GitHub Pages).

## Photos
The catalog uses the shop's own photos (some supplied files are small thumbnails, flagged `lowRes` so they aren't
blown up). Send the original full-size photos and drop them into `public/images/` with the same names.
