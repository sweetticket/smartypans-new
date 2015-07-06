/*

Template Name: Superawesome
Template Demo: http://awerest.com/demo/superawesome
Purchase: http://themeforest.net/item/superawesome-retina-bootstrap-3-app-landing-page/3597882?ref=awerest
Author: Awerest
Author website: http://awerest.com
Tags: Responsive, Mobile First, Retina, Bootstrap 3, One Page, Multi-Purpose, Landing Page, App, Clean, Creative, Minimal, Business, White, Modern

Version: 2.5

---------------

Table of Contents:

1) Fix for IE & Windows Phone
2) Animated elements (Parallax)
3) Video backgorund
4) Scroll on anchors
5) Gallery lightbox
6) Form
7) Preloader

---------------

*/

$(document).ready(function() {
	'use strict';

/* ==== 1) Fix for Internet Explorer 10 in Windows 8 and Windows Phone 8 ==== */

	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement("style")
		msViewportStyle.appendChild(
			document.createTextNode(
				"@-ms-viewport{width:auto!important}"
			)
		)
		document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
	}

/* ==== 2) Animated elements ==== */

/* After all images are loaded, and if it's no-touch device, run script */

	imagesLoaded(document.body, function(){
		if ($('.no-touch').length) {
			skrollr.init({
				smoothScrolling: false,
				easing: 'sqrt',
				forceHeight: false
			});
		}
	});

/* ==== 3) Video backgorund ==== */

	var $videohero = $('.video-hero');
	if ( $videohero.length) {
		var BV = new $.BigVideo({useFlashForFirefox:false, container:$('.video-hero')});
		BV.init();
		if (Modernizr.touch) {
			BV.show('http://placehold.it/1600x900/ffffff/000000');
		} else {
			BV.show('img/video-bg.mov',{altsource:'img/video-bg.ogv',ambient:true});
		}
	}

/* ==== 4) Scroll on anchors ==== */

	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 700);
				return false;
			}
		}
	});
 
/* ==== 5) Gallery lightbox ==== */

	$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
		event.preventDefault();
		$(this).ekkoLightbox();
	});

/* ==== 6) Form ==== */

	$('.flowuplabels').FlowupLabels({
		feature_onInitLoad: false, 
		class_focused: 'focused',
		class_populated: 'populated' 
	});

	var options = {
		target: '.message .alert',
		beforeSubmit: showRequest,
		success: showResponse
	};

	$('#contactForm').ajaxForm(options);
	function showRequest(formData, jqForm, options) {
		var queryString = $.param(formData);
			return true;
		}
	function showResponse(responseText, statusText) {
		}

/* ==== 7) Preloader ==== */

	function updateDots(){ 
	$(".dot").each(function(i){
		var scale=1;
		var cur=$(this);
		var pos=cur.position();
		$(".dot:not(.dot:eq("+i+"))").each(function(){
			var cur2=$(this); 
			var pos2=cur2.position();
			var dx=pos2.left-pos.left;
			var dy=pos2.top-pos.top;
			var distance=Math.sqrt((dx*dx)+(dy*dy));
			var max=20;
			var p=Math.max(0,(max-distance)/max);
			scale+=(1.5-scale)*0.4*p;
		})
			cur.children(".dot-gfx").css({
			transform:"scale("+(scale)+","+scale+")"
		})
	})
	requestAnimationFrame(updateDots);
	}
	updateDots();

	$('.dots').fadeOut();
	$('.preloader').delay(350).fadeOut('slow');

});