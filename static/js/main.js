(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // --- ASCII eye ----------------------------------------------------------

  var asciiEye = document.querySelector("[data-ascii-eye]");

  if (asciiEye && !reduceMotion) {
    var eyeArtwork = asciiEye.textContent;
    var eyePupils = ["@", "O", "0", "O"];
    var eyeFrame = 0;

    function advanceEye() {
      eyeFrame = (eyeFrame + 1) % eyePupils.length;
      asciiEye.textContent = eyeArtwork.replace("@", eyePupils[eyeFrame]);
    }

    var eyeTimer = 0;

    asciiEye.classList.add("is-animated");
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        window.clearInterval(eyeTimer);
        eyeTimer = 0;
      } else if (!eyeTimer) {
        eyeTimer = window.setInterval(advanceEye, 280);
      }
    });
    if (!document.hidden) {
      eyeTimer = window.setInterval(advanceEye, 280);
    }
  }

  // --- Ambient code rain --------------------------------------------------

  var rainContainer = document.querySelector(".code-rain");

  if (rainContainer && !reduceMotion) {
    var rainContext = rainContainer.getContext("2d");

    if (rainContext) {
      var rainGlyphs = "01{}[]<>/\\=+-_$#";
      var rainFontSize = 15;
      var rainColumnWidth = 42;
      var rainColumns = [];
      var rainFrame = 0;
      var lastRainFrame = 0;

      function resizeCodeRain() {
        var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        var width = window.innerWidth;
        var height = window.innerHeight;
        var columnCount = Math.ceil(width / rainColumnWidth);

        rainContainer.width = Math.floor(width * pixelRatio);
        rainContainer.height = Math.floor(height * pixelRatio);
        rainContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        rainContext.clearRect(0, 0, width, height);
        rainContext.font = rainFontSize + "px monospace";
        rainContext.textAlign = "center";
        rainColumns = Array.from({ length: columnCount }, function () {
          return {
            row: Math.random() * (height / rainFontSize),
            speed: 0.2 + Math.random() * 0.48,
            trail: 5 + Math.floor(Math.random() * 7),
          };
        });
      }

      function drawCodeRain(timestamp) {
        rainFrame = 0;
        if (document.hidden) return;
        if (timestamp - lastRainFrame < 50) {
          rainFrame = window.requestAnimationFrame(drawCodeRain);
          return;
        }

        lastRainFrame = timestamp;
        var width = window.innerWidth;
        var height = window.innerHeight;
        rainContext.fillStyle = "rgba(8, 9, 10, 0.14)";
        rainContext.fillRect(0, 0, width, height);
        rainContext.font = rainFontSize + "px monospace";
        rainContext.textAlign = "center";

        rainColumns.forEach(function (column, index) {
          column.row += column.speed;

          if (column.row * rainFontSize > height + column.trail * rainFontSize) {
            column.row = -Math.random() * 24;
            column.speed = 0.2 + Math.random() * 0.48;
            column.trail = 5 + Math.floor(Math.random() * 7);
          }

          for (var trail = 0; trail < column.trail; trail += 1) {
            var y = (column.row - trail) * rainFontSize;
            if (y < 0 || y > height) continue;

            var fade = 1 - trail / column.trail;
            var opacity = trail === 0 ? 0.52 : fade * 0.2;
            var glyph = rainGlyphs.charAt(
              Math.floor(Math.random() * rainGlyphs.length)
            );
            rainContext.fillStyle =
              "rgba(219, 231, 220, " + opacity + ")";
            rainContext.fillText(
              glyph,
              index * rainColumnWidth + rainColumnWidth / 2,
              y
            );
          }
        });

        rainFrame = window.requestAnimationFrame(drawCodeRain);
      }

      function updateCodeRainVisibility() {
        if (document.hidden) {
          if (rainFrame) window.cancelAnimationFrame(rainFrame);
          rainFrame = 0;
        } else if (!rainFrame) {
          lastRainFrame = 0;
          rainFrame = window.requestAnimationFrame(drawCodeRain);
        }
      }

      resizeCodeRain();
      window.addEventListener("resize", resizeCodeRain);
      document.addEventListener("visibilitychange", updateCodeRainVisibility);
      if (!document.hidden) {
        rainFrame = window.requestAnimationFrame(drawCodeRain);
      }
    }
  }

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
  var sectionLinks = navLinks.filter(function (link) {
    return link.getAttribute("href").charAt(0) === "#";
  });
  var sections = sectionLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          sectionLinks.forEach(function (link) {
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
