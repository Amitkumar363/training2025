


$(document).ready(function () {
    $("#toggleBtn").on("click", function () {
        alert("Toggle button clicked!");
        $("body").toggleClass("dark-mode");

        if ($("body").hasClass("dark-mode")) {
            $("#toggleBtn").text("Light Mode");
        } else {
            $("#toggleBtn").text("Dark Mode");
        }
    });
});