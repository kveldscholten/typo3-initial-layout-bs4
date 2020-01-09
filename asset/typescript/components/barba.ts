// do not import Barba like this if you load the library through the browser
import barba from '@barba/core';

/**
 * default Scroll Position: <div data-barba-scroll></div>
 * overlay: <div class="barba-overlay"></div>
 * html: <div data-barba="wrapper"><div data-barba="container">.......</div></div>
 */
export default class BarbaJS {
    private overlay:any;
    private selector:string;

    constructor() {
        this.selector = '#navigation > .navbar';
        this.overlay = jQuery('.barba-overlay');
        var me = this;
        // init Barba with a default "opacity" transition
        barba.init({
            timeout: 5000,
            prevent: (data) => this.prevent(data),
            transitions: [{
                name: 'legacy-example',
                leave: function (data) {
                    var done = this.async();
                    if(me.overlay.length > 0) {
                        me.overlay.on('transitionend webkitTransitionEnd oTransitionEnd', () => {
                            done();
                        });
                        me.overlay.addClass('show');
                    } else {
                        done();
                    }
                },
                enter: function(){
                    jQuery('html, body').animate({
                        scrollTop: 0
                    }, 10);
                },
                afterEnter: function (data) {
                    if(me.overlay.length > 0) me.overlay.removeClass('show');
                    me.afterEnter(data);
                }
            }]
        });
    }

    afterEnter(data:any) {
        // scroll trigger
        this.barbaScroll(data.trigger);
        // rebind powermail
        this.powermail();
    }

    powermail(){
        if(typeof window.PowermailForm == 'undefined') return;
        var t = new window.PowermailForm(jQuery);
        t.initialize()
    }
    barbaScroll(trigger:any) {
        var href = trigger.href,
            target:any = false,
            position: any = 0;
        // default scroll element exist
        if(href.indexOf('#') != -1){
            target = jQuery('#'+href.split("#")[1]);
        } else {
            // try to find default scroll position
            target = jQuery('[data-barba-scroll]');
        }

        if(target && target.length > 0){
            setTimeout(() => {
                position = target.offset().top - parseInt(jQuery(this.selector).outerHeight() || 0);

                jQuery('html, body').stop().animate({
                    scrollTop: position
                }, 1500);
            }, 500);
        }
    }

    prevent(data:any) {
        return data.event.defaultPrevented;
    }
}