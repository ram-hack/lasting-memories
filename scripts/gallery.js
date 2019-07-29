/* This script powers the gallery section of the website. It allows for the
 * previewing of thumbnails on hover/touch, sticky preview, and progressive
 * loading of images.
 *
 * Author: Robin O'Connell
 * Date:   24 July 2019
**/

'use strict';

export default class Gallery {

    constructor(navSelector, gallerySelector, thumbnailSelector, previewSelector) {
        $(document).ready(() => this.init(navSelector, gallerySelector, thumbnailSelector, previewSelector));
    }

    init(navSelector, gallerySelector, thumbnailSelector, previewSelector) {
        this.$nav = $(navSelector);
        this.$gallery = $(gallerySelector);
        this.$thumbnails = $(thumbnailSelector);
        this.$preview = $(previewSelector);
        this.$previewImg = this.$preview.find('img');

        this.thumbIdx = this.highResIdx = 0;
        this.loadNextThumbnail();

        this.registerEventListeners();
    }

    loadNextThumbnail() {
        if(this.thumbIdx < this.$thumbnails.length) {
            let $currentThumbnail = this.$thumbnails.eq(this.thumbIdx);

            let $img = $('<img alt="">');
            $img.prop('src', $currentThumbnail.data('thumbnail-src'));

            $currentThumbnail.append($img);

            this.thumbIdx++;
            $img.on('load', (e) => {
                $(e.currentTarget).parent().addClass('loaded');
                this.loadNextThumbnail();
            });
        }
        else {
            this.loadNextHighRes();
        }
    }

    loadNextHighRes() {
        let previouslyLoaded = this.$preview.find('#galleryImg' + this.highResIdx).length > 0;
        while(previouslyLoaded && this.highResIdx < this.$thumbnails.length) {
            this.highResIdx++;
            previouslyLoaded = this.$preview.find('#galleryImg' + this.highResIdx).length > 0;
        }

        if(this.highResIdx < this.$thumbnails.length) {
            let $img = this.loadHighRes(this.highResIdx);

            this.highResIdx++;
            $img.on('load', (e) => {
                setTimeout(
                () => this.loadNextHighRes(), 1000);
            });
        }
    }

    loadHighRes(idx) {
        let $currentThumbnail = this.$thumbnails.eq(idx);

        let $img = $('<img alt="">');
        $img.prop('id', 'galleryImg' + idx);
        $img.prop('src', $currentThumbnail.data('thumbnail-src'));

        this.$preview.append($img);

        $img.on('load', (e) => {
            $(e.currentTarget).addClass('loaded');
        });

        return $img;
    }

    registerEventListeners() {
        $(window).resize((e) => this.onScroll(e));
        $(window).scroll((e) => this.onScroll(e));
        this.$thumbnails.mouseenter((e) => this.onMouseEnter(e));
    }

    onScroll(e) {
        let galleryTop = this.$gallery.offset().top;
        let scrollTop = this.$nav.offset().top + this.$nav.outerHeight();

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
        }
        else {
            if(this.$preview.hasClass('scroll-start')) {
                return;
            }

            this.$preview
                .removeClass('scroll-progress scroll-start')
                .addClass('scroll-start');
        }
    }

    onMouseEnter(e) {
        let idx = $(e.currentTarget).index();
        let $highRes = $('#galleryImg' + idx);

        if($highRes.length === 0) {
            $highRes = this.loadHighRes(idx);
        }

        this.$preview.children().removeClass('show');
        $highRes.addClass('show');
    }

}
