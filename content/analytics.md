---
title: "Blog Analytics Dashboard"
draft: false
---

<div id="analytics-dashboard">
  <div class="container">
    <h1>OSLA Blog Analytics</h1>

    <div class="alert alert-warning mt-4">
      <strong>Note:</strong> This page is not linked in the navigation menu. Only share the URL with authorized editors.
      <br>Access: <code>https://blog.oxuniliberals.com/analytics/</code>
    </div>

    <div class="alert alert-info mt-4">
      <h5>📊 Cloudflare Web Analytics Dashboard</h5>
      <p>View comprehensive site-wide analytics for all visitors:</p>
      <ol>
        <li>Go to <a href="https://dash.cloudflare.com/" target="_blank" rel="noopener"><strong>Cloudflare Dashboard</strong></a></li>
        <li>Click <strong>"Web Analytics"</strong> in the left sidebar</li>
        <li>Select <strong>"blog.oxuniliberals.com"</strong></li>
      </ol>
      <p class="mb-0"><strong>Cloudflare shows:</strong> Page views, unique visitors, popular pages, traffic sources, countries, browsers, and more.</p>
    </div>

    <hr class="my-5">

    <h2>Local Browser Stats</h2>
    <p class="text-muted">The data below is stored only in <strong>your browser</strong> and shows your personal browsing activity on this blog.</p>

    <div class="row mt-4">
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title mb-0">Your Most Viewed Pages</h5>
          </div>
          <div class="card-body">
            <p class="text-muted small">Based on your personal browsing history (stored in your browser)</p>
            <ul id="popular-pages" class="list-group list-group-flush">
              <li class="list-group-item">No data available yet. Browse some articles to see them appear here!</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title mb-0">Your Recent Searches</h5>
          </div>
          <div class="card-body">
            <p class="text-muted small">Based on your personal search history (stored in your browser)</p>
            <ul id="recent-searches" class="list-group list-group-flush">
              <li class="list-group-item">No searches yet. Try using the search box in the navigation!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Your Quick Stats</h5>
          </div>
          <div class="card-body">
            <div class="row text-center">
              <div class="col-md-4">
                <h3 id="total-views">-</h3>
                <p class="text-muted">Total Views (Your Browser)</p>
              </div>
              <div class="col-md-4">
                <h3 id="total-searches">-</h3>
                <p class="text-muted">Total Searches (Your Browser)</p>
              </div>
              <div class="col-md-4">
                <h3 id="unique-pages">-</h3>
                <p class="text-muted">Unique Pages Viewed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <h3>Clear Your Local Data</h3>
      <p>Want to clear your local browsing history from this dashboard?</p>
      <button id="clear-data-btn" class="btn btn-danger">Clear All Local Data</button>
      <div id="clear-message" class="mt-2"></div>
    </div>

    <hr class="my-5">

    <div class="card">
      <div class="card-header">
        <h5 class="card-title mb-0">🔒 Password Protection (Optional)</h5>
      </div>
      <div class="card-body">
        <p>To add password protection to this analytics page:</p>
        <ol>
          <li>Go to Netlify Dashboard → Site Settings → Visitor Access</li>
          <li>Under "Protected pages", add a rule:
            <pre class="mt-2"><code>/analytics/*  requires password</code></pre>
          </li>
          <li>Set a password for authorized editors</li>
        </ol>
        <p class="mb-0 text-muted"><small>Note: This requires a Netlify Pro plan. Alternatively, keep this page unlisted (not in menu) for basic security.</small></p>
      </div>
    </div>
  </div>
</div>

<script>
// Dashboard JavaScript
(function() {
  'use strict';

  // Load and display popular pages
  function loadPopularPages() {
    try {
      const pageViews = JSON.parse(localStorage.getItem('osla_page_views') || '{}');
      const pages = Object.entries(pageViews)
        .map(([path, data]) => ({ path, ...data }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      const listElement = document.getElementById('popular-pages');
      if (pages.length === 0) {
        listElement.innerHTML = '<li class="list-group-item">No data available yet. Browse some articles to see them appear here!</li>';
        return;
      }

      listElement.innerHTML = pages.map(page => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <a href="${page.path}">${page.title || page.path}</a>
          <span class="badge bg-primary rounded-pill">${page.views} views</span>
        </li>
      `).join('');

      // Update quick stats
      const totalViews = pages.reduce((sum, page) => sum + page.views, 0);
      document.getElementById('total-views').textContent = totalViews;
      document.getElementById('unique-pages').textContent = pages.length;
    } catch (e) {
      console.error('Failed to load popular pages:', e);
    }
  }

  // Load and display recent searches
  function loadRecentSearches() {
    try {
      const searches = JSON.parse(localStorage.getItem('osla_search_history') || '[]');
      const recentSearches = searches.slice(-10).reverse();

      const listElement = document.getElementById('recent-searches');
      if (recentSearches.length === 0) {
        listElement.innerHTML = '<li class="list-group-item">No searches yet. Try using the search box in the navigation!</li>';
        return;
      }

      listElement.innerHTML = recentSearches.map(search => {
        const date = new Date(search.timestamp);
        return `
          <li class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">
              <span><strong>${search.query}</strong></span>
            </div>
            <small class="text-muted">${date.toLocaleString()}</small>
          </li>
        `;
      }).join('');

      // Update total searches
      document.getElementById('total-searches').textContent = searches.length;
    } catch (e) {
      console.error('Failed to load recent searches:', e);
    }
  }

  // Clear all local data
  function setupClearButton() {
    const clearBtn = document.getElementById('clear-data-btn');
    const messageDiv = document.getElementById('clear-message');

    clearBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to clear all your local analytics data? This cannot be undone.')) {
        localStorage.removeItem('osla_page_views');
        localStorage.removeItem('osla_search_history');

        messageDiv.innerHTML = '<div class="alert alert-success">All local data cleared successfully!</div>';

        // Reload the dashboard
        setTimeout(function() {
          loadPopularPages();
          loadRecentSearches();
        }, 500);
      }
    });
  }

  // Initialize dashboard
  function init() {
    loadPopularPages();
    loadRecentSearches();
    setupClearButton();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
