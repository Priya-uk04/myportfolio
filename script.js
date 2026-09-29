// Theme: remember the visitor's choice; otherwise follow the system setting.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  else root.setAttribute("data-theme", matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();

// Mobile menu
(function () {
  var btn = document.getElementById("menu-toggle");
  var links = document.getElementById("nav-links");
  btn.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
})();

// Resume download menu
(function () {
  var btn = document.getElementById("resume-btn");
  var menu = document.getElementById("resume-menu");
  function close() { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); }
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    menu.hidden = !menu.hidden;
    btn.setAttribute("aria-expanded", String(!menu.hidden));
  });
  document.addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();

// Highlight the nav link for the section on screen
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  if (!("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach(function (a) {
    var section = document.querySelector(a.getAttribute("href"));
    if (section) io.observe(section);
  });
})();

// Fade sections in as they scroll into view
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var items = document.querySelectorAll(".skill-card, .job, .work, .mini, .edu li, .stats");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
})();

document.getElementById("year").textContent = new Date().getFullYear();

// Cursor spotlight on glass cards
(function () {
  if (matchMedia("(hover: none)").matches) return;
  document.querySelectorAll(".spot").forEach(function (el) {
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - r.left) + "px");
      el.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });
})();

// Navbar: sliding pill under the active (or hovered) link, and a tighter bar once the page scrolls
(function () {
  var nav = document.querySelector(".nav");
  var list = document.getElementById("nav-links");
  var pill = list.querySelector(".nav-pill");
  var links = Array.prototype.slice.call(list.querySelectorAll("a"));

  function place(a) {
    if (!a || getComputedStyle(list).flexDirection !== "row") { pill.classList.remove("on"); return; }
    pill.style.left = a.offsetLeft + "px";
    pill.style.width = a.offsetWidth + "px";
    pill.classList.add("on");
  }
  function active() { return list.querySelector("a.active"); }

  links.forEach(function (a) {
    a.addEventListener("mouseenter", function () { place(a); });
  });
  list.addEventListener("mouseleave", function () { place(active()); });
  new MutationObserver(function () { place(active()); })
    .observe(list, { subtree: true, attributes: true, attributeFilter: ["class"] });
  addEventListener("resize", function () { place(active()); });

  function onScroll() { nav.classList.toggle("scrolled", scrollY > 20); }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// Hero: type out things she has built, one after another
(function () {
  var el = document.querySelector(".typed");
  if (!el) return;
  var words = el.getAttribute("data-words").split("|");
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var i = 0;
  if (reduce) {
    setInterval(function () { i = (i + 1) % words.length; el.textContent = words[i]; }, 3000);
    return;
  }
  var text = words[0], deleting = false;
  function tick() {
    var word = words[i];
    if (deleting) {
      text = word.slice(0, text.length - 1);
      if (!text) { deleting = false; i = (i + 1) % words.length; }
    } else {
      text = words[i].slice(0, text.length + 1);
      if (text === words[i]) { deleting = true; el.textContent = text; return setTimeout(tick, 1800); }
    }
    el.textContent = text;
    setTimeout(tick, deleting ? 28 : 55);
  }
  setTimeout(function () { deleting = true; tick(); }, 2200);
})();

// Hero: tilt the isometric map slightly towards the pointer
(function () {
  var hero = document.querySelector(".hero");
  var art = document.getElementById("hero-art");
  if (!hero || !art) return;
  if (matchMedia("(hover: none)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var iso = art.querySelector(".iso");
  hero.addEventListener("pointermove", function (e) {
    var r = art.getBoundingClientRect();
    var dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    var dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    iso.style.setProperty("--ry", (dx * 8).toFixed(2) + "deg");
    iso.style.setProperty("--rx", (-dy * 6).toFixed(2) + "deg");
  });
  hero.addEventListener("pointerleave", function () {
    iso.style.setProperty("--ry", "0deg");
    iso.style.setProperty("--rx", "0deg");
  });
})();
