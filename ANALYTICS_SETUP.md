# OSLA Blog - Search & Analytics Setup Guide

This guide explains how to use the blog's search functionality and set up simple, privacy-friendly analytics.

## Features

### 1. Search Functionality ✅
- **Client-side search** using Lunr.js
- Search box in the navigation bar (magnifying glass icon)
- Full-text search across all blog posts
- Search by title, content, tags, and categories
- Real-time search results
- **No configuration needed** - works out of the box!

### 2. Analytics Tracking
- **Cloudflare Web Analytics** - Simple, privacy-friendly, cookie-free analytics
- **Local browser tracking** - Personal analytics dashboard showing your own browsing history

## How to Use Search

1. Look for the search icon (🔍) in the top-right navigation bar
2. Click the icon or the search box
3. Type your search query
4. Press Enter or click search
5. View results with snippets and links

**That's it!** Search is already working.

## Setting Up Analytics

### Option 1: Cloudflare Web Analytics (Recommended)

Cloudflare Web Analytics is completely free, privacy-friendly, and doesn't use cookies.

**Benefits:**
- No cookies or tracking of personal data
- GDPR compliant out of the box
- Lightweight (< 10KB script)
- Real-time visitor stats
- No impact on site performance
- Free forever

**Setup Steps:**

1. **Create a Cloudflare Web Analytics site:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to Web Analytics (in the left sidebar)
   - Click "Add a site"
   - Enter your site URL: `https://blog.oxuniliberals.com`
   - Click "Add site"

2. **Get your Analytics Token:**
   - After adding the site, you'll see a JavaScript snippet
   - Copy the token from the snippet (it looks like: `abc123def456...`)

3. **Add the token to your Hugo config:**
   - Open `hugo.toml`
   - Find line 15: `cloudflareAnalyticsToken = "YOUR_CLOUDFLARE_TOKEN_HERE"`
   - Replace `YOUR_CLOUDFLARE_TOKEN_HERE` with your actual token
   - Save the file

4. **Deploy your site:**
   - Commit and push your changes
   - Netlify will automatically rebuild and deploy

5. **View your analytics:**
   - Go to [Cloudflare Dashboard → Web Analytics](https://dash.cloudflare.com/)
   - Select your site
   - View visitor stats, page views, popular pages, etc.

**That's it!** Analytics will start tracking within minutes.

### Option 2: Local Analytics Dashboard

The blog includes a simple local analytics dashboard at `/analytics` that shows:
- Your most viewed pages (from your browser)
- Your recent search queries
- Personal browsing statistics

**How it works:**
- Stores data in your browser's localStorage only
- No data is sent anywhere
- Only tracks your own activity
- Completely private

**To view:**
1. Visit `https://blog.oxuniliberals.com/analytics`
2. Browse some blog posts
3. Perform some searches
4. Return to the dashboard to see your activity

## What Gets Tracked?

### Cloudflare Web Analytics Tracks:
- Page views (anonymous)
- Unique visitors (anonymous)
- Popular pages
- Referrers (where visitors come from)
- Countries/regions
- Browsers and devices
- **No personal data** - completely anonymous

### Local Analytics Tracks:
- Pages you've viewed (in your browser only)
- Searches you've performed (in your browser only)
- Your visit timestamps (in your browser only)

## Privacy

### Cloudflare Web Analytics:
- ✅ No cookies
- ✅ No cross-site tracking
- ✅ No personal data collection
- ✅ GDPR compliant
- ✅ No consent banner needed

### Local Analytics:
- ✅ Stays in your browser only
- ✅ Not sent to any server
- ✅ Can be cleared anytime
- ✅ Completely private

## Troubleshooting

### Search not working?
1. **Check if the search box appears** in the navigation bar
2. **Clear your browser cache** and reload
3. **Try a simple query** like "liberal" or "oxford"
4. **Check browser console** for any JavaScript errors (F12 → Console tab)

If search still doesn't work:
- Ensure `lunrSearch = true` is set in `hugo.toml`
- Verify the site has been rebuilt (check Netlify deploy logs)
- Check that `index.json` exists at `/index.json` on your site

### Analytics not showing data?
1. **For Cloudflare Analytics:**
   - Wait 5-10 minutes for data to appear
   - Check that your token is correct in `hugo.toml`
   - Verify the Cloudflare script is loading (View Page Source → search for "cloudflareinsights")
   - Visit your site in an incognito window to generate a visit

2. **For Local Analytics:**
   - Browse a few pages first
   - Visit `/analytics` to see the dashboard
   - Check browser console for errors
   - Ensure JavaScript is enabled

## Configuration Files

### hugo.toml
```toml
[params]
  lunrSearch = true  # Enable search
  cloudflareAnalyticsToken = "YOUR_TOKEN_HERE"  # Add your Cloudflare token
```

### netlify.toml
No special configuration needed - standard Hugo build.

## Files in This Implementation

- `static/js/analytics.js` - Local analytics tracking (non-intrusive)
- `layouts/partials/head_custom.html` - Loads Cloudflare Analytics
- `content/analytics.md` - Analytics dashboard page
- `hugo.toml` - Configuration
- This file - Setup guide

## Support

### Cloudflare Web Analytics
- [Cloudflare Web Analytics Docs](https://developers.cloudflare.com/analytics/web-analytics/)
- [Cloudflare Dashboard](https://dash.cloudflare.com/)

### Hugo Search
- [Hugo Documentation](https://gohugo.io/documentation/)
- [Lunr.js Documentation](https://lunrjs.com/)

## Next Steps

1. ✅ Use search - it already works!
2. ⏳ Set up Cloudflare Web Analytics (5 minutes)
3. ⏳ Add your token to `hugo.toml`
4. ⏳ Deploy and start tracking

That's all you need! Keep it simple.
