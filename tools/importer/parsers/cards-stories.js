/**
 * Cards-Stories Block Parser
 * Parses story feed items into AEM Cards block format
 *
 * Source selector: .feed_item
 * Output: 2-column table (image | category + title + link)
 */

export function parse(element, document) {
  const cells = [];

  // Header row with block name
  cells.push(['Cards-Stories']);

  // Find all feed items
  const feedItems = element.querySelectorAll('.feed_item');

  feedItems.forEach(item => {
    // Extract image
    const img = item.querySelector('.feed_image');
    const imgSrc = img ? img.getAttribute('src') : '';
    const imgAlt = img ? (img.getAttribute('alt') || '') : '';

    // Create image element for cell
    const imageCell = document.createElement('div');
    if (imgSrc) {
      const picture = document.createElement('picture');
      const imgEl = document.createElement('img');
      imgEl.src = imgSrc;
      imgEl.alt = imgAlt;
      imgEl.loading = 'lazy';
      picture.appendChild(imgEl);
      imageCell.appendChild(picture);
    }

    // Extract category labels
    const categoryLabels = item.querySelectorAll('.feed_item-label');
    let category = '';
    categoryLabels.forEach(label => {
      category += label.textContent.trim();
    });

    // Extract title
    const titleEl = item.querySelector('h2');
    const title = titleEl ? titleEl.textContent.trim() : '';

    // Extract link
    const linkEl = item.querySelector('a.link');
    const linkHref = linkEl ? linkEl.getAttribute('href') : '';
    const linkText = linkEl ? linkEl.textContent.trim() : 'Read More';

    // Build content cell
    const contentCell = document.createElement('div');

    // Add category paragraph
    if (category) {
      const categoryP = document.createElement('p');
      categoryP.textContent = category;
      contentCell.appendChild(categoryP);
    }

    // Add title as h2
    if (title) {
      const h2 = document.createElement('h2');
      h2.textContent = title;
      contentCell.appendChild(h2);
    }

    // Add link
    if (linkHref) {
      const linkP = document.createElement('p');
      const a = document.createElement('a');
      a.href = linkHref;
      a.textContent = linkText;
      linkP.appendChild(a);
      contentCell.appendChild(linkP);
    }

    // Add row to cells
    cells.push([imageCell, contentCell]);
  });

  return cells;
}

/**
 * Check if element matches this parser
 */
export function matches(element) {
  return element.classList.contains('feed_list') ||
         element.classList.contains('feed_list-wrapper') ||
         element.querySelector('.feed_item') !== null;
}
