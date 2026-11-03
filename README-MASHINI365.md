# Mashini365 — CloudCart landing-page files

This package adapts the supplied Mashini365 Version 3 HTML for the same hosted-embed pattern used for the earlier CloudCart landing page.

**This is an addition to an existing CloudCart Nitrogen storefront repository, not a replacement Nitrogen application or a configured Nova deployment.** The storefront repository and its deployment URL were not supplied. Keep that repository's existing package.json, lockfile, server, routes, environment configuration, and `.github/workflows/nova-deploy.yml`. Do not copy the deployment ID or secrets from the Kolichkite project.

## Files to add to the repository

Copy these folders/files into the existing repository root, merging folders:

- `public/mashini365/` — generated loader, standalone test page, and 37 local image/font assets.
- `campaigns/mashini365/` — editable HTML, CSS, fonts, product snapshot, interaction source, asset manifest.
- `scripts/build-mashini365.mjs` and `scripts/check-mashini365.mjs` — dependency-free Node build and checks.
- `.github/workflows/mashini365-check.yml` — validation only; does not deploy.
- `CLOUDCART-EMBED.txt` — snippet to paste into the CloudCart page after deployment.
- This guide and `ACCEPTANCE-CHECKLIST.md`.

The built JavaScript is committed, so the existing storefront build does not need a new dependency or build step to serve it. This assumes the storefront already publishes its `public/` folder, as the previous project did. Confirm that against the actual Mashini365 repository before deployment.

There are fewer than 100 files in this package. When using GitHub's browser uploader, verify the hidden `.github` folder is also uploaded if you want the optional validation workflow. Do not upload the ZIP itself into the repository; extract and upload the contents.

## Deploy and embed

1. Add these files to the repository connected to the intended storefront. Preserve its existing Nova workflow and credentials.
2. Commit and wait for that storefront's deployment workflow to finish. The new `Check Mashini365 landing page` workflow only validates; a green check there does not publish anything.
3. Open `https://YOUR-STOREFRONT.cloudcart.dev/mashini365/index.html` to confirm the page loads. If your host redirects directory URLs, use the full `index.html` path.
4. In `CLOUDCART-EMBED.txt`, replace `YOUR-STOREFRONT.cloudcart.dev` with the exact deployed host. Do not use the old Kolichkite host unless you intentionally choose it as this campaign's host.
5. In the Mashini365 CloudCart HTML/code widget, paste the entire snippet. For a full landing page with its own navigation/footer, use the builder's page settings to hide the store header/footer if desired.
6. Save and publish the CloudCart page. Test its regular mashini365.bg URL outside the admin editor.
7. Complete `ACCEPTANCE-CHECKLIST.md` before using the page for advertising.

The embed has full-width CSS targeted only at builder rows containing this widget. It follows the previous CloudCart wrapper structure. The actual Mashini365 page must be checked because its theme may have different wrappers or clipping styles. No global theme stylesheet is overwritten.

## What is preserved

- Version 3 layout, Bulgarian copy, banner images, embedded fonts and product images.
- 27 products and existing links to mashini365.bg product pages.
- Category filters, sorting, responsive show-more, comparison of up to three products, selection quiz, quantity slider, mobile navigation, FAQ, closing section and footer.
- Product links use the native CloudCart product/checkout flow. No direct cart mutations are added.

Images have been extracted and deduplicated into separate cacheable assets. The original 12.76 MB inline HTML is no longer sent as a single document. The loader is about 174 KB including the original fonts; images load individually. Fonts use unique names to avoid collisions with the host theme.

The campaign is mounted in an open Shadow DOM. Its selectors and interaction queries are scoped to that root. The loader uses a normal external script, avoiding cross-origin HTML fetches and module-CORS requirements. There is no iframe, eval, API token, or runtime request to GitHub. It still requires CloudCart to allow the external script and image origin under its content security policy.

If the script is blocked or fails to download, the widget retains its plain store link. Runtime initialization failures show a store link and retry button. Repeated script includes do not remount an initialized widget.

## Price and stock behavior — important

**This package preserves the supplied static product snapshot. It does not synchronize live prices or stock.** The source page explicitly dates its prices to **21 October 2026**; that notice is retained.

Update `campaigns/mashini365/products.json` and rebuild whenever product prices or offers change. Product links lead to the store where current prices and availability apply. Manually check promotional headlines, discounts, product specifications and shipping/payment claims before publication. For example, the supplied headline says "up to −40%" while some supplied product badges show larger discounts; this was preserved rather than silently rewriting the campaign.

Sorting and calculator recommendations use the prices and nominal throughputs in this snapshot. They do not check inventory or operating duty cycles. The source's calculator explanation and limitations are preserved.

For the live-data behavior used in the earlier Kolichkite project, provide the Mashini365 Nitrogen repository/export and storefront configuration. The product API integration, safe server-side token handling, and stale-data behavior must then be implemented for that store. Do not put a PAT or private API key in this package or in the HTML widget.

## Editing and rebuilding

Requires Node.js 22 or later; no npm install is needed for build/check.

```sh
node scripts/build-mashini365.mjs
node scripts/check-mashini365.mjs
```

Commit both source edits and regenerated `public/mashini365/landing.js`.

- `page.html`: campaign structure and static copy; contains `__M365_ASSET_BASE__` tokens resolved by the loader.
- `page.css`: isolated styling; `:host` supplies the original root variables.
- `products.json`: product snapshot; keep IDs stable because quiz recommendations refer to them.
- `interactions.js`: source interactions scoped to `root`.
- `fonts.css`: original embedded font data, renamed to M365Manrope/M365Oswald.
- `assets.json`: extracted asset sizes, MIME types, and SHA-256 checksums.

When changing existing images, also update references and checksums; content-hashed filenames allow old/new assets to coexist. Do not delete assets still referenced by a previously cached loader immediately after a release. Increment the `?v=1` suffix in the CloudCart snippet when you need to force a loader refresh, then publish the CloudCart page again.

## Tracking

The embed does not install another GTM, Google Analytics, Meta Pixel or consent banner. It runs within the CloudCart page. Existing page tracking can operate there, but page views, consent, product clicks and purchases still require verification. Shadow DOM can prevent generic click-selector triggers from matching inner links.

The host emits `mashini365:ready` after initialization and `mashini365:link` with `{href}` when a campaign link is clicked. These are DOM events only: nothing is automatically pushed to dataLayer or sent to an analytics service. Map them to existing tracking only after checking your consent and event configuration.

## Validation performed

- Node syntax and deterministic build; all 27 product records and recommendation IDs checked.
- 37 extracted assets checked against SHA-256 hashes; anchors and IDs checked.
- Local DOM interaction tests passed: category filters, ascending prices, show-more, three-item comparison limit, comparison dialog/reset, all four quiz categories, quantity calculator, menu toggles and category selection, duplicate loading, and isolation from the outer document.
- No deployment, authenticated CloudCart changes, real-browser visual acceptance, live price/stock verification, checkout test or analytics delivery test has been performed for Mashini365.

## Still needed for a fully connected deployment

Supply the intended storefront's current GitHub repository ZIP and its `.cloudcart.dev` URL. Those identify the correct deploy workflow/target and let the final embed URL be filled in. This package intentionally does not guess a Nova storefront ID or deployment API.
