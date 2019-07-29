'use strict';

$(document).ready(function() {
    $("#nav-buttons").addClass("ready");
    $("#X-layer").addClass("ready");
    if ($(document).scrollTop() != 0) {
        // make small navbar when loaded and not scrolled at the very top
        $('#navbar').addClass('shrink');

        $('#logo').css({
            'padding': '0 2vh'
        })
    }
    $(document).scroll(function() {
        // shrink navbar when not scrolled to the top
        if ($(document).scrollTop() != 0) {
            $('#navbar').addClass('shrink');

            $('#logo').css({
                'padding': '0 2vh'
            })
        } else {
            // Bring back to normal height when scrolled to the top
            $('#navbar').removeClass('shrink');
            $('#logo').css({
                'padding': '2vh'
            })
        }
    })

    $('#logo').click(function() {
        window.location.href = "index.html";
    })
});