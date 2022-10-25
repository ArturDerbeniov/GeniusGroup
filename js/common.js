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
}
