import hljs from 'highlight.js';
import copy from 'copy-to-clipboard';

const BREAKPOINT_MOBILE = 767;

function isMobile() {
  return window.matchMedia(`(max-width: ${BREAKPOINT_MOBILE}px)`).matches;
}

$(() => {
  // Desktop menu section toggles
  const mainToggle = $("#menu__general-toggle");
  const sectionSelector = 'input[id^="menu__toggle-"]';
  const sectionToggles = $(sectionSelector);

  mainToggle.change(() => {
    const isChecked = mainToggle.prop("checked");

    // Open/close all sections toggles when main toggle changes
    sectionToggles.prop("checked", isChecked);

    // Prevent body overflow when the menu is open (mobile only)
    if (isMobile()) {
      document.body.style.overflow = isChecked ? "visible" : "hidden";
    }
  });

  // Update main toggle state when all sections are open or closed
  sectionToggles.change(() => {
    const openMenuSections = $(`${menuSectionSelector}:checked`);

    mainToggle.prop(
      "checked",
      openMenuSections.length === sectionToggles.length
    );
  });

  // Reset body overflow when window is resized to desktop sizes
  $(window).on("resize", () => {
    if (!isMobile()) {
      document.body.style.overflow = "";
    }
  });

  function shoutCopied(el) {
    var copyShout = document.createElement('div');
    copyShout.classList.add('code-copy-shout');
    copyShout.innerHTML = 'Copied!';
    el.parentElement.appendChild(copyShout);
    copyShout.classList.add('code-copy-shout--show');
    setTimeout(() => {
      copyShout.classList.remove('code-copy-shout--show');
    }, 1000)
    setTimeout(() => {
      copyShout.remove();
    }, 2000)
  }

  // Syntax highlighting
  const pre = $("pre")
  if (pre) {
    pre.each((i, el) => {
      el.classList.add('hljs-show')
      const h = $(el).height();
      if (h < 40) {
        el.classList.add('hljs-oneline')
      }
    })
  }

  const code = $("pre code")
  if (code) {
    code.each((i, el) => {
      hljs.highlightElement(el);
      var button = document.createElement('div');
      button.classList.add('code-copy-button');
      el.parentElement.appendChild(button);
      el.parentElement.classList.add('relative');
      button.addEventListener('click', (e) => {
        copy(el.textContent);
        shoutCopied(el);
      });
    });
  }


  // Enable Highlighting and other
  // things when there is content
  if ($(".content").length) {
    // Add Bootstrap styling to tables
    $(".content table").addClass("table");
    // FitVids
    fitvids(".content");
  }
});
