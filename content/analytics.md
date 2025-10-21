---
title: "Blog Analytics Dashboard"
draft: false
---

<div id="analytics-dashboard">
  <div class="container">
    <h1>Blog Analytics Dashboard</h1>

    <div class="alert alert-info mt-4">
      <h5>Google Analytics</h5>
      <p>For comprehensive analytics data, visit the <a href="https://analytics.google.com/" target="_blank" rel="noopener">Google Analytics Dashboard</a>.</p>
      <p><small>Note: You'll need to be logged in to your Google account with access to this property.</small></p>
    </div>

    <div class="row mt-4">
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title mb-0">Most Viewed Pages (Local)</h5>
          </div>
          <div class="card-body">
            <p class="text-muted small">Based on your local browser history</p>
            <ul id="popular-pages" class="list-group list-group-flush">
              <li class="list-group-item">No data available yet</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title mb-0">Recent Searches (Local)</h5>
          </div>
          <div class="card-body">
            <p class="text-muted small">Based on your local browser history</p>
            <ul id="recent-searches" class="list-group list-group-flush">
              <li class="list-group-item">No data available yet</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Email Reports</h5>
          </div>
          <div class="card-body">
            <p>Configure weekly email reports with analytics summaries:</p>
            <form id="email-report-form">
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="email" placeholder="your@email.com" required>
              </div>
              <div class="mb-3">
                <label for="frequency" class="form-label">Frequency</label>
                <select class="form-select" id="frequency">
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Subscribe to Reports</button>
            </form>
            <div id="subscription-message" class="mt-3"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Quick Stats</h5>
          </div>
          <div class="card-body">
            <div class="row text-center">
              <div class="col-md-3">
                <h3 id="total-views">-</h3>
                <p class="text-muted">Total Views (Local)</p>
              </div>
              <div class="col-md-3">
                <h3 id="total-searches">-</h3>
                <p class="text-muted">Total Searches (Local)</p>
              </div>
              <div class="col-md-3">
                <h3 id="unique-pages">-</h3>
                <p class="text-muted">Unique Pages Viewed</p>
              </div>
              <div class="col-md-3">
                <h3 id="last-visit">-</h3>
                <p class="text-muted">Last Visit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-warning mt-4">
      <strong>Note:</strong> The local statistics shown above are stored in your browser's localStorage and only reflect your own activity.
      For site-wide analytics across all visitors, please use Google Analytics.
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
        listElement.innerHTML = '<li class="list-group-item">No data available yet</li>';
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

      if (pages.length > 0 && pages[0].lastVisit) {
        const lastVisit = new Date(pages[0].lastVisit);
        document.getElementById('last-visit').textContent = lastVisit.toLocaleDateString();
      }
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
        listElement.innerHTML = '<li class="list-group-item">No data available yet</li>';
        return;
      }

      listElement.innerHTML = recentSearches.map(search => {
        const date = new Date(search.timestamp);
        return `
          <li class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">
              <span><strong>${search.query}</strong></span>
              <span class="badge bg-secondary">${search.results} results</span>
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

  // Handle email subscription form
  function setupEmailForm() {
    const form = document.getElementById('email-report-form');
    const messageDiv = document.getElementById('subscription-message');

    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const frequency = document.getElementById('frequency').value;

      try {
        const response = await fetch('/.netlify/functions/subscribe-analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, frequency })
        });

        if (response.ok) {
          messageDiv.innerHTML = '<div class="alert alert-success">Successfully subscribed to analytics reports!</div>';
          form.reset();
        } else {
          throw new Error('Subscription failed');
        }
      } catch (error) {
        messageDiv.innerHTML = '<div class="alert alert-danger">Failed to subscribe. Please ensure Netlify Functions are configured.</div>';
      }
    });
  }

  // Initialize dashboard
  function init() {
    loadPopularPages();
    loadRecentSearches();
    setupEmailForm();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
