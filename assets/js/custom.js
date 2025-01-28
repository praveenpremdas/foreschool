(function ($) {


	"use strict";




	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		var box = $('.header-text').height();
		var header = $('header').height();




		if (scroll >= box - header) {
			$("header").addClass("background-header");
		} else {
			$("header").removeClass("background-header");
		}
	});


	$('.filters ul li').click(function () {
		$('.filters ul li').removeClass('active');
		$(this).addClass('active');


		var data = $(this).attr('data-filter');
		$grid.isotope({
			filter: data
		})
	});




	var $grid = $(".grid").isotope({
		itemSelector: ".all",
		percentPosition: true,
		masonry: {
			columnWidth: ".all"
		}
	})








	const Accordion = {
		settings: {
			// Expand the first item by default
			first_expanded: false,
			// Allow items to be toggled independently
			toggle: false
		},




		openAccordion: function (toggle, content) {
			if (content.children.length) {
				toggle.classList.add("is-open");
				let final_height = Math.floor(content.children[0].offsetHeight);
				content.style.height = final_height + "px";
			}
		},




		closeAccordion: function (toggle, content) {
			toggle.classList.remove("is-open");
			content.style.height = 0;
		},




		init: function (el) {
			const _this = this;




			// Override default settings with classes
			let is_first_expanded = _this.settings.first_expanded;
			if (el.classList.contains("is-first-expanded")) is_first_expanded = true;
			let is_toggle = _this.settings.toggle;
			if (el.classList.contains("is-toggle")) is_toggle = true;




			// Loop through the accordion's sections and set up the click behavior
			const sections = el.getElementsByClassName("accordion");
			const all_toggles = el.getElementsByClassName("accordion-head");
			const all_contents = el.getElementsByClassName("accordion-body");
			for (let i = 0; i < sections.length; i++) {
				const section = sections[i];
				const toggle = all_toggles[i];
				const content = all_contents[i];




				// Click behavior
				toggle.addEventListener("click", function (e) {
					if (!is_toggle) {
						// Hide all content areas first
						for (let a = 0; a < all_contents.length; a++) {
							_this.closeAccordion(all_toggles[a], all_contents[a]);
						}




						// Expand the clicked item
						_this.openAccordion(toggle, content);
					} else {
						// Toggle the clicked item
						if (toggle.classList.contains("is-open")) {
							_this.closeAccordion(toggle, content);
						} else {
							_this.openAccordion(toggle, content);
						}
					}
				});




				// Expand the first item
				if (i === 0 && is_first_expanded) {
					_this.openAccordion(toggle, content);
				}
			}
		}
	};




	(function () {
		// Initiate all instances on the page
		const accordions = document.getElementsByClassName("accordions");
		for (let i = 0; i < accordions.length; i++) {
			Accordion.init(accordions[i]);
		}
	})();








	$(document).on("click", ".naccs .menu div", function () {
		var numberIndex = $(this).index();


		if (!$(this).is("active")) {
			$(".naccs .menu div").removeClass("active");
			$(".naccs ul li").removeClass("active");


			$(this).addClass("active");
			$(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");


			var listItemHeight = $(".naccs ul")
				.find("li:eq(" + numberIndex + ")")
				.innerHeight();
			$(".naccs ul").height(listItemHeight + "px");
		}
	});








	$('.owl-service-item').owlCarousel({
		items: 4,
		loop: true,
		dots: true,
		nav: false,
		autoplay: true,
		margin: 15,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1000: {
				items: 4
			}
		}
	})




	$('.owl-testimonials').owlCarousel({
		items: 3,
		loop: true,
		dots: true,
		nav: false,
		autoplay: true,
		margin: 15,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	})






	// Menu Dropdown Toggle
	if ($('.menu-trigger').length) {
		$(".menu-trigger").on('click', function () {
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}








	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				var width = $(window).width();
				if (width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);
				}
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});




	$(document).ready(function () {
		try {
			$(document).on("scroll", onScroll);
			//smoothscroll
			$('.scroll-to-section a[href^="#"]').on('click', function (e) {
				e.preventDefault();
				$(document).off("scroll");


				$('.scroll-to-section a').each(function () {
					$(this).removeClass('active');
				})
				$(this).addClass('active');


				var target = this.hash,
					menu = target;
				var target = $(this.hash);
				$('html, body').stop().animate({
					scrollTop: (target.offset().top) - 79
				}, 500, 'swing', function () {
					window.location.hash = target.selector;
					$(document).on("scroll", onScroll);
				});
			});
		} catch (error) {

		}
	});




	function onScroll(event) {
		try {
			var scrollPos = $(document).scrollTop();
			$('.nav a').each(function () {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
					$('.nav ul li a').removeClass("active");
					currLink.addClass("active");
				}
				else {
					currLink.removeClass("active");
				}
			});
		} catch (error) {

		}
	}








	// Page loading animation
	$(window).on('load', function () {
		if ($('.cover').length) {
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}




		$("#preloader").animate({
			'opacity': '0'
		}, 600, function () {
			setTimeout(function () {
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});










	const dropdownOpener = $('.main-nav ul.nav .has-sub > a');




	// Open/Close Submenus
	if (dropdownOpener.length) {
		dropdownOpener.each(function () {
			var _this = $(this);




			_this.on('tap click', function (e) {
				var thisItemParent = _this.parent('li'),
					thisItemParentSiblingsWithDrop = thisItemParent.siblings('.has-sub');




				if (thisItemParent.hasClass('has-sub')) {
					var submenu = thisItemParent.find('> ul.sub-menu');




					if (submenu.is(':visible')) {
						submenu.slideUp(450, 'easeInOutQuad');
						thisItemParent.removeClass('is-open-sub');
					} else {
						thisItemParent.addClass('is-open-sub');




						if (thisItemParentSiblingsWithDrop.length === 0) {
							thisItemParent.find('.sub-menu').slideUp(400, 'easeInOutQuad', function () {
								submenu.slideDown(250, 'easeInOutQuad');
							});
						} else {
							thisItemParent.siblings().removeClass('is-open-sub').find('.sub-menu').slideUp(250, 'easeInOutQuad', function () {
								submenu.slideDown(250, 'easeInOutQuad');
							});
						}
					}
				}




				e.preventDefault();
			});
		});
	}








	function visible(partial) {
		try {
			var $t = partial,
				$w = jQuery(window),
				viewTop = $w.scrollTop(),
				viewBottom = viewTop + $w.height(),
				_top = $t.offset().top,
				_bottom = _top + $t.height(),
				compareTop = partial === true ? _bottom : _top,
				compareBottom = partial === true ? _top : _bottom;




			return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));
		} catch (error) {
			return false;
		}


	}




	$(window).scroll(function () {




		if (visible($('.count-digit'))) {
			$('.count-digit').each(function () {
				var $this = $(this);

				// Check if the element already has the 'counter-loaded' class
				if ($this.hasClass('counter-loaded')) {
					// Append '+' to the counter after animation has been completed
					if ($this.text() && $this.text().includes('+')) {
						return;
					}
					$this.text($this.text() + '+');
					return; // Exit the function if the element is already processed
				}

				// Add 'counter-loaded' class to mark this element as processed
				$this.addClass('counter-loaded');

				// Animate the counter
				jQuery({
					Counter: 0
				}).animate({
					Counter: $this.text()
				}, {
					duration: 3000,
					easing: 'swing',
					step: function () {
						$this.text(Math.ceil(this.Counter)); // Update text as the counter animates
					},
					complete: function () {
						// After the animation is done, append the '+' symbol
						$this.text($this.text() + '+');
					}
				});
			});
		}

	})




	$(document).ready(function () {
		$('#contact').on('submit', function (event) {
			event.preventDefault(); // Prevent actual form submission
		})








		$('.form-submit-contact').on('click', function (event) {
			event.preventDefault(); // Prevent actual form submission








			const clickedButtonName = $(this).attr('name');
			const name = $('#contact-name').val();
			const email = $('#contact-email').val();
			const message = $('#contact-message').val();
			let destination = ''








			if (!email) {
				return;
			}


			// Create mailto link
			if (clickedButtonName == "whatsapp") {
				const phoneNumber = "9645382858"; // Replace with recipient's phone number
				const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
				destination = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
			} else {
				destination = `mailto:teamforeschool@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
			}








			// Redirect to the mail/whatsapp application
			window.location.href = destination;
		});
	});




})(window.jQuery);








window.onload = function () {
	const popup = document.getElementById('overlay');
	if (!popup) {
		return;
	}
	setTimeout(() => {
		// Display the popup after the page loads

		popup.style.display = 'flex';
		popup.style.opacity = '0'; // Start with zero opacity
		popup.style.transition = 'opacity 0.5s ease'; // Add a smooth transition for opacity


		setTimeout(() => {
			popup.style.opacity = '1'; // Gradually fade in
		}, 10);
	}, 800);




	// Close the popup when the close button is clicked
	const closeButton = document.getElementById('close-popup');
	if (closeButton) {
		closeButton.onclick = function () {
			popup.style.opacity = '0'; // Start fading out
			setTimeout(() => {
				popup.style.display = 'none'; // Hide after fade-out
			}, 500); // Match the transition duration
		};
	}




	// Close the popup if the user clicks outside of it
	window.onclick = function (event) {
		if (event.target == popup) {
			popup.style.opacity = '0'; // Start fading out
			setTimeout(() => {
				popup.style.display = 'none'; // Hide after fade-out
			}, 500); // Match the transition duration
		}
	};
};








const sendpopup = document.getElementById('send-popup');
if (sendpopup) {
	sendpopup.onclick = function () {
		let name = document.getElementById('app-form-control-name') ? document.getElementById('app-form-control-name').value : '';
		let email = document.getElementById('app-form-control-email') ? document.getElementById('app-form-control-email').value : '';
		let contact = document.getElementById('app-form-control-contact') ? document.getElementById('app-form-control-contact').value : '';
		let message = document.getElementById('app-form-control-message') ? document.getElementById('app-form-control-message').value : '';

		const text = `Name: ${name}\nEmail: ${email}\n Phone: ${contact}\n\nMessage:\n${message}`;
		destination = `https://wa.me/9645382858?text=${encodeURIComponent(text)}`;
		window.location.href = destination;

		popup.style.opacity = '0'; // Start fading out
		setTimeout(() => {
			popup.style.display = 'none'; // Hide after fade-out
		}, 500); // Match the transition duration
	};
}






const next = document.querySelector("#newsummarysection .next");
const prev = document.querySelector("#newsummarysection .previous");
const slides = document.querySelectorAll("#newsummarysection .slide");


let index = 0;
display(index);


function display(index) {
	slides.forEach((slide) => {
		slide.style.display = "none";
	});
	slides[index].style.display = "flex";
}


function nextSlide() {
	index++;
	if (index > slides.length - 1) {
		index = 0;
	}
	display(index);
}


function prevSlide() {
	index--;
	if (index < 0) {
		index = slides.length - 1;
	}
	display(index);
}


next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);





