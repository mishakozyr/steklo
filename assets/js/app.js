$(function() {

    // Lazy Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const windowHeight = document.documentElement.clientHeight;

    let lazyImagesPositions = [];
    if (lazyImages.length>0) {
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
                lazyScrollCheck();
            }
        });
    }

    window.addEventListener("scroll", lazyScroll);

    function lazyScroll() {
        if (document.querySelectorAll('img[data-src]').length > 0) {
            lazyScrollCheck();
        }
    }

    function lazyScrollCheck() {
        let imgIndex = lazyImagesPositions.findIndex(
            item => pageYOffset > item - windowHeight
        );
        if (imgIndex >= 0) {
            if (lazyImages[imgIndex].dataset.src) {
                lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
                lazyImages[imgIndex].removeAttribute('data-src');
            } 
            delete lazyImagesPositions[imgIndex];
        }
    }

    // Fixed Header
    var introH = $("#intro").innerHeight(),
        header = $("#header"),
        header__title = $("#header__title"),
        header__number = $("#header__number"),
        nav__link1 = $("#nav__link1"),
        nav__link2 = $("#nav__link2"),
        nav__link3 = $("#nav__link3"),
        nav__link4 = $("#nav__link4"),
        nav = $("#nav"),
        navburger = $("#nav_toggle"),
        scrollOffset = $(window).scrollTop();

    checkScroll(scrollOffset);

    $(window).on("scroll", function() {
        scrollOffset = $(this).scrollTop();
        checkScroll(scrollOffset);
    });

    function checkScroll(scrollOffset) {
        if (scrollOffset >= introH) {
            header.addClass("fixed");
            header__title.addClass("black");
            header__number.addClass("black");
            nav__link1.addClass("black");
            nav__link2.addClass("black");
            nav__link3.addClass("black");
            nav__link4.addClass("black");
            nav.addClass("black");
            navburger.addClass("black");
        } else {
            header.removeClass("fixed");
            header__title.removeClass("black");
            header__number.removeClass("black");
            nav__link1.removeClass("black");
            nav__link2.removeClass("black");
            nav__link3.removeClass("black");
            nav__link4.removeClass("black");
            nav.removeClass("black");
            navburger.removeClass("black");
        }
    }

    // Smooth Scroll
    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();
        var $this = $(this),
            blockId = $this.data('scroll'),
            blockOffset = $(blockId).offset().top;

        $("#nav a").removeClass("active");
        $this.addClass("active");

        $("html, body").animate({
            scrollTop: blockOffset
        });
    });

    // Menu Nav Toggle
    $("#nav_toggle").on("click", function(event) {
        event.preventDefault();
        $(this).toggleClass("active");
        $("#nav").toggleClass("active");
        $("#header__background-color").toggleClass("active");
        $('body').toggleClass('lock');
        $("#intro__title").toggleClass("active");
    });
    $(document).on('click', '.nav > a, .header__logo, .intro, .section, .footer', e => {
        $('#nav_toggle, #nav, #header__background-color, #intro__title').removeClass('active');
        $('body').removeClass('lock');
    });

    // Gallery
    $('.uslugi__slider').slick({
        arrows: true,
        adaptiveHeight: true,
        draggable: false,
        waitForAnimation: false
    });
    $('.slider__in__uslugi').slick({
        arrows: false,
        adaptiveHeight: true,
        dots:true,
        slidesToShow:1,
        draggable: false,
        autoplay:true,
        autoplaySpeed:3000
    });
    $('.slider__primeri').slick({
    arrows:true,
    dots:true,
    slidesToShow:3,
    draggable: false,
    waitForAnimation: false,
    autoplay:true,
    // speed:1000,
    autoplaySpeed:2000,
    responsive:[
        {
            breakpoint: 1024,
            settings: {
                slidesToShow:2
            }
        },
        {
            breakpoint: 425,
            settings: {
                slidesToShow:1
            }
        }
    ]
    });

    // Посмотреть фото 
    function onEntry(entry) {
        entry.forEach(change => {
            if (change.isIntersecting) {
                change.target.classList.add('element-show');
            }
        });
    }

    let options = {
    threshold: [0.5] };
    let observer = new IntersectionObserver(onEntry, options);
    let elements = document.querySelectorAll('.katalog-element-animation');

    for (let elm of elements) {
    observer.observe(elm);
    }

    // Slider
    $(".slider__primeri").magnificPopup({
        delegate: "a",
        type: "image",
        tLoading: 'Загрузка изображения #%curr%...',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        }
    });
    $(".katalog-list").magnificPopup({
        delegate: "a",
        type: "image",
        tLoading: 'Загрузка изображения #%curr%...',
        gallery: {
          enabled: false
        }
    });


    // Accordion Menu
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active-accordion");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
        panel.style.maxHeight = null;
        } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        } 
    });
    }


    // Active Nav при скроле
    var sections = $('section'),
    nav = $('nav'), 
    nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();
    
    sections.each(function() {
        var top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();
        
        if (cur_pos >= top && cur_pos <= bottom) {
        nav.find('a').removeClass('active');
        sections.removeClass('active');
        
        $(this).addClass('active');
        nav.find('a[data-scr="#'+$(this).attr('data-scr')+'"]').addClass('active');
        }
    });
    });

    nav.find('a').on('click', function () {
    var $el = $(this)
        , id = $el.attr('href');
    
    $('html, body').animate({
        scrollTop: $(id).offset().top - nav_height
    }, 500);
    
    return false;
    });




})