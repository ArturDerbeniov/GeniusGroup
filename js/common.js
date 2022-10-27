document.addEventListener('DOMContentLoaded', DomLoaded);
document.addEventListener("click", eventDocClick, false);
window.addEventListener("load", WindowLoad, false);


function DomLoaded() {
	initSlick.check();
}
function WindowLoad() {
	var partnersList;
	if(partnersList = document.querySelector(".partners__list")) {
		var partnersListItems = partnersList.querySelectorAll(".partners__list__item");
		partnersListItems.forEach((item) => {
			item.addEventListener("mouseleave", () => {
				item.classList.add("mleaved");
				setTimeout(function() {
					item.classList.remove("mleaved");
				},700);
			});
		});
	}

	logosRunningLines();
	orbitaPills();
}
function eventDocClick(e) {
    var targ = e.target;
    var clickedEl = e.target;

    while (targ && targ != this) {
    	if (targ.classList.contains("headerMain__menu__bar")) {
    		targ.classList.toggle("active");
    		var menu;
    		if(targ.classList.contains("active")) {    			
	    		if(menu = document.querySelector(".headerMain__menu")) {
	    			menu.classList.add("active");
	    			document.body.classList.add("headerMainMenuActive")
	    		}
    		}
    		else {
    			if(menu = document.querySelector(".headerMain__menu")) {
	    			menu.classList.remove("active");
	    			document.body.classList.remove("headerMainMenuActive");
	    		}	
    		}
    		break;
    	}
        targ = targ.parentNode;
    }
}

var fnDelay = function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
}();
var loadJS = function(url, callback, locToInsert){
    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = callback;
    scriptTag.onreadystatechange = callback;

    locToInsert.appendChild(scriptTag);
};
/*var callRellax = function(){
	var rellax = new Rellax('.rellax', {
		center: true,
		zIndex:-1
	});
}*/
/*AOS.init({
	offset: 100,
	duration: 3000,
});*/

var initSlick = {
	check: function() {
		var isCardsSlick = document.getElementsByClassName("cards-slick")[0] ? 1 : 0;
		var isGallerySlick = document.getElementsByClassName("gallery-slick")[0] ? 1 : 0;

		if(isGallerySlick) {
			if (typeof $.fn.slick == "undefined") {
	        	loadJS("js/slick1.8.1.min.js", initSlick.start, document.body);
	        }
	        else {
	        	this.startGallery();	        
	        }
		}
		if(window.innerWidth >= 768) {
			if (
					isCardsSlick
				) 
			{
				if (typeof $.fn.slick == "undefined") {
		        	loadJS("js/slick1.8.1.min.js", initSlick.start, document.body);
		        }
		        else {
		        	this.startCards();		        	
		        }
			}		
		}
	},
	startCards: function() {
		var slickWrapper;
		$(".cards-slick").on("init", function(event, slick) {
			slickWrapper = slick.$list[0].closest(".cards-slickWrapper");
			if(slickWrapper.classList.contains("cardBlog-slickWrapper")) {
				initCardBlogSlickWrapper(slickWrapper.clientHeight);
			}
			else if(slickWrapper.classList.contains("cardCalendar-slickWrapper")) {
				initCardCalendarSlickWrapper(slickWrapper.clientHeight);
			}
		});
		$(".cards-slick").slick(initSlick.cardsSlickParams_1);
	},
	startGallery: function() {
		$(".gallery-slick").slick(initSlick.cardsSlickParams_2);
	},	
	cardsSlickParams_1: {
	    dots: false,
	    infinite: false,
	    speed: 500,
	    slidesToShow: 2,
	    slidesToScroll: 2,
	    slide: 'div',
	    arrows: true,
	    autoplay: false,
	    mobileFirst: true,
	    variableWidth: true,
	    prevArrow:"<button type='button' class='slick-prev slick-arrow pull-left'><span class='slick-arrow-inner'></span></button>",
        nextArrow:"<button type='button' class='slick-next slick-arrow pull-right'><span class='slick-arrow-inner'></span></button>",
	    responsive: [
	        {
	            breakpoint: 1279,
	            settings: {
	                slidesToShow: 3,
	                slidesToScroll: 1
	            }
	        },
	        {
	            breakpoint: 991,
	            settings: {
	                slidesToShow: 3,
	                slidesToScroll: 1
	            }
	        },
	        {
	            breakpoint: 767,
	            settings: {
	                slidesToShow: 3,
	                slidesToScroll: 1
	            }
	        },
	        {
	            breakpoint: 300,
	            settings: "unslick"
	        }
	    ]
	},
	cardsSlickParams_2: {
	    dots: false,
	    infinite: false,
	    speed: 500,
	    slidesToShow: 3,
	    slidesToScroll: 1,
	    slide: 'div',
	    arrows: true,
	    autoplay: false,
	    mobileFirst: true,
	    variableWidth: false,
	    infinite: true,
	    centerMode: true,
	    centerPadding: '0px',
	    prevArrow:"<button type='button' class='slick-prev slick-arrow pull-left'><span class='slick-arrow-inner'></span></button>",
        nextArrow:"<button type='button' class='slick-next slick-arrow pull-right'><span class='slick-arrow-inner'></span></button>",
	    responsive: [
	        {
	            breakpoint: 1279,
	            settings: {
	                slidesToShow: 3,
	                slidesToScroll: 1
	            }
	        },
	        {
	            breakpoint: 991,
	            settings: {
	                slidesToShow: 3,
	                slidesToScroll: 1
	            }
	        },
	        {
	            breakpoint: 767,
	            settings: {
	                slidesToShow: 3,
	                slidesToScroll: 1
	            }
	        },
	        {
	            breakpoint: 300,
	            settings: {
	                slidesToShow: 3,
	                slidesToScroll: 1
	            }
	        }
	    ]
	}	
};

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function initCardBlogSlickWrapper(hBlocg) {
	const first = gsap.timeline({});
	first.set(".cardBlog-slickWrapper .cards-slick", {
		height:hBlocg,
		onComplete: cardBlog
	});

	function cardBlog() {
		var cardBlogSlickWrapper = document.querySelector(".cardBlog-slickWrapper");
		cardBlogSlickWrapper.style.height = hBlocg + "px";
		cardBlogSlickWrapper.classList.add("waitToAnimate");

		gsap.to(".cardBlog-slickWrapper", {
			scrollTrigger: {
			    trigger: ".cardBlog-slickWrapper",
			    start: "top 80%",
			    end: "bottom 0",
			    markers: false,
			    onEnter: ({progerss, direction, isActive}) => {
			    	cardBlogSlickWrapper.classList.remove("waitToAnimate");
			    	setTimeout(function() {
			    		cardBlogSlickWrapper.classList.remove("waitToAnimate");
			    		cardBlogSlickWrapper.classList.add("animationDone");
			    	}, 1000);
			    	// console.log("onEnter: ", progerss, direction, isActive);
			    },
			    onEnterBack: ({progerss, direction, isActive}) => {
			    	// document.querySelector(".cardBlog-slickWrapperForAnimate").classList.remove("waitToAnimate");
			    	// console.log("onEnterBack: ", progerss, direction, isActive);
			    },
			    onLeave: ({progerss, direction, isActive}) => {
			    	// document.querySelector(".cardBlog-slickWrapperForAnimate").classList.add("waitToAnimate");
			    	// console.log("onLeave: ", progerss, direction, isActive);
			    },
			    onLeaveBack: ({progerss, direction, isActive}) => {
			    	cardBlogSlickWrapper.classList.add("waitToAnimate");
			    	cardBlogSlickWrapper.classList.remove("animationDone");
			    	// console.log("onLeaveBack: ", progerss, direction, isActive);
			    }
			    // onUpdate: ({progerss, direction, isActive}) => console.log("onUpdate: ", progerss, direction, isActive)
			}
		})
	};
}
function initCardCalendarSlickWrapper(hCalendar) {
	const first = gsap.timeline({});

	first.set(".cardCalendar-slickWrapper .cards-slick", {
		height:hCalendar,
		onComplete: cardCalendar
	});

	function cardCalendar() {
		var calendarBlogSlickWrapper = document.querySelector(".cardCalendar-slickWrapper");
		calendarBlogSlickWrapper.style.height = hCalendar + "px";
		calendarBlogSlickWrapper.classList.add("waitToAnimate");

		gsap.to(".cardCalendar-slickWrapper", {
			scrollTrigger: {
			    trigger: ".cardCalendar-slickWrapper",
			    start: "top 80%",
			    end: "bottom 0",
			    markers: false,
			    onEnter: ({progerss, direction, isActive}) => {
			    	calendarBlogSlickWrapper.classList.remove("waitToAnimate");
			    	setTimeout(function() {
			    		calendarBlogSlickWrapper.classList.remove("waitToAnimate");
			    		calendarBlogSlickWrapper.classList.add("animationDone");
			    	}, 1000);
			    	// console.log("onEnter: ", progerss, direction, isActive);
			    },
			    onEnterBack: ({progerss, direction, isActive}) => {
			    	// document.querySelector(".cardCalendar-slickWrapperForAnimate").classList.remove("waitToAnimate");
			    	// console.log("onEnterBack: ", progerss, direction, isActive);
			    },
			    onLeave: ({progerss, direction, isActive}) => {
			    	// document.querySelector(".cardCalendar-slickWrapperForAnimate").classList.add("waitToAnimate");
			    	// console.log("onLeave: ", progerss, direction, isActive);
			    },
			    onLeaveBack: ({progerss, direction, isActive}) => {
			    	calendarBlogSlickWrapper.classList.add("waitToAnimate");
			    	calendarBlogSlickWrapper.classList.remove("animationDone");
			    	// console.log("onLeaveBack: ", progerss, direction, isActive);
			    }
			    // onUpdate: ({progerss, direction, isActive}) => console.log("onUpdate: ", progerss, direction, isActive)
			}
		})
	}
}

function logosRunningLines() {
	var logosWrapper;
	if(logosWrapper = document.querySelector(".logos")) {
		var lines = logosWrapper.querySelectorAll(".logos__line");
		if(lines.length) {
			lines.forEach((line) => {
				line.style.width = line.parentNode.clientWidth + "px";
				initGsap(line, line.getAttribute("data-direction"), line.querySelectorAll(".logos__line__item").length, line.getAttribute("data-speed"));
			});
		}
	}

	function initGsap(line, direction, itemsQ, speed) {
		var lineClsStr = "." + line.classList[1],
			itemsClsStr = lineClsStr + " .logos__line__item",
			sign = direction == 1 ? '+' : '-',
			lineSize = (itemsQ * 205) + (itemsQ * 15);

		gsap.set(itemsClsStr, {
		  x: (i) => i * (220 * direction)
		});

		const gsapTween = gsap.to(itemsClsStr, {
			duration: speed,
			ease: "linear",
			x: sign+"="+lineSize+"px",
			scrollTrigger: {
				trigger: ".logos",
			    start: "top 80%",
			    end: "bottom 50px",
			    markers: false,
			    onEnter: () => {
			    	document.querySelector(".logos").classList.add("active");			    	
			    },
			    onLeave: () => {
			    	gsapTween.pause();
			    },
			    onEnterBack: () => {
			    	gsapTween.resume();
			    },
			    onLeaveBack: () => {
			    	gsapTween.pause();
			    }
			},
			modifiers: {
				x: gsap.utils.unitize(x => (parseFloat(x) % lineSize))
			},
			repeat: -1
		});

		document.querySelector(lineClsStr).addEventListener("mouseenter", function () {
		  gsap.to(gsapTween, { timeScale: 0.3});
		});

		document.querySelector(lineClsStr).addEventListener("mouseleave", function () {
		  gsap.to(gsapTween, { timeScale: 1});
		});
	}
}

