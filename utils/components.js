export const el = (tag, attrs = {}, children = []) => {
  const element = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if(key === 'style') element.style.cssText = value;
    else element.setAttribute(key, value);
  });
  children.filter(Boolean).forEach(child => {
    if(typeof child === 'string' || typeof child === 'number') {
      element.appendChild(document.createTextNode(String(child)));
    } else if(child instanceof Node) {
      element.appendChild(child);
    }
  });
  return element;
};
