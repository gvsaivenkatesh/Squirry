/* =========================================================
   SQUIRRY FOOD - HOME PAGE JAVASCRIPT
   File Name: home.js

   Features:
   1. Search functionality
   2. Enter key search
   3. Category selection
   4. Category horizontal scrolling
   5. Navigation active state
   6. Shop Now button
   7. Hero slider
   8. Slider dots
   9. Automatic slider rotation
   10. Previous / Next slider buttons
   11. Image error handling
   12. Scroll-to-top
========================================================= */


document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HELPER FUNCTIONS
    ===================================================== */

    function findFirst(selectors) {

        for (let i = 0; i < selectors.length; i++) {

            const element = document.querySelector(selectors[i]);

            if (element) {
                return element;
            }
        }

        return null;
    }


    function findAll(selectors) {

        const elements = [];

        selectors.forEach(function (selector) {

            document
                .querySelectorAll(selector)
                .forEach(function (element) {

                    if (!elements.includes(element)) {
                        elements.push(element);
                    }

                });

        });

        return elements;
    }



    /* =====================================================
       SEARCH FUNCTIONALITY
    ===================================================== */

    const searchInput = findFirst([

        "#searchInput",

        ".search-input",

        ".search-bar input",

        ".search-box input",

        'input[type="search"]'

    ]);


    const searchButton = findFirst([

        "#searchButton",

        ".search-button",

        ".search-btn",

        ".search-icon",

        '[data-action="search"]'

    ]);


    function performSearch() {

        if (!searchInput) {
            return;
        }


        const searchValue = searchInput.value.trim();


        if (searchValue === "") {

            searchInput.focus();

            return;
        }


        /*
            Default search page:

            search.html?q=product

            If your search page has another name,
            change search.html below.
        */


        const customSearchUrl =
            searchInput.getAttribute("data-search-url");


        if (customSearchUrl) {

            const separator =
                customSearchUrl.includes("?")
                    ? "&"
                    : "?";


            window.location.href =
                customSearchUrl +
                separator +
                "q=" +
                encodeURIComponent(searchValue);

        }

        else {

            window.location.href =
                "search.html?q=" +
                encodeURIComponent(searchValue);

        }

    }



    /* Search button */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                performSearch();

            }
        );

    }



    /* Enter key */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    performSearch();

                }

            }
        );

    }



    /* =====================================================
       CATEGORY ITEMS
    ===================================================== */

    const categoryItems = findAll([

        ".category-card",

        ".category-item",

        ".category-btn",

        ".category-button",

        "[data-category]"

    ]);


    categoryItems.forEach(function (category) {

        category.addEventListener(
            "click",
            function () {


                /* Remove active */

                categoryItems.forEach(
                    function (item) {

                        item.classList.remove("active");

                    }
                );


                /* Add active */

                category.classList.add("active");


                /* Scroll category into view */

                category.scrollIntoView({

                    behavior: "smooth",

                    block: "nearest",

                    inline: "center"

                });


                /* Category navigation */

                const categoryUrl =

                    category.getAttribute("data-href") ||

                    category.getAttribute("data-url") ||

                    category.getAttribute("href");


                if (
                    categoryUrl &&
                    categoryUrl !== "#"
                ) {

                    window.location.href =
                        categoryUrl;

                }

            }
        );

    });



    /* =====================================================
       CATEGORY HORIZONTAL SCROLL
    ===================================================== */

    const categoryContainer = findFirst([

        ".category-list",

        ".categories-list",

        ".category-row",

        ".categories-row"

    ]);


    const categoryPrevButton = findFirst([

        ".category-prev",

        ".categories-prev",

        '[data-category-scroll="prev"]'

    ]);


    const categoryNextButton = findFirst([

        ".category-next",

        ".categories-next",

        '[data-category-scroll="next"]'

    ]);



    /* Previous */

    if (
        categoryContainer &&
        categoryPrevButton
    ) {

        categoryPrevButton.addEventListener(
            "click",
            function () {

                categoryContainer.scrollBy({

                    left: -300,

                    behavior: "smooth"

                });

            }
        );

    }



    /* Next */

    if (
        categoryContainer &&
        categoryNextButton
    ) {

        categoryNextButton.addEventListener(
            "click",
            function () {

                categoryContainer.scrollBy({

                    left: 300,

                    behavior: "smooth"

                });

            }
        );

    }



    /* =====================================================
       NAVIGATION ACTIVE STATE
    ===================================================== */

    const navigationItems = findAll([

        ".nav-item",

        ".bottom-nav a",

        ".bottom-nav button",

        ".navigation-item",

        "[data-nav]"

    ]);


    let currentPage =
        window.location.pathname
            .split("/")
            .pop();


    if (!currentPage) {

        currentPage = "index.html";

    }


    navigationItems.forEach(
        function (navItem) {

            const href =
                navItem.getAttribute("href");


            if (href) {

                const hrefPage =
                    href
                        .split("/")
                        .pop()
                        .split("?")[0];


                if (
                    hrefPage === currentPage
                ) {

                    navItem.classList.add(
                        "active"
                    );

                }

            }


            navItem.addEventListener(
                "click",
                function () {

                    navigationItems.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    navItem.classList.add(
                        "active"
                    );

                }
            );

        }
    );



    /* =====================================================
       SHOP NOW BUTTON
    ===================================================== */

    const shopNowButtons = findAll([

        ".shop-now",

        ".shop-now-btn",

        ".shop-now-button",

        '[data-action="shop-now"]'

    ]);


    shopNowButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {


                    const buttonUrl =

                        button.getAttribute(
                            "data-href"
                        ) ||

                        button.getAttribute(
                            "data-url"
                        ) ||

                        button.getAttribute(
                            "href"
                        );


                    /*
                       If button already has
                       a real URL, allow it.
                    */

                    if (
                        buttonUrl &&
                        buttonUrl !== "#"
                    ) {

                        return;

                    }


                    event.preventDefault();


                    /*
                       Scroll to product area
                    */

                    const productsSection =
                        findFirst([

                            "#products",

                            "#offers",

                            ".products-section",

                            ".offers-section",

                            ".best-offers"

                        ]);


                    if (productsSection) {

                        productsSection
                            .scrollIntoView({

                                behavior:
                                    "smooth",

                                block:
                                    "start"

                            });

                    }

                }
            );

        }
    );



    /* =====================================================
       HERO SLIDER
    ===================================================== */

    const heroSlides = findAll([

        ".hero-slide",

        ".banner-slide",

        ".hero-banner .slide",

        "[data-hero-slide]"

    ]);


    const sliderDots = findAll([

        ".slider-dot",

        ".hero-dot",

        ".slider-dots .dot",

        ".hero-dots .dot",

        "[data-slide]"

    ]);


    const previousSlideButton =
        findFirst([

            ".hero-prev",

            ".slider-prev",

            ".banner-prev"

        ]);


    const nextSlideButton =
        findFirst([

            ".hero-next",

            ".slider-next",

            ".banner-next"

        ]);


    let currentSlide = 0;

    let autoSlideTimer = null;



    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function showSlide(index) {

        const totalSlides =
            Math.max(
                heroSlides.length,
                sliderDots.length
            );


        if (totalSlides === 0) {

            return;

        }


        /*
           Loop slider
        */

        if (index >= totalSlides) {

            index = 0;

        }


        if (index < 0) {

            index =
                totalSlides - 1;

        }


        currentSlide = index;



        /* Slides */

        heroSlides.forEach(
            function (slide, slideIndex) {

                if (
                    slideIndex ===
                    currentSlide
                ) {

                    slide.classList.add(
                        "active"
                    );


                    slide.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                }

                else {

                    slide.classList.remove(
                        "active"
                    );


                    slide.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

            }
        );



        /* Dots */

        sliderDots.forEach(
            function (dot, dotIndex) {

                if (
                    dotIndex ===
                    currentSlide
                ) {

                    dot.classList.add(
                        "active"
                    );


                    dot.setAttribute(
                        "aria-current",
                        "true"
                    );

                }

                else {

                    dot.classList.remove(
                        "active"
                    );


                    dot.setAttribute(
                        "aria-current",
                        "false"
                    );

                }

            }
        );

    }



    /* =====================================================
       SLIDER DOT CLICK
    ===================================================== */

    sliderDots.forEach(
        function (dot, index) {

            dot.addEventListener(
                "click",
                function () {

                    showSlide(index);

                    restartAutoSlider();

                }
            );

        }
    );



    /* =====================================================
       PREVIOUS SLIDE
    ===================================================== */

    if (previousSlideButton) {

        previousSlideButton.addEventListener(
            "click",
            function () {

                showSlide(
                    currentSlide - 1
                );

                restartAutoSlider();

            }
        );

    }



    /* =====================================================
       NEXT SLIDE
    ===================================================== */

    if (nextSlideButton) {

        nextSlideButton.addEventListener(
            "click",
            function () {

                showSlide(
                    currentSlide + 1
                );

                restartAutoSlider();

            }
        );

    }



    /* =====================================================
       AUTOMATIC HERO SLIDER
    ===================================================== */

    function startAutoSlider() {

        const slideCount =
            Math.max(
                heroSlides.length,
                sliderDots.length
            );


        if (slideCount <= 1) {

            return;

        }


        stopAutoSlider();


        autoSlideTimer =
            setInterval(
                function () {

                    showSlide(
                        currentSlide + 1
                    );

                },

                4000
            );

    }



    function stopAutoSlider() {

        if (autoSlideTimer) {

            clearInterval(
                autoSlideTimer
            );

            autoSlideTimer = null;

        }

    }



    function restartAutoSlider() {

        stopAutoSlider();

        startAutoSlider();

    }



    /* =====================================================
       PAUSE SLIDER ON HOVER
    ===================================================== */

    const heroSlider = findFirst([

        ".hero-slider",

        ".hero-banner",

        ".banner-slider"

    ]);


    if (heroSlider) {


        heroSlider.addEventListener(
            "mouseenter",
            function () {

                stopAutoSlider();

            }
        );


        heroSlider.addEventListener(
            "mouseleave",
            function () {

                startAutoSlider();

            }
        );


        heroSlider.addEventListener(
            "focusin",
            function () {

                stopAutoSlider();

            }
        );


        heroSlider.addEventListener(
            "focusout",
            function () {

                startAutoSlider();

            }
        );

    }



    /* Start Hero */

    showSlide(0);

    startAutoSlider();



    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    const allImages =
        document.querySelectorAll("img");


    allImages.forEach(
        function (image) {

            image.addEventListener(
                "error",
                function () {


                    /*
                       Prevent infinite fallback
                    */

                    if (
                        image.dataset
                            .errorHandled ===
                        "true"
                    ) {

                        return;

                    }


                    image.dataset
                        .errorHandled =
                        "true";


                    /*
                       Optional fallback:

                       <img
                         src="..."
                         data-fallback="assets/images/placeholder.png"
                       >
                    */

                    const fallbackImage =

                        image.getAttribute(
                            "data-fallback"
                        ) ||

                        image.getAttribute(
                            "data-placeholder"
                        );


                    if (fallbackImage) {

                        image.src =
                            fallbackImage;

                    }

                    else {

                        image.classList.add(
                            "image-error"
                        );


                        /*
                           Keeps layout intact
                           without showing
                           broken image icon
                        */

                        image.style.visibility =
                            "hidden";

                    }

                }
            );

        }
    );



    /* =====================================================
       SCROLL TO TOP BUTTON
    ===================================================== */

    const scrollTopButton =
        findFirst([

            "#scrollTop",

            ".scroll-top",

            ".scroll-to-top"

        ]);


    if (scrollTopButton) {


        window.addEventListener(
            "scroll",
            function () {

                if (
                    window.scrollY >
                    400
                ) {

                    scrollTopButton
                        .classList.add(
                            "show"
                        );

                }

                else {

                    scrollTopButton
                        .classList.remove(
                            "show"
                        );

                }

            }
        );


        scrollTopButton.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior:
                        "smooth"

                });

            }
        );

    }



    /* =====================================================
       VIEW ALL BUTTON
    ===================================================== */

    const viewAllButtons =
        findAll([

            ".view-all",

            ".view-all-btn",

            '[data-action="view-all"]'

        ]);


    viewAllButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    const url =

                        button.getAttribute(
                            "href"
                        ) ||

                        button.getAttribute(
                            "data-href"
                        );


                    if (
                        url &&
                        url !== "#"
                    ) {

                        return;

                    }


                    event.preventDefault();


                    console.log(
                        "View All clicked"
                    );

                }
            );

        }
    );



    /* =====================================================
       ADD TO CART BUTTON
    ===================================================== */

    const addToCartButtons =
        findAll([

            ".add-to-cart",

            ".cart-btn",

            '[data-action="add-cart"]'

        ]);


    addToCartButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {


                    button.classList.add(
                        "added"
                    );


                    const originalText =
                        button.innerHTML;


                    button.innerHTML =
                        "Added ✓";


                    setTimeout(
                        function () {

                            button.innerHTML =
                                originalText;


                            button.classList.remove(
                                "added"
                            );

                        },

                        1500
                    );

                }
            );

        }
    );



    /* =====================================================
       WISHLIST BUTTON
    ===================================================== */

    const wishlistButtons =
        findAll([

            ".wishlist-btn",

            ".heart-btn",

            '[data-action="wishlist"]'

        ]);


    wishlistButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    button.classList.toggle(
                        "active"
                    );

                }
            );

        }
    );



    /* =====================================================
       FINAL
    ===================================================== */

    console.log(
        "Squirry Home Page JavaScript loaded successfully."
    );

});