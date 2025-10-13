$(function () {
    $(".hamburger").on("click", function () {
        $(".header-top").toggleClass("active");
    });

    $(".close").on("click", function () {
        $(".header-top").removeClass("active");
    });
});    
