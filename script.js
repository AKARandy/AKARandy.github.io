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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  },
  { rootMargin: "-15% 0px -70% 0px" }
);

Object.keys(linkById).forEach((id) => observer.observe(document.getElementById(id)));
