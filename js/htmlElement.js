export class HtmlElement {
  constructor(type) {
    this.element = document.createElement(type);
  }
  setClasses(...classes) {
    this.element.classList.add(...classes);
    return this;
  }
  setText(text) {
    this.element.textContent = text;
    return this;
  }
  setSrc(src) {
    this.element.src = src;
    return this;
  }
  setHtml(html) {
    this.element.innerHTML = html;
  }
  setAltText(text) {
    this.element.alt = text;
    return this;
  }
  setHref(href) {
    this.element.href = href;
    return this;
  }
  appendChild(child) {
    this.element.appendChild(child.element);
    return this;
  }
  appendChildren(...children) {
    children.forEach((child) => this.element.appendChild(child.element));
    return this;
  }
  setEventListener(type, callback) {
    this.element.addEventListener(type, callback);
    return this;
  }
  setDataset(key, value) {
    this.element.dataset[key] = value;
    return this;
  }
  setValue(value) {
    this.element.value = value;
    return this;
  }
  setAttributes(attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      this.element.setAttribute(key, value);
    });
    return this;
  }
}
