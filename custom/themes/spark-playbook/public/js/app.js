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
    copyShout.classList.add('code-ui--shout', 'code-ui');
    copyShout.innerHTML = 'Copied!';
    const containers = el.parentElement.getElementsByClassName('code-copy-button-container')
    if (containers.length < 0) {
      return;
    }
    containers[0].appendChild(copyShout);
    copyShout.classList.add('code-ui--shout__show');
    setTimeout(() => {
      copyShout.classList.remove('code-ui--shout__show');
    }, 1000)
    setTimeout(() => {
      copyShout.remove();
    }, 2000)
  }

  function booleanToogle(button) {
    button.classList.toggle('on');
  }

  function showDiagramCode(diagram) {
    const source = diagram.nextSibling;
    if (source && diagram) {
      diagram.classList.toggle('hide');
      source.classList.toggle('hide');
    }
  }

  function createButton(classes) {
    const button = document.createElement('div');
    button.classList.add(...classes);
    return button;
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
      if (h < 40 && h > 30) {
        el.classList.add('hljs-oneline__scrolling')
      }
    })
  }

  const code = $("pre code");
  if (code) {
    code.each((i, el) => {
      hljs.highlightElement(el);
      var button = createButton(['code-ui', 'code-ui--button', 'code-ui--button--copy']);
      var buttonContainer = document.createElement('div');
      buttonContainer.classList.add('code-copy-button-container');
      buttonContainer.append(button);
      el.parentElement.appendChild(buttonContainer);
      el.parentElement.classList.add('relative');
      button.addEventListener('click', (e) => {
        copy(el.textContent);
        shoutCopied(el);
      });
    });

    const mermaid = $("pre.mermaid");
    if (mermaid) {
      mermaid.each((i, diagram) => {
        var button = createButton(['code-ui', 'code-ui--button', 'code-ui--button--switch']);
        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('mermaid-switch-button-container');
        buttonContainer.append(button);
        diagram.before(buttonContainer);
        button.addEventListener('click', (e) => {
          booleanToogle(button);
          showDiagramCode(diagram);
        });
      });
    }
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
