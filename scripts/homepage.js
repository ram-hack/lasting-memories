/* This script redirects clicks on a .homepage-tab to the .default-link
 * contained within.
 *
 * Author: Robin O'Connell
 * Date:   24 July 2019
**/

'use strict';

$(document).ready(function() {
    $('.homepage-tab').click(function(e) {
        // Find the .default-link and follow it
        $(this).find('.default-link').get(0).click();
    });

    $('.homepage-tab a').click(function(e) {
        // Prevent click event from bubbling up to .homepage-tab, which
        // will then call click() on the .default-link, resulting in an
        // infinite loop.
        e.stopPropagation()
    });
});
