$(document).on("ready",(function(){$("#menu__general-toggle").change((function(){$('input[id^="menu__toggle-"]').prop("checked",this.checked)})),$('input[id^="menu__toggle-"]').change((function(){$('input[id^="menu__toggle-"]:checked').length==$('input[id^="menu__toggle-"]').length?$("#menu__general-toggle").prop("checked",!0):$("#menu__general-toggle").prop("checked",!1)})),$("#menu__general-toggle").change((function(){$(window).width()<=767&&($("#menu__general-toggle").is(":checked")?$("body").css({overflow:"visible"}):$("body").css({overflow:"hidden"}))})),$(window).on("resize",(function(){$(this).height()>=768&&$("body").removeAttr("style")}))}));