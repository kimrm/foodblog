export default async function tags() {
  const url = `https://wp-foodblog.kimrune.dev/wp-json/wp/v2/tags?per_page=100`;

  const response = await fetch(url);
  const data = await response.json();
  const postTags = data.map((tag) => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "tag");
    checkbox.setAttribute("value", tag.id);
    checkbox.setAttribute("id", tag.slug);
    checkbox.classList.add("filter-menu__checkbox");
    checkbox.addEventListener("change", () => {
      checkbox.dispatchEvent(tagSelectedEvent);
    });
    const label = document.createElement("label");
    label.setAttribute("for", tag.slug);
    label.classList.add("filter-menu__label");
    label.innerHTML = tag.name;
    const li = document.createElement("li");
    li.classList.add("filter-menu__item");
    li.append(checkbox, label);
    return li;
  });
  return postTags;
}

export const tagSelectedEvent = new Event("tagSelected", { bubbles: true });