function orbitaPills() {	
	var planetoidWrapper;

	if(planetoidWrapper = document.querySelector(".planetoid")) {
		var orbites = planetoidWrapper.querySelectorAll(".planetoid__orbita");
		if(orbites.length) {
			orbites.forEach((orbita) => {
				initOrbita(orbita, orbita.querySelectorAll(".planetoid__pill").length);
			});
		}
	}

	function initOrbita(orbita, pillsQ) {
		var orbitTime = 20,
			orbitPills = pillsQ,
			orbitTiming = orbitTime / pillsQ,
			pills = orbita.querySelectorAll(".planetoid__pill"),
			isFirstInit = true,
			arrayPills = [],
			orbita_num = pills[0].getAttribute("data-orbita"),
			isFirstTimeAddEvent = true;


		const orbitaTween = gsap.to(orbita, {
			duration: orbitTime,
			ease: "linear",
			scrollTrigger: {
				trigger: ".planetoid",
			    start: "top 80%",
			    end: "bottom 50px",
			    markers: false,
			    onEnter: () => {
			    	if(isFirstInit) {
			    		isFirstInit = false;

			    		pills.forEach((pill, i) => {
							var orbitStartTime,
								orbita_num = pill.getAttribute("data-orbita");							

							orbitStartTime = orbitTiming * i;

							gsap.to(pill, {
								duration: orbitTime, 
								repeat: -1,
								ease: "linear",
								motionPath:{
									path: "#orbita_"+orbita_num,
									align: "#orbita_"+orbita_num,
									autoRotate: false,
									alignOrigin: [0.5, 0.5],
								}
							},orbitStartTime);

							arrayPills.push(pill);
							pill.classList.add("showup");
						}); // /forEach

			    	}
			    	// document.querySelector(".logos").classList.add("active");			    	
			    },
			    onLeave: () => {
			    	orbitaTween.pause();
			    },
			    onEnterBack: () => {
			    	orbitaTween.resume();
			    },
			    onLeaveBack: () => {
			    	orbitaTween.pause();
			    }
			}
		});

		if(isFirstTimeAddEvent) {
			isFirstTimeAddEvent = false;

			document.querySelector(".planetoid__orbita-"+orbita_num).addEventListener("mouseenter", function () {
			  gsap.to(orbitaTween, { timeScale: 0.3});
			});

			document.querySelector(".planetoid__orbita-"+orbita_num).addEventListener("mouseleave", function () {
			  gsap.to(orbitaTween, { timeScale: 1});
			});		
		}
	}
}
/*
(function() {
	var orbitTime = 20,
		orbitPills = 5,
		orbitTiming = orbitTime / orbitPills,
		pills = document.querySelectorAll(".planetoid .planetoid__pill");

	// var tl = gsap.timeline({repeat: -1,   defaults: { duration: orbitTime, ease: "none" }});
	var globCountPills = 0;
	var arrayPills = [];

	pills.forEach((pill, i) => {
		var orbitStartTime,
			orbita_num = pill.getAttribute("data-orbita");

		globCountPills = i;
		if(globCountPills >= 4) {
			i = i - 5;
		}

		orbitStartTime = orbitTiming * i;


		gsap.to(pill, {
			duration: orbitTime, 
			repeat: -1,
			ease: "linear",
			motionPath:{
				path: "#orbita_"+orbita_num,
				align: "#orbita_"+orbita_num,
				autoRotate: false,
				alignOrigin: [0.5, 0.5],
			}
		},orbitStartTime);

		arrayPills.push(pill);


	}); // /forEach
		

		for(let i = 0; i < arrayPills.length; i++ ) {
			let timing = 4000;
			(function (i, t) {
				setTimeout(function() {					
					arrayPills[i].classList.add("showup");
				}, t*i);
			})(i, timing);
		}

})();
*/