/* This script powers the gallery section of the website. It allows for the
 * previewing of thumbnails on hover/touch, sticky preview, and progressive
 * loading of images.
 *
 * Author: Robin O'Connell
 * Date:   24 July 2019
**/

'use strict';

export default class Gallery {

    constructor(gallerySelector, thumbnailSelector, previewSelector) {
        $(document).ready(() => this.init(gallerySelector, thumbnailSelector, previewSelector));
    }

    init(gallerySelector, thumbnailSelector, previewSelector) {
        this.$gallery = $(gallerySelector);
        this.$thumbnails = $(thumbnailSelector);
        this.$preview = $(previewSelector);
        this.$previewImg = this.$preview.find('img');

        this.registerEventListeners();
    }

    registerEventListeners() {
        $(window).scroll((e) => this.onScroll(e));
        this.$thumbnails.mouseenter((e) => this.onMouseEnter(e));
    }

    onScroll(e) {
        let galleryTop = this.$gallery.offset().top;
        let scrollTop = $(window).scrollTop();

        let galleryHeight = this.$gallery.outerHeight();
        let previewHeight = this.$preview.outerHeight();
        let maxOffset = galleryHeight - previewHeight;

        if(scrollTop > galleryTop) {
            let previewOffset = scrollTop - galleryTop;

            if(previewOffset > maxOffset) {
                if(this.$preview.hasClass('scroll-end')) {
                    return;
                }

                previewOffset = maxOffset;
                this.$preview
                    .removeClass('scroll-start scroll-progress')
                    .addClass('scroll-end');
            }
            else {
                this.$preview
                    .removeClass('scroll-start scroll-end')
                    .addClass('scroll-progress');
            }

            this.$preview.css('top', previewOffset + 'px');
        }
        else {
            if(this.$preview.hasClass('scroll-start')) {
                return;
            }

            this.$preview
                .removeClass('scroll-progress scroll-start')
                .addClass('scroll-start');
            this.$preview.css('top', '');
        }
    }

    onMouseEnter(e) {
        let $thumb = $(e.currentTarget);
        this.$previewImg.attr('src', $thumb.data('full-res-src'));
    }

}
