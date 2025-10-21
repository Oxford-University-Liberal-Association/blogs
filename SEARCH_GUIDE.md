# OSLA Blog - Enhanced Search Guide

The blog search has been enhanced to search across multiple fields, making it easy to find articles by author, college, term, committee position, and more!

## What You Can Search For

### 1. **Authors**
Search by author name:
- `Harry Morgan` - Find all articles by Harry Morgan
- `Theo` - Find all articles by authors named Theo
- `Cunningham` - Find by last name

### 2. **Colleges**
Search by college name:
- `Pembroke` - All articles by authors from Pembroke College
- `St John's` - Articles from St John's College
- `Balliol`, `Christ Church`, etc.

### 3. **Terms**
Search by term/tag:
- `HT25` - All articles from Hilary Term 2025
- `MT25` - All articles from Michaelmas Term 2025
- `TT24` - Trinity Term 2024

### 4. **Committee Positions**
Search by society role:
- `President` - Articles by Presidents
- `Social Secretary` - Articles by Social Secretaries
- `President-Elect` - Articles by Presidents-Elect
- Any other committee position

### 5. **Content & Topics**
Search the article content:
- `liberal democracy` - Find articles about liberal democracy
- `tuition fees` - Find articles mentioning tuition fees
- `OULC` - Find mentions of other societies
- Any topic or keyword

### 6. **Categories**
Search by category:
- `Freedom of the Press` - All articles in this category
- Any category name

### 7. **Titles**
Search article titles:
- `archives` - Find articles with "archives" in the title
- `Brexit` - Articles about Brexit

## How Search Works

The search indexes these fields:
- **Title** - Article titles
- **Author** - Author names
- **College** - Author's college
- **Society Role** - Committee position
- **Tags** - Term tags (HT25, MT25, etc.)
- **Categories** - Article categories
- **Content** - Full article text

## Search Tips

### Combine Terms
You can search multiple terms together:
- `Harry Pembroke` - Articles by Harry from Pembroke
- `HT25 President` - HT25 articles by Presidents
- `Brexit liberal` - Articles about Brexit and liberalism

### Partial Matches
Search works with partial words:
- `Pem` will find "Pembroke"
- `Sec` will find "Secretary"
- `Lib` will find "Liberal"

### Case Insensitive
Search is not case-sensitive:
- `harry morgan` = `Harry Morgan` = `HARRY MORGAN`

## Search Results Display

Each search result shows:
- **Article Title** (clickable link)
- **Author • College • Committee Position** (metadata)
- **Article Preview** (first ~70 words)
- **Read More** link

Example result:
```
My Journey into the OSLA Archives

Harry Morgan • Pembroke College • President-Elect

I recently visited the 3 boxes full of old term cards, event posters,
and Lib Dem propaganda that together form the Liberal society archives...

Read More →
```

## No Results Message

If your search doesn't find anything, you'll see:

> 😢 No matches found for 'your search' - Maybe try searching for an author, college, term (HT25/MT25), or committee position?

This friendly message reminds you of all the different ways you can search!

## Examples

### Find All Articles from HT25
Search: `HT25`

### Find All Articles by Presidents
Search: `President`

### Find Articles from Pembroke College
Search: `Pembroke`

### Find Articles Mentioning Tuition Fees
Search: `tuition fees`

### Find HT25 Articles by Social Secretaries
Search: `HT25 Social Secretary`

### Find Articles about Brexit by Authors from St John's
Search: `Brexit St John's`

## Accessing Search

1. Look for the **search icon** (🔍) in the top-right navigation bar
2. Click it to open the search box
3. Type your query
4. Press **Enter** or click the search icon
5. View your results!

## Technical Details

### Search Index Fields
The search index (`index.json`) includes:
```json
{
  "uri": "/blog/article-slug/",
  "title": "Article Title",
  "author": "Author Name",
  "college": "College Name",
  "society_role": "Committee Position",
  "tags": ["HT25"],
  "categories": ["HT25 - Category"],
  "content": "Full article text..."
}
```

### Search Engine
- Uses **Lunr.js** for client-side full-text search
- Completely static - no server required
- Fast and responsive
- Works offline once page is loaded

## Adding Searchable Metadata to New Articles

When creating new blog posts, include these fields in the frontmatter:

```yaml
---
title: "Your Article Title"
draft: false
date: 2025-10-21
author: "Your Name"
college: "Your College"
society_role: "Your Position"
tags: ["HT25"]
categories: ["HT25 - Category"]
---
```

All these fields will be automatically indexed and searchable!

## Privacy

- Search is completely client-side
- No search queries are sent to any server
- No tracking of searches (except in your browser's localStorage for the analytics dashboard)
- All search happens in your browser using JavaScript

## Browser Compatibility

Search works in all modern browsers:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

Requires JavaScript to be enabled.

## Troubleshooting

### Search box doesn't appear
- Ensure JavaScript is enabled
- Clear browser cache and reload
- Check that `lunrSearch = true` in hugo.toml

### No results when searching for known content
- Try simpler search terms
- Check spelling
- Try partial words instead of full words
- Make sure the article has the metadata you're searching for

### Search is slow
- This shouldn't happen with the current ~11 articles
- If the blog grows to 1000+ articles, search may slow down
- Consider implementing search result pagination

## Future Enhancements

Possible improvements:
- Search suggestions/autocomplete
- Filter by specific fields (author dropdown, term dropdown, etc.)
- Search result highlighting
- Sort results by relevance, date, or author
- Export search results

---

Happy searching! 🔍✨
