# OSLA Blog - Analytics Setup Guide

This guide explains how to set up and use the blog analytics features, including search functionality and view tracking.

## Features Implemented

### 1. Search Functionality
- **Client-side search** using Lunr.js
- Search box in the navigation bar
- Full-text search across all blog posts
- Search by title, content, tags, and categories
- Real-time search results display

### 2. Analytics Tracking
- **Google Analytics 4** integration for comprehensive analytics
- **Enhanced event tracking** including:
  - Page views with metadata (author, publish date)
  - Search queries and result counts
  - Reading progress (25%, 50%, 75%, 100%)
  - Time on page
  - Outbound link clicks
  - Local browser-based analytics storage

### 3. Analytics Dashboard
- Access at: `/analytics`
- Displays local browsing statistics
- Shows most viewed pages (from your browser)
- Recent search queries
- Quick stats overview
- Link to Google Analytics dashboard

### 4. Email Reports
- Weekly or monthly analytics reports
- Netlify Function integration
- Subscription management

## Setup Instructions

### Step 1: Google Analytics 4 Setup

1. **Create a Google Analytics 4 Property**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new property or use an existing one
   - Get your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Add the Measurement ID to your config**
   - Open `hugo.toml`
   - Replace the placeholder on line 9:
     ```toml
     googleAnalytics = "G-XXXXXXXXXX"  # Replace with your actual ID
     ```

3. **Deploy your site**
   - Commit and push your changes
   - Google Analytics will start tracking within 24-48 hours

### Step 2: Verify Search is Working

The search feature is already enabled and should work out of the box:

1. Visit your blog homepage
2. Look for the search icon (🔍) in the navigation bar
3. Type a query and press Enter
4. Search results will display on the page

### Step 3: Access the Analytics Dashboard

1. Visit `https://blog.oxuniliberals.com/analytics`
2. You'll see:
   - Local statistics (from your browser)
   - Link to Google Analytics
   - Email subscription form

**Note:** Local statistics only track your own browsing. For site-wide analytics, use Google Analytics.

### Step 4: Set Up Email Reports (Optional)

To enable weekly/monthly email reports:

1. **Set up environment variables in Netlify:**
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add the following variables:
     ```
     GOOGLE_ANALYTICS_API_KEY=<your-api-key>
     GOOGLE_ANALYTICS_PROPERTY_ID=<your-property-id>
     SENDGRID_API_KEY=<your-sendgrid-api-key>
     ```

2. **Configure SendGrid (or alternative email service):**
   - Sign up at [SendGrid](https://sendgrid.com/)
   - Create an API key
   - Verify your sender email address

3. **Install the Netlify Scheduled Functions plugin:**
   - This is configured in `netlify.toml`
   - The function runs every Monday at 9 AM UTC
   - No additional setup needed if you're using Netlify

4. **Set up a database for subscribers (Optional):**
   - Choose a storage solution:
     - Netlify Blob storage
     - Fauna DB
     - Airtable
     - Google Sheets
   - Modify `netlify/functions/subscribe-analytics.js` to store subscriptions
   - Modify `netlify/functions/send-analytics-report.js` to fetch subscribers

### Step 5: Add Analytics to Site Menu (Optional)

To add the analytics page to your site navigation:

1. Open `hugo.toml`
2. Add this menu item:
   ```toml
   [[menu.main]]
       name = "Analytics"
       url = "/analytics/"
       weight = 40
   ```

## Using the Analytics Features

### Search
1. Click the search icon in the navigation
2. Type your query
3. Press Enter
4. View results with snippets

### View Analytics
1. **Google Analytics Dashboard:**
   - Visit [analytics.google.com](https://analytics.google.com/)
   - View comprehensive site-wide analytics
   - See real-time visitors, page views, demographics, etc.

2. **Local Dashboard:**
   - Visit `/analytics` on your blog
   - See your personal browsing history
   - Track your own searches and views

### Subscribe to Email Reports
1. Visit `/analytics`
2. Scroll to "Email Reports" section
3. Enter your email and select frequency
4. Click "Subscribe to Reports"
5. Receive weekly/monthly summaries

## Tracked Events

The enhanced analytics tracks the following events in Google Analytics:

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `page_view` | When a page is viewed | page_title, page_location, author, publish_date |
| `search` | When a search is performed | search_term, results_count |
| `reading_progress` | Reading milestone reached | percent_scrolled (25, 50, 75, 100) |
| `time_on_page` | When user leaves page | value (seconds), page_path |
| `click` (outbound) | External link clicked | event_label (URL) |

## Customization

### Adjust Search Behavior
Edit `/themes/lightbi-hugo/static/js/lunr-search.js` to:
- Change the number of results displayed
- Modify search result snippets
- Adjust search scoring

### Customize Analytics Tracking
Edit `/static/js/analytics.js` to:
- Add new custom events
- Modify tracking parameters
- Change reading progress milestones
- Adjust time tracking limits

### Modify Email Report Template
Edit `/netlify/functions/send-analytics-report.js`:
- Update the email HTML template
- Add/remove analytics metrics
- Change report frequency
- Customize styling

## Troubleshooting

### Search not working
- Ensure `lunrSearch = true` in `hugo.toml`
- Check that `index.json` is generated in the `public/` directory
- Verify Hugo build completes successfully

### Analytics not tracking
- Verify your Google Analytics ID is correct
- Check browser console for errors
- Ensure analytics.js is loading (check Network tab)
- Wait 24-48 hours for data to appear in Google Analytics

### Email reports not sending
- Check Netlify Functions logs
- Verify environment variables are set
- Ensure SendGrid API key is valid
- Check scheduled function is configured correctly

## Files Added/Modified

### Configuration
- `hugo.toml` - Added Google Analytics ID and analytics settings
- `netlify.toml` - Added functions directory and scheduled function config

### JavaScript
- `static/js/analytics.js` - Enhanced analytics tracking
- `layouts/partials/head_custom.html` - Include analytics script

### Pages
- `content/analytics.md` - Analytics dashboard page

### Netlify Functions
- `netlify/functions/subscribe-analytics.js` - Subscription handler
- `netlify/functions/send-analytics-report.js` - Weekly report sender

## Privacy Considerations

- Google Analytics tracks user behavior (inform users via privacy policy)
- Local analytics data is stored in browser localStorage only
- No personal data is collected in local storage
- Email subscriptions should comply with GDPR/data protection laws

## Support

For issues or questions:
- Check the [Hugo documentation](https://gohugo.io/documentation/)
- Review [Google Analytics 4 documentation](https://support.google.com/analytics/answer/10089681)
- Check [Netlify Functions documentation](https://docs.netlify.com/functions/overview/)

## Next Steps

1. Replace the placeholder Google Analytics ID
2. Test the search functionality
3. Verify analytics tracking in GA4 dashboard (after 24-48 hours)
4. (Optional) Set up email reports with SendGrid
5. (Optional) Add analytics link to site navigation
6. Update your privacy policy to mention analytics tracking
