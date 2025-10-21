// Simple Analytics Tracking for OSLA Blog
// Stores local browsing data for personal analytics dashboard
// Does NOT interfere with search or any site functionality

(function() {
  'use strict';

  // Store page view in localStorage for dashboard
  function storePageView() {
    try {
      const currentPath = window.location.pathname;
      const pageTitle = document.title;

      let pageViews = JSON.parse(localStorage.getItem('osla_page_views') || '{}');

      if (!pageViews[currentPath]) {
        pageViews[currentPath] = {
          title: pageTitle,
          views: 0,
          lastVisit: null
        };
      }

      pageViews[currentPath].views++;
      pageViews[currentPath].lastVisit = new Date().toISOString();

      localStorage.setItem('osla_page_views', JSON.stringify(pageViews));
    } catch (e) {
      console.error('Failed to store page view:', e);
    }
  }

  // Store search query when search is performed
  function trackSearchQuery() {
    // Listen for URL changes that indicate a search
    const urlParams = new URLSearchParams(window.location.search);
    const searchFromUrl = window.location.hash.match(/#search=(.+)/);

    if (searchFromUrl) {
      const query = decodeURIComponent(searchFromUrl[1]);
      storeSearchQuery(query);
    }
  }

  function storeSearchQuery(query) {
    try {
      let searches = JSON.parse(localStorage.getItem('osla_search_history') || '[]');
      searches.push({
        query: query,
        timestamp: new Date().toISOString()
      });

      // Keep only last 100 searches
      if (searches.length > 100) {
        searches = searches.slice(-100);
      }

      localStorage.setItem('osla_search_history', JSON.stringify(searches));
    } catch (e) {
      console.error('Failed to store search query:', e);
    }
  }

  // Initialize
  function init() {
    // Store page view
    storePageView();

    // Track search if present in URL
    trackSearchQuery();

    // Listen for hash changes (search uses hash)
    window.addEventListener('hashchange', trackSearchQuery);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
