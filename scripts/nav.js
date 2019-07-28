'use strict';

$(document).ready(function() {
    if ($(document).scrollTop() != 0) {
        // make small navbar when loaded and not scrolled at the very top
        $('#navbar').css({
            'height': '6vh',
        });

        $('#logo').css({
            'padding': '0 2vh'
        })
    }
    $(document).scroll(function() {
        // shrink navbar when not scrolled to the top
        if ($(document).scrollTop() != 0) {
            $('#navbar').css({
                'height': '6vh',
            });

            $('#logo').css({
                'padding': '0 2vh'
            })
        } else {
            // Bring back to normal height when scrolled to the top
            $('#navbar').css({
                'height': '10vh',
            })
            $('#logo').css({
                'padding': '2vh'
            })
        }
    })

    $('#logo').click(function() {
        window.location.href = "index.html";
    })
});