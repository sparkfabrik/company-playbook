$(document).on('ready', function() {
    // to close all item of the menu (desktop version)
    $('#menu__general-toggle').change(function () {
      $('input[id^="menu__toggle-"]').prop('checked',this.checked);
    });

    $('input[id^="menu__toggle-"]').change(function () {
    if ($('input[id^="menu__toggle-"]:checked').length == $('input[id^="menu__toggle-"]').length){
      $('#menu__general-toggle').prop('checked',true);
    }
    else {
      $('#menu__general-toggle').prop('checked',false);
    }
    });

    // add overflow:hidden to body on mobile version
    $('#menu__general-toggle').change(function () {
      if ( ($( window ).width()) <= 767) {
        if ($('#menu__general-toggle').is(':checked')) {
          $("body").css({"overflow":"visible"});
        } else {
          $("body").css({"overflow":"hidden"});
        }
      }
    });
    $(window).on('resize', function(){
      var win = $(this); //this = window
      if (win.height() >= 768) { 
        $("body").removeAttr("style") 
      }
    });
});

