(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // --- Scroll reveal -------------------------------------------------------
  // .js-anim is added here, not in <head>, so the hidden starting state only
  // exists once this script is running and able to undo it. If JS is blocked or
  // fails, nothing is ever hidden and the page reads normally.

  var revealItems = Array.prototype.slice.call(
    document.querySelectorAll(".reveal")
  );

  revealItems.forEach(function (el) {
    var delay = el.getAttribute("data-reveal-delay");
    if (delay) {
      el.style.setProperty("--reveal-delay", delay);
    }
  });

  function showAll(el) {
    el.classList.add("is-visible");
  }

  var canReveal = !reduceMotion && "IntersectionObserver" in window;

  if (canReveal) {
    // Hide before the first paint so the animation does not read as a flicker.
    document.documentElement.classList.add("js-anim");

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            showAll(entry.target);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );

    revealItems.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealItems.forEach(showAll);
  }

  // --- Nav scroll-spy ------------------------------------------------------

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".site-header nav a")
  );
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  // --- Contact form --------------------------------------------------------

  var form = document.querySelector(".contact-form");

  if (form && !form.getAttribute("action")) {
    form.addEventListener("submit", function () {
      var button = form.querySelector("button");
      if (button) {
        button.disabled = true;
        button.textContent = "Sending...";
      }
    });
  }

  var flash = document.querySelector(".flash");

  if (flash) {
    flash.scrollIntoView({
      block: "nearest",
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }
})();
