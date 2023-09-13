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
});
