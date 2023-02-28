$(function() {
    
    // Fixed Header
    var polH = $("#politika").innerHeight(),
    header_pol = $("#header_pol"),
    scrollOffset_pol = $(window).scrollTop();

    checkScroll(scrollOffset_pol);

    $(window).on("scroll", function() {
        scrollOffset_pol = $(this).scrollTop();
        checkScroll(scrollOffset_pol);
    });

    function checkScroll(scrollOffset_pol) {
        if (scrollOffset_pol >= 100) {
            header_pol.addClass("fixed");
        } else {
            header_pol.removeClass("fixed");
        }
    }

 // Menu Nav Toggle
 $("#nav_toggle_pol").on("click", function(event) {
    event.preventDefault();
    $(this).toggleClass("active");
    $("#nav_pol").toggleClass("active");
    $('body').toggleClass('lock');
});
$(document).on('click', '.nav_pol > a, .header__logo, .section__politika, .footer', e => {
    $('#nav_toggle_pol, #nav_pol').removeClass('active');
    $('body').removeClass('lock');
});


})