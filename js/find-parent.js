export function findParent(element, selector) {
  // The desired element was not found on the page
  if (element === null) {
    return null;
  }

  // We found the desired element
  if (element.matches(selector)) {
    return element;

    // Keep searching for the element
  } else {
    return findParent(element.parentElement, selector);
  }
}
