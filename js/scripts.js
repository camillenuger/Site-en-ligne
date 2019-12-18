/*-----------------------------------------------------------------------------------*/
/*	CUSTOM FUNCTIONS
/*-----------------------------------------------------------------------------------*/
jQuery.fn.slideFadeToggle  = function(speed, easing, callback) {
	return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};
function ajax_width(el) {
	var winW = jQuery(window).width(),
		finalW = winW - 380;
		
	el.css('width', finalW);
	
	if(winW < 769) {
		el.css('width','100%');
	}
}
function center_img() {
	jQuery('.ajax-slider').find('.images, .ajax-prev, .ajax-next').hide();
	setTimeout(function() {
		// Vertically center project images
		var boxH = jQuery('.ajax-slider').height(),
			imgH = jQuery('.ajax-slider').find('figure').height(),
			marginH = (boxH - imgH) / 2;
		jQuery('.ajax-slider').find('.images').css('margin-top', marginH);
		jQuery('.ajax-slider').find('.images, .ajax-prev, .ajax-next').show();
	}, 0);
}
var resizingHandler = function(force) {
    var execute = typeof(force) === 'undefined' ? false : (force === true),
    	new_width = jQuery(window).outerWidth();
    if(execute || new_width != window.current_window_width){
        if(!execute){
            window.current_window_width = new_width;
        }
		jQuery('body').removeClass('pushed-left').removeClass('pushed-left-alt');
		jQuery('#menu-button').removeClass('open');
        setTimeout(function(){
            jQuery('.slider-overlay').each(function(){
                var $so  = jQuery(this),
                	$fs  = $so.next('flexslider').children('.flex-viewport').first(),
                	so_h = $so.outerHeight(),
                	fs_h = $fs.outerHeight();
                if(so_h > fs_h){
                    $so.css({'min-height': fs_h+'px'});
                }else{
                    $so.removeAttr('style');
                }
            });
        }, 420);
    }
};
function ebor_load_project($el){
	var projectLink = $el.attr('href');
	jQuery('#project-slider, #project-title').fadeOut(200);
	setTimeout(function() {
		jQuery('.ajax-sidebar, .ajax-slider').html('');
	}, 200);
	setTimeout(function() {
		jQuery('.ajax-sidebar').load(projectLink + ' #project-title');
		jQuery('.ajax-slider').load(projectLink + ' #project-slider', function(result) {
			jQuery('#project-slider').hide();
			jQuery(this).find('img').load(function() {
				center_img();
				jQuery('#project-slider').fadeIn(300);
			});
		});
	}, 200);
	setTimeout(function() {
	jQuery('#project-title').fadeIn(300);
	}, 400);
}
/*-----------------------------------------------------------------------------------*/
/*	DOCUMENT READY FUNCTIONS
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
"use strict";

	var scrollPos   = 0,
		$window     = jQuery(window);
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		jQuery('body').addClass('touch')
	}
	
	jQuery('.retina').retinise();
	jQuery('p:empty').remove();
	jQuery('.service_box').parent().css('text-align','center');
	jQuery(".container").fitVids();
	jQuery('.sub-menu').not('.current_page_item .sub-menu, .current-menu-ancestor .sub-menu').addClass('hidden');
	
	//Sub Menus
	jQuery('.sub-menu').prev('a').click(function(){
		
		if(!( jQuery(this).attr('href') == '#' ))
			return true;
		
		var $subNav = jQuery(this).next('.sub-menu'),
			$othernav = jQuery(this).parents().find('.sub-menu');
		
		if($subNav.hasClass('hidden')){
			$othernav.slideUp(420, function(){
				jQuery(this).addClass('hidden');
			});
			$subNav.hide().removeClass('hidden').stop().slideDown(420);
		} else {
			$subNav.stop().slideUp(420, function(){
				jQuery(this).addClass('hidden');
			});
		}
		
		return false;
	});
	
	/**
	 * Service element
	 */
	jQuery('.service_item').on('click touchend', function(e){
		var $this  = jQuery(this),
			$popup = $this.children('.service_details').first();
		
		$this.toggleClass('open').siblings().removeClass('open');
		$popup.css({'margin-left': (-1*(Math.round($popup.outerWidth()/2)))+'px'});
	}).hover(function(e){      
		var $this  = jQuery(this),
			$popup = $this.children('.service_details').first();
			
		$this.addClass('hover').siblings().removeClass('hover');
		$popup.css({'margin-left': (-1*(Math.round($popup.outerWidth()/2)))+'px'});
	}, function(e){
		jQuery(this).removeClass('hover');
	});
	
	jQuery('#menu-button').click(function() {
		jQuery('#menu-close-button').toggleClass('toggle-inline');
	});
	
	if ( jQuery(window).width() < 960) {
		jQuery('#main-nav li a').click(function() {
			jQuery('#menu-close-button').toggleClass('toggle-inline');
		});
	}
	
	//AJAX STUFF
	// Open Project overlay
	jQuery('.element.portfolio a').not('.permalink').click(function(){
		scrollPos = jQuery(document).scrollTop();
		jQuery('.wrapper').addClass('hide');
		jQuery('#ajax-content').addClass('visible');
		ebor_load_project(jQuery(this));
		setTimeout(function() {
			ajax_width(jQuery('#ajax-content.visible .ajax-slider #project-slider'));
		}, 600);
		return false;
	});

	// Close project overlay
	jQuery('.ajax-close').on('click', function(){
		
		jQuery('#ajax-content').removeClass('visible');
		
		setTimeout(function() {
			jQuery('.wrapper').removeClass('hide');
			jQuery('.ajax-sidebar, .ajax-slider').html('');
		}, 300);
		
		setTimeout(function() {
			jQuery(document).scrollTop(scrollPos);
		}, 300);
		
	});
	
	 jQuery(document).ajaxComplete(function() {
		  jQuery('.ajax-slider').trigger('contentchanged');
			jQuery(this).find('img').load(function() {
				center_img();
				jQuery('#project-slider').fadeIn(300);
			});
		  ajax_width(jQuery('#ajax-content.visible .ajax-slider #project-slider'));
	 });
	
	
	// Prev and Next programming
	jQuery('.ajax-slider').bind('contentchanged', function() {
		jQuery('.ajax-next').click(function(){
			ebor_load_project(jQuery(this));
			return false;
		});
		
		jQuery('.ajax-prev').click(function(){
			ebor_load_project(jQuery(this));
			return false;
		});
	});
	
	jQuery('.ajax-more').on('click', function(){
		if (jQuery('.ajax-sidebar').hasClass('collapsed')) {
			jQuery(this).html(jQuery(this).attr('data-show'));
			jQuery('.ajax-sidebar').removeClass('collapsed');
		} else {
			jQuery(this).html(jQuery(this).attr('data-hide'));
			jQuery('.ajax-sidebar').addClass('collapsed');
		}
	});
	
	jQuery(window).resize(function(){
		ajax_width(jQuery('#ajax-content.visible .ajax-slider #project-slider'));
		center_img();
	});
	
	window.current_window_width = 0;
	$window.debounceEvent('resize', resizingHandler, 120);
	
	var alternate_menu_behavior = jQuery.browser.safari || isMobile.iOS();
	
	// main menu huntington
	jQuery('#menu-button, #menu-close-button').on('click touchend', function(e){
		e.preventDefault();
		if(alternate_menu_behavior){
			jQuery('body').toggleClass('pushed-left-alt');
			jQuery('#menu-button').toggleClass('open');
		} else {
			jQuery('body').toggleClass('pushed-left');
			jQuery('#menu-button').toggleClass('open');
		}
	});
	jQuery('#content').on('click touchend', function(e){
		var $body = jQuery('body'),
			$target = jQuery(e.target);
		if(($body.hasClass('pushed-left-alt') || $body.hasClass('pushed-left')) && $target.closest('#main-nav').length === 0 && $target.closest('#menu-button').length === 0){
			e.preventDefault();
			$body.removeClass('pushed-left-alt').removeClass('pushed-left');
			jQuery('#menu-button').removeClass('open');
		}
	});

	
});
/*-----------------------------------------------------------------------------------*/
/*	WINDOW LOAD FUNCTIONS
/*-----------------------------------------------------------------------------------*/
jQuery(window).bind("load", function() {
    jQuery('#container').not('.touch #container, .blog-overview #container').sliphover();
});
jQuery(window).load(function($){
	"use strict";
	
	function eborLoadIsotope(){
		var $container = jQuery('#container, #team'),
			$options = jQuery('#main-nav a[href^="#"]').not('#main-nav a[href="#"]'),
			isOptionLinkClicked = false;
		
		$container.isotope({
			itemSelector : '.element',
			resizable: false,
			masonry: { columnWidth: $container.width() / 12 },
			filter: '*',
			sortBy: 'original-order',
			sortAscending: true,
			transitionDuration: '0.6s',
			layoutMode: 'masonry',
		});
		
		if( jQuery('body').hasClass('video-detail') )
		  $container.isotope({
			transformsEnabled: false,
		});	
			
		jQuery(window).smartresize(function(){
			$container.isotope({
				masonry: { columnWidth: $container.width() / 12 }
			});
		});
	  
		$options.click(function(){
		    var $this = jQuery(this),
		    	href = $this.attr('href');
		    	
		    if ( $this.hasClass('selected') ) {
		    	return;
		    } else {
		    	$options.removeClass('selected');
		    	$this.addClass('selected');
		    }

		    jQuery.bbq.pushState( '#' + href );
		    isOptionLinkClicked = true;
		    return false;
		});
	
		jQuery(window).bind( 'hashchange', function( event ){
			var theFilter = window.location.hash.replace( /^#/, '');
			
			if( theFilter == false || 'home' == theFilter ){
				theFilter = 'home';
				jQuery('a[href="#home"]').addClass('selected');
			}
				
			$container.isotope({
				filter: '.' + theFilter
			});
			
			if ( isOptionLinkClicked == false ){
				$options.removeClass('selected');
				jQuery('a[href="#'+ theFilter +'"]').addClass('selected');
			}
			
			isOptionLinkClicked = false;
			
		}).trigger('hashchange');
		
		$options.each(function(){
			var theHref = jQuery(this).attr('href').replace( /^#/, '');
			jQuery(this).append(' <span class="portfolio-count">('+ jQuery('div.element.'+theHref).length +')</span>')
		});
		
	}
	
	/**
	 * Load isotope conditionally, if we've got a flexslider we wait until that's ready, otherwise go straight ahead.
	 */
	if ( jQuery('.flexslider')[0] ) {
		jQuery('.flexslider').flexslider({
		animation: "slide",
		start: function(slider){
		    setTimeout(function(){ eborLoadIsotope(); }, 420);
		}
	});
	} else {
		eborLoadIsotope();
	}
	
	jQuery(window).trigger('resize').trigger('smartresize');
	
	jQuery("#status").fadeOut(350);
	jQuery("#preloader").delay(350).fadeOut(200);
	
});