Elite Energy beverage brand site - navy/gold/cream design system

## Brand Colors (HSL)
- Navy: 220 56% 18% (--primary, --navy)
- Gold: 43 85% 55% (--accent, --gold)
- Cream: 40 33% 98% (--background)

## Fonts
- Display: Playfair Display (serif)
- Body: Inter (sans-serif)

## Design Philosophy
- **MOBILE FIRST** — all styling starts at mobile, scales up with lg: breakpoints
- Most visitors are mobile — always prioritize mobile UX
- Use lg: prefix for desktop overrides, not md: for mobile overrides

## Pages
- / (Home), /product/:handle, /science, /our-story, /faq, /shop

## Key decisions
- 3 flavors: Lychee Pomegranate, Blood Orange Yuzu, Crisp Apple Pear
- Sub & Save 15% on 24/48 packs, free shipping $100+
- Trust badges: 30-day money back, fast shipping, sub&save, made in USA
- CRO: Subscribe toggle default on product pages
- Product images are actual can renders in src/assets/
- Flavor switching on product page uses internal state (no page reload, no scroll reset)
- Color wave wipe animation on flavor change
- Flavor-colored aura glow behind cans (no box background)
- Product names displayed uppercase, stripped of "Elite Energy" prefix
- Gold uses metallic multi-stop gradient with glow shadow
