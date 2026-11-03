# Mashini365 acceptance checks

After deploying to the intended CloudCart storefront:

- Open `/mashini365/index.html`; confirm fonts, images and product cards load.
- Open the published mashini365.bg landing-page URL in a logged-out/private window.
- Check the entire page at desktop, tablet, and mobile widths; no clipped content or horizontal scrolling. Check whether the existing store call/chat widget overlaps the mobile dock.
- Check width and outer page spacing. The supplied snippet only recognizes the previous CloudCart builder wrapper structure.
- Open and close the menu, use a category link, and verify the correct filtered catalog appears.
- Try every category, each sorting option and Show more.
- Select two/three products, compare them, try selecting a fourth, close/reset the comparison.
- Try every quiz category and both grinder answers / all filler answers.
- Drag the quantity slider from 5 to 100 kg; verify its estimate and product link.
- Test FAQ toggles, telephone/email links and footer destinations.
- Verify product links and current store prices; this deliverable uses a static 21 October 2026 price snapshot, not live API data.
- Confirm all promotional claims, shipping/payment text and product specifications before publishing.
- Check the normal product/variant/cart/checkout flow separately.
- Check page views, consent behavior and conversion tracking in your existing analytics tools. Custom DOM link events are not automatically analytics events.
- Simulate blocking the loader: a working mashini365.bg fallback link should remain.
- Keep a known working commit for rollback. No monitoring or automatic rollback is installed.
