# Mashini365 — complete GitHub upload package

This package includes the uploaded landing-page assets plus the Nitrogen application and the real CloudCart-generated workflow for storefront **199**. The storefront identifier and deployment protocol come from this repository's `nova/add-deployment-workflow` branch, not from another store.

## Upload

1. Extract the ZIP on your computer.
2. Open `sdimitrov-marketiseme/mashini365_BlackFriday` in GitHub.
3. Choose Add file > Upload files. Upload the extracted contents at the repository root, merging folders and replacing files with the same name. Do not upload the ZIP itself or put everything inside another enclosing folder.
4. Include the `.github` folder. If your file picker hides it, enable hidden files or open `.github/workflows/nova-deploy.yml` separately and create that exact path through GitHub's Add file > Create new file.
5. Commit to `main`. Every push to main deploys this separate storefront once the workflow is present.
6. In Actions, open `Deploy to Nova` and wait for success. The workflow installs the lockfile dependencies, type-checks, builds, tests the built worker and uploads it to Nova.

The existing CloudCart connection supplies `NOVA_DEPLOY_URL` and `NOVA_DEPLOY_TOKEN` through repository variables/secrets. Their values are not included in this package. If the workflow reports missing authorization, verify the CloudCart connection; do not paste tokens into files or the HTML widget.

CloudCart also created a pull request with its workflow. This package already contains that workflow with validation added. You do not need to merge a stale workflow PR over these files; avoid replacing this checked workflow with a second copy after uploading.

## After Actions succeeds

Open:
https://black-fridat-f75da9e11f95b942.cloudcart.dev/

Also verify:
https://black-fridat-f75da9e11f95b942.cloudcart.dev/mashini365/index.html

Then open `CLOUDCART-EMBED.txt` and paste its entire contents into the Mashini365 CloudCart HTML/code widget. Its exact storefront URL is already filled in. Save and publish that CloudCart page.

This does not replace mashini365.bg's storefront theme. The custom page is embedded only where you paste the snippet. The standalone .cloudcart.dev page is marked noindex; configure the actual CloudCart landing-page title/description in CloudCart.

The full-width snippet follows the builder wrapper structure used by the earlier project. Confirm width on the actual published Mashini365 page and hide CloudCart's default page header/footer through the builder if you want only the campaign's own navigation/footer.

## What works

The original Bulgarian design, local images/fonts, 27 products, filters, sorting, responsive show-more, comparison of up to three products, selection quiz, quantity calculator, mobile navigation, FAQ and footer are preserved.

The embed uses an isolated Shadow DOM. Fonts have unique names. Product links go to mashini365.bg product pages, where native variants, cart and checkout handle the purchase. The hosting app itself has no cart, user session, product API token or live stock integration.

## Prices and inventory

This is the supplied **21 October 2026 product snapshot**, not live pricing. The date notice is retained. Review prices, discounts, specifications and shipping/payment claims before publishing. The original promotional headline says up to 40% off although some supplied badges show larger discounts; review that campaign copy as well.

Live API pricing can be added separately. It is not required to deploy the current static campaign and no API keys are requested by this implementation.

## Local development

Node 22.12+ is required. Dependencies are locked in package-lock.json.

```sh
npm ci
npm run dev
```

To validate and build:

```sh
npm run typecheck
npm run build
npm run test:build
npm run preview
```

`app/` and `server.ts` provide a read-only React Router worker using the official Nitrogen Vite plugin and preset. `build/server/index.js` is the self-contained worker; `build/client/` contains the assets expected by Nova. The host platform serves the static assets. No application environment variables are required for this snapshot version.

## Updating the campaign

Edit the files in `campaigns/mashini365/`, then run `npm run build`. Commit the source changes and the regenerated `public/mashini365/landing.js`. Keep product IDs stable because quiz recommendations reference them. Updating image files also requires updating their references and checksums in assets.json.

The workflow rebuilds the bundle before publishing. Increase the `?v=1` suffix in the CloudCart widget and republish the page when you need to force browsers to fetch an updated loader. Keep older hashed image assets while browsers might still have an older script cached.

## Tracking and verification

No new analytics pixels or GTM containers are installed. Existing CloudCart page tracking needs to be verified with consent enabled. Shadow DOM click matching may require explicit instrumentation. The embed emits `mashini365:ready` and `mashini365:link` DOM events, but these are not automatically sent to dataLayer or an analytics provider.

Local production build and worker tests are run before packaging. Deployment, public desktop/mobile rendering, checkout and analytics delivery still require checks in your actual storefront; see ACCEPTANCE-CHECKLIST.md.

No changes have been pushed to GitHub by the assistant. Uploading this package to main is the step that starts the first deployment.
