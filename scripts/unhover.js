/* Unhover enables a class to be attached to all elements within a container
 * that are not hovered over when one of their siblings is hovered over.
 *
 * Author: Robin O'Connell
 * Date:   14 July 2019
**/

'use strict';

export default class Unhover {

    constructor(containerSelector, unselectedClass) {
        this.unselectedClass = unselectedClass;

        $(document).ready(this.init.bind(this, containerSelector));
    }

    init(containerSelector) {
        this.$items = $(containerSelector).children();

        this.registerEventListeners();
    }

    registerEventListeners() {
        this.$items.mouseenter((e) => this.onMouseEnter(e));
        this.$items.mouseleave((e) => this.onMouseLeave(e));
    }

    onMouseEnter(e) {
        $(e.currentTarget).removeClass(this.unselectedClass);
        this.$items.not(e.currentTarget).addClass(this.unselectedClass);
    }

    onMouseLeave(e) {
        this.$items.removeClass(this.unselectedClass);
    }

}
