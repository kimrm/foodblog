export default function visibleDetector(targetElement, loadedClass) {
  const options = {
    root: null, // Use the viewport as the root
    rootMargin: "0px", // No margin
    threshold: 0.5, // 50% visibility required to trigger callback
    className: loadedClass,
  };

  const observer = new IntersectionObserver(handleIntersection, options);

  observer.observe(targetElement);
}

function handleIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("loaded")) {
        // Already loaded
        return;
      }
      entry.target.classList.add("img-loaded");
    }
  });
}
