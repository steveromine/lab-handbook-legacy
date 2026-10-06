# Prebuilt legacy site

`lab-handbook-legacy-site.tar.gz` is the **finished, frozen static site** - the exact
output of `node site/build.mjs` at retirement (2026-10-06).

Upload the **contents** of this archive to Cloudflare Pages (Create -> Pages -> Upload
assets). Do **not** upload the archive itself, and do not upload the `dist` folder as a
wrapper: `index.html` must sit at the root of what you upload.

## Rebuild from source (not required)

    SITE_URL=https://lab.steveromine.com node site/build.mjs

Output lands in `site/dist/` (gitignored). The site is frozen - no rebuild is expected.
