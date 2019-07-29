'use strict';
$(document).ready(function() {

    var queryStart = true; //Keeps animation from running for hamburger on page load or screen size change.
    $("#hamburger").click(function() {
        if (queryStart) {
            $("#nav-buttons").removeClass("closed");
        }

        $("#shutter-layer").toggleClass("grow");
        $("#X-layer").toggleClass("hidden");
        // $(".navButton").each(function(i) {
        //     $(this).toggleClass("navForward");
        // });

        if (!queryStart) {
            // $("#hamburger").toggleClass("backward");
            // $(".navButton").each(function(i) {
            //     $(this).toggleClass("navBackward");
            // });
            console.log("in if");
            console.log(queryStart);
            $("#nav-buttons").toggleClass("closed");
        }
        queryStart = false;

    });

    function mediaChanges(mediaQuery) {
        //small screen

        if (mediaQuery.matches) {
            $("#nav-buttons").addClass("hamMenu closed");
            $("#X-layer").addClass("hidden");
            $("#shutter-layer").removeClass("grow");

        } else {
            //big screen

            $("#nav-buttons").removeClass("hamMenu closed");
            // $("#hamburger").removeClass("forward");
            // $("#hamburger").removeClass("backward");
            //
            // $(".navButton").each(function(i) {
            //     $(this).removeClass("navForward");
            // });
            //
            // $(".navButton").each(function(i) {
            //     $(this).removeClass("navBackward");
            // });

            queryStart = true;

        }
    }
    var mediaQuery = window.matchMedia("(max-width:1200px)");
    mediaChanges(mediaQuery);
    mediaQuery.addListener(mediaChanges);


});