$(function () {
    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, else we gonna set it if we can.
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });
});

$(window).on("load", function () {

    $(".loader").fadeOut(500, function () {
        $('body').css("overflow", "auto");
        $('body').animate({
            scrollTop: 0
        }, 1);
        AOS.init();
    });
});
$(document).ready(function () {
    /////////Slider/////////
    $('.main-slider').owlCarousel({
        items: 1,
        lazyLoad: true,
        autoplay: false,
        rtl: document.dir == 'rtl' ? true : false,
        loop: true,
        dots: true,
        nav: true,
        navText: ["<i class='fas fa-chevron-right'></i>", "<i class='fas fa-chevron-left'></i>"],
        responsive: {
            0: {
                items: 1,
                dots: true,
                nav: false
            },
            768: {
                items: 1,
                dots: true,
                nav: true
            },
        }
    });
    /////////Accordion/////////
    if ($(window).width() <= 767) {
        $(".nav-foot-header").addClass("mo-accordion");
        $(".nav-foot").addClass("mo-panel");
    }
    $('.mo-accordion').click(function () {
        var x = $(this).siblings().prop('scrollHeight') + 12 + "px";
        $(".mo-accordion").not(this).removeClass("active");
        $(this).toggleClass("active");
        if ($(this).siblings().css('max-height') == '0px') {
            $(this).siblings().css('max-height', x);
            $(this).siblings().css('padding-top', "15px");
        } else {
            $(this).siblings().css('max-height', '0');
            $(this).siblings().css('padding-top', "0");
        }

        $(".mo-accordion").not(this).siblings().css('max-height', '0');
        $(".mo-accordion").not(this).siblings().css('padding-top', "0");
        console.log()
    })
    /////////Menu/////////
    $('.mo-menu-icon').click(function () {
        $(".navbar-cont").fadeIn(1000);
        $(".mo-navbar").toggleClass("nav-in");
        $("body").toggleClass("overflow");
    });
    $('.navbar-cont').click(function () {
        $(".navbar-cont").fadeOut(400);
        $(".mo-navbar").toggleClass("nav-in");
        $("body").toggleClass("overflow");
    });
    $('.mo-navbar').click(function (e) {
        e.stopPropagation();
    });
    $('.mo-search-icon').click(function () {
        $(".search-form").fadeIn(500);
        $("body").toggleClass("overflow");
        $('.search-input').focus();
    });
    $('.search-form').click(function () {
        $("body").removeClass("overflow");
        $(".search-form").fadeOut(500);
    });
    $('.search-cont').click(function (e) {
        e.stopPropagation();
    });

    $('.close-btn').click(function () {
        $(".navbar-cont").fadeOut(350);
        $(".mo-navbar").removeClass("nav-in");
        $("body").removeClass("overflow");
        $(".search-form").fadeOut(300);
    });
});