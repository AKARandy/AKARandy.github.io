// Scroll spy: light the nav pill of the section currently in view.
const links = document.querySelectorAll(".section-nav a");
const linkById = {};

links.forEach((link) => {
  const id = link.getAttribute("href").slice(1);
  const section = document.getElementById(id);
  if (section) linkById[id] = link;
});

function setActive(id) {
  links.forEach((l) => l.classList.remove("active"));
  const link = linkById[id];
  if (link) link.classList.add("active");
}

// A tap names the correct pill at once. The observer stays quiet while the
// smooth scroll travels, so passing sections cannot steal the highlight.
let lastTap = 0;

links.forEach((link) => {
  link.addEventListener("click", () => {
    lastTap = Date.now();
    setActive(link.getAttribute("href").slice(1));
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    if (Date.now() - lastTap < 1000) return;
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  },
  { rootMargin: "-15% 0px -70% 0px" }
);

Object.keys(linkById).forEach((id) => observer.observe(document.getElementById(id)));
