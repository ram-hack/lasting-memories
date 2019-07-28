'use strict';
$(document).ready(function() {

    var queryStart = true; //Keeps animation from running for hamburger on page load or screen size change.
    $("#hamburger").click(function() {
        $("#button-container").removeClass("closed");
        $("#hamburger").toggleClass("forward");

        $(".navButton").each(function(i) {
            $(this).toggleClass("navForward");
        });

        if (!queryStart) {
            $("#hamburger").toggleClass("backward");
            $(".navButton").each(function(i) {
                $(this).toggleClass("navBackward");
            });
        }
        queryStart = false;

    });

    function mediaChanges(mediaQuery) {
        //small screen

        if (mediaQuery.matches) {
            $("#button-container").addClass("hamMenu closed");

        } else {
            //big screen

            $("#button-container").removeClass("hamMenu closed");
            $("#hamburger").removeClass("forward");
            $("#hamburger").removeClass("backward");

            $(".navButton").each(function(i) {
                $(this).removeClass("navForward");
            });

            $(".navButton").each(function(i) {
                $(this).removeClass("navBackward");
            });

            queryStart = true;

        }
    }
    var mediaQuery = window.matchMedia("(max-width:800px)");
    mediaChanges(mediaQuery);
    mediaQuery.addListener(mediaChanges);


});