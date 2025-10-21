// Enhanced Analytics Tracking for OSLA Blog
// Tracks search queries, page views, reading time, and popular content

(function() {
  'use strict';

  // Check if Google Analytics is loaded
  function isGALoaded() {
    return typeof gtag !== 'undefined';
  }

  // Track page view with additional metadata
  function trackPageView() {
    if (!isGALoaded()) return;

    const pageData = {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    };

    // Add blog post specific metadata if available
    const articleMeta = document.querySelector('article');
    if (articleMeta) {
      const author = document.querySelector('meta[name="author"]');
      const publishDate = document.querySelector('time[datetime]');

      if (author) {
        pageData.author = author.getAttribute('content');
      }
      if (publishDate) {
        pageData.publish_date = publishDate.getAttribute('datetime');
      }
    }

    gtag('event', 'page_view', pageData);
  }

  // Track search queries
  function trackSearch(query, resultsCount) {
    if (!isGALoaded()) return;

    gtag('event', 'search', {
      search_term: query,
      results_count: resultsCount,
      timestamp: new Date().toISOString()
    });

    // Store search query in localStorage for dashboard
    storeSearchQuery(query, resultsCount);
  }

  // Store search queries locally for dashboard
  function storeSearchQuery(query, resultsCount) {
    try {
      let searches = JSON.parse(localStorage.getItem('osla_search_history') || '[]');
      searches.push({
        query: query,
        results: resultsCount,
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

  // Track reading progress
  function trackReadingProgress() {
    if (!isGALoaded()) return;

    const article = document.querySelector('article');
    if (!article) return;

    let milestones = [25, 50, 75, 100];
    let trackedMilestones = {};

    function checkReadingProgress() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

      milestones.forEach(function(milestone) {
        if (scrollPercent >= milestone && !trackedMilestones[milestone]) {
          trackedMilestones[milestone] = true;
          gtag('event', 'reading_progress', {
            percent_scrolled: milestone,
            page_path: window.location.pathname
          });
        }
      });
    }

    let scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkReadingProgress, 100);
    });
  }

  // Track time on page
  function trackTimeOnPage() {
    if (!isGALoaded()) return;

    let startTime = Date.now();
    let maxTime = 30 * 60 * 1000; // 30 minutes max

    window.addEventListener('beforeunload', function() {
      let timeSpent = Math.min(Date.now() - startTime, maxTime);
      let timeInSeconds = Math.floor(timeSpent / 1000);

      gtag('event', 'time_on_page', {
        value: timeInSeconds,
        page_path: window.location.pathname,
        page_title: document.title
      });
    });
  }

  // Track outbound links
  function trackOutboundLinks() {
    if (!isGALoaded()) return;

    document.addEventListener('click', function(event) {
      let target = event.target;

      // Find parent anchor tag if clicked element is inside one
      while (target && target.tagName !== 'A') {
        target = target.parentElement;
      }

      if (target && target.tagName === 'A' && target.href) {
        const href = target.href;
        const currentDomain = window.location.hostname;

        try {
          const linkDomain = new URL(href).hostname;

          if (linkDomain !== currentDomain) {
            gtag('event', 'click', {
              event_category: 'outbound',
              event_label: href,
              transport_type: 'beacon'
            });
          }
        } catch (e) {
          // Invalid URL, ignore
        }
      }
    });
  }

  // Store page view in localStorage for dashboard
  function storePageView() {
    try {
      const currentPath = window.location.pathname;
      let pageViews = JSON.parse(localStorage.getItem('osla_page_views') || '{}');

      if (!pageViews[currentPath]) {
        pageViews[currentPath] = {
          title: document.title,
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

  // Hook into existing search functionality
  function enhanceSearchTracking() {
    // Find the search form
    const searchForm = document.getElementById('search');
    if (!searchForm) return;

    // Override the search functionality to track queries
    const originalSearch = window.search;
    if (typeof originalSearch === 'function') {
      window.search = function(term, doNotAddState) {
        // Call original search
        originalSearch.call(this, term, doNotAddState);

        // Track the search
        setTimeout(function() {
          // Count results
          const results = document.querySelectorAll('.search-result').length;
          trackSearch(term, results);
        }, 100);
      };
    }

    // Alternative: listen to search input changes
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchForm.addEventListener('submit', function(e) {
        const query = searchInput.value.trim();
        if (query) {
          // Track will happen after search completes
          setTimeout(function() {
            const resultsTitle = document.getElementById('search-title');
            if (resultsTitle) {
              const text = resultsTitle.textContent;
              // Extract number of results from text
              const match = text.match(/(\d+)/);
              const count = match ? parseInt(match[1]) : 0;
              trackSearch(query, count);
            }
          }, 500);
        }
      });
    }
  }

  // Initialize analytics
  function init() {
    // Wait for GA to load
    let gaCheckInterval = setInterval(function() {
      if (isGALoaded()) {
        clearInterval(gaCheckInterval);

        // Track page view
        trackPageView();

        // Track reading progress for blog posts
        if (document.querySelector('article')) {
          trackReadingProgress();
          trackTimeOnPage();
        }

        // Track outbound links
        trackOutboundLinks();

        // Enhance search tracking
        enhanceSearchTracking();
      }
    }, 100);

    // Stop checking after 5 seconds
    setTimeout(function() {
      clearInterval(gaCheckInterval);
    }, 5000);

    // Store page view locally
    storePageView();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
