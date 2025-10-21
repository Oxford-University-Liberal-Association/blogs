# Cloudflare Web Analytics Setup Guide

This blog now includes support for Cloudflare Web Analytics - a privacy-friendly, non-intrusive analytics solution that respects user privacy.

## Features

- **Privacy-focused**: No cookies, respects Do Not Track
- **Lightweight**: Minimal impact on page load times
- **Non-intrusive**: Compliant with GDPR and other privacy regulations
- **Free**: Cloudflare Web Analytics is free to use

## Setup Instructions

### 1. Get Your Cloudflare Analytics Token

1. Sign up for a free Cloudflare account at https://cloudflare.com if you don't have one
2. Navigate to the Web Analytics dashboard: https://dash.cloudflare.com/?to=/:account/analytics/web-analytics
3. Click "Add a site" and enter your blog domain: `blog.oxuniliberals.com`
4. Cloudflare will generate a unique token for your site
5. Copy the token (it will look something like: `abc123def456ghi789`)

### 2. Configure Your Blog

1. Open the `hugo.toml` file in the root of your blog repository
2. Find the line: `cloudflareAnalyticsToken = ""`
3. Paste your token between the quotes: `cloudflareAnalyticsToken = "abc123def456ghi789"`
4. Save the file

### 3. Deploy

The analytics script will automatically be included on all pages once you:

1. Commit your changes to git
2. Push to your repository
3. Netlify will automatically rebuild and deploy your site

### 4. View Analytics

Once deployed, you can view analytics at:
https://dash.cloudflare.com/?to=/:account/analytics/web-analytics

You'll see:
- Page views
- Unique visitors
- Popular pages
- Referrer information
- Device and browser statistics
- Geographic data

## Implementation Details

- **Location**: The tracking script is added in `/home/user/blogs/layouts/partials/head_custom.html:5`
- **Configuration**: Set in `/home/user/blogs/hugo.toml:13`
- **Conditional loading**: The script only loads if a token is configured
- **Script type**: Uses `defer` attribute for optimal performance

## Privacy Compliance

Cloudflare Web Analytics is designed to be privacy-compliant:
- No personal data is collected
- No cookies are used
- Respects browser Do Not Track settings
- GDPR compliant
- No consent banner required

## Troubleshooting

If analytics aren't showing up:

1. Verify your token is correct in `hugo.toml`
2. Check that the site has been rebuilt and deployed after adding the token
3. Wait 10-15 minutes for data to appear in the Cloudflare dashboard
4. Verify the script is loading by viewing page source and searching for "cloudflareinsights"

## Removing Analytics

To disable analytics, simply remove the token from `hugo.toml`:

```toml
cloudflareAnalyticsToken = ""
```

Then commit and deploy. The script will no longer be included on pages.
