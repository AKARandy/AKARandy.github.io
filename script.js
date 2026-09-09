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
    if (lastId && atBottom()) {
      setActive(lastId);
      return;
    }
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  },
  { rootMargin: "-15% 0px -70% 0px" }
);

Object.keys(linkById).forEach((id) => observer.observe(document.getElementById(id)));

// The last section is too short to ever rest inside the observer band on
// tall viewports, so at the page bottom the highlight would stick on the
// section above. Pin it to the last section instead. The check lives in
// both handlers so a trailing observer callback cannot stomp the pin.
const lastId = links.length ? links[links.length - 1].getAttribute("href").slice(1) : null;

function atBottom() {
  return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
}

function pinLastAtBottom() {
  if (lastId && atBottom()) setActive(lastId);
}

window.addEventListener("scroll", pinLastAtBottom, { passive: true });
window.addEventListener("resize", pinLastAtBottom);
pinLastAtBottom();
