document.addEventListener('DOMContentLoaded', DomLoaded);
document.addEventListener("click", eventDocClick, false);
window.addEventListener("load", WindowLoad, false);


function DomLoaded() {
	initSlick.check();
	tabListFilter.onload();
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
	teamOnMain();
}
function eventDocClick(e) {
    var targ = e.target;
    var clickedEl = e.target;

    while (targ && targ != this) {
    	if(targ.classList.contains("headerMain__menu__bar")) {
    		targ.classList.toggle("active");
    		let menu;
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
    	if(targ.classList.contains("tablist-filter")) {
    		let tabClicked = undefined;
    		if(clickedEl.getAttribute("data-filterby")) {
    			tabClicked = clickedEl;
    		}
    		else if(clickedEl.parentNode.getAttribute("data-filterby")) {
    			tabClicked = clickedEl.parentNode;
    		}
    		if(tabClicked) {
    			tabListFilter.init(tabClicked, targ);
    			break;
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
var tabListFilter = {
	init: function(tab, tabList) {
		this.setTabActive(tab, tabList);
		this.doFilter(tab, tabList.getAttribute("data-target"), true);
	},
	onload: function() {
		var tabList,
		 	targetContentCls,
		 	tabActive;
		if(tabList = document.querySelector(".tablist-filter")) {
			if(targetContentCls = tabList.getAttribute("data-target")) {
				if(document.querySelector("."+targetContentCls)) {
					if(tabActive = tabList.querySelector(".active")) {
						this.doFilter(tabActive, targetContentCls);						
					}
				}
			}
		}
	},
	setTabActive: function(tab, tabList) {
		var prevActive;
		prevActive = tabList.querySelector(".active");
		prevActive.setAttribute("aria-selected", "false");
		prevActive.classList.remove("active");
		tab.classList.add("active");
		tab.setAttribute("aria-selected", "true");
	},
	doFilter: function(tab, targetContentCls, animation) {
		var contentWrapper;
		if(targetContentCls && (contentWrapper = document.querySelector("."+targetContentCls))) {
			var filterCriterion = tab.getAttribute("data-filterby");
			var items = contentWrapper.querySelectorAll("[data-filter]");
			for(let i = 0; i < items.length; i++) {
				if(filterCriterion == "all") {
					if(animation) {
						gsap.set(items[i], {opacity:0})
							.then(() => {items[i].classList.remove("hidden")});
						gsap.to(items[i], {opacity:1, duration:1});
					}
					else {
						items[i].classList.remove("hidden");						
					}
				}
				else {
					if(items[i].getAttribute("data-filter") == filterCriterion) {
						if(animation) {
							gsap.set(items[i], {opacity:0})
								.then(() => {items[i].classList.remove("hidden")});
							gsap.to(items[i], {opacity:1, duration:1});
						}
						else {
							items[i].classList.remove("hidden");							
						}
					}
					// hide no filterCriterion
					else {
						if(animation) {
							items[i].classList.add("hidden");							
						}
						else {
							items[i].classList.add("hidden");							
						}
					}					
				}
			}
		}
	}
}	
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
				line.style.width = line.parentNode.clientWidth + 30 + "px";
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
		  gsap.to(gsapTween, { timeScale: 0.1});
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
			pillsLive = planetoidWrapper.getElementsByClassName("planetoid__pill"),
			pills = orbita.querySelectorAll(".planetoid__pill"),
			isFirstInit = true,
			orbita_num = pills[0].getAttribute("data-orbita"),
			isFirstTimeAddEvent = true,
			isAllowedAddEvent = false,
			gsapPillsArray = [],
			antiLooping = 600; // антизацикливание при проверке пилсов на координаты

	    	var intervalId = 0;

		const orbitaTween = gsap.to(orbita, {			
			duration: orbitTime,
			ease: "linear",
			scrollTrigger: {
				trigger: ".planetoid",
			    start: "top 80%",
			    end: "bottom 50px",
			    markers: false,
			    onEnter: () => {

			    	// проверка, чтобы все пилсы получили координаты
			    	// и затем привызываю события 
			    	if(!isAllowedAddEvent) {			    		
				    	intervalId = setTimeout(checkPillsForShowUp, 200);			    	
			    	}
			    	
			    	if(isFirstInit) {
			    		isFirstInit = false;

			    		pills.forEach((pill, i) => {
							var orbitStartTime,
								orbita_num = pill.getAttribute("data-orbita");							

							orbitStartTime = orbitTiming * i;

							gsapPillsArray[i] = gsap.to(pill, {
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

						}); // /forEach
			    	}
			    },
			    onLeave: () => {
			    	// orbitaTween.pause();
			    	if(isAllowedAddEvent) {			    		
				    	gsapPillsArray.forEach((pillTween) => {
							pillTween.pause();
						});
			    	}
			    },
			    onEnterBack: () => {
			    	// orbitaTween.resume();
			    	if(isAllowedAddEvent) {			    		
				    	gsapPillsArray.forEach((pillTween) => {
							pillTween.resume();
						});
			    	}
			    },
			    onLeaveBack: () => {
			    	// orbitaTween.pause();
			    	if(isAllowedAddEvent) {
				    	gsapPillsArray.forEach((pillTween) => {
							pillTween.resume();
						});
			    	}
			    }
			}
		});

    	function checkPillsForShowUp() {
			for(let j = 0; j <= pillsLive.length-1; j++) {
	    		(function(jj) {
	    			if(!pillsLive[jj].getAttribute("style")) {
	    				antiLooping--;
	    				clearTimeout(intervalId);
	    				if(antiLooping > 0) {				    					
		    				intervalId = setTimeout(checkPillsForShowUp, 200);				    				
	    				}
	    			}
	    			else {
	    				pillsLive[jj].classList.add("showup");
	    				if(jj >= pillsLive.length-1) {				    					
		    				clearTimeout(intervalId);
		    				isAllowedAddEvent = true;
		    				addEvents();
	    				}
	    			}
	    		})(j);
	    	}
		}			    		    	

		function addEvents() {			
			if(isFirstTimeAddEvent && isAllowedAddEvent) {
				isFirstTimeAddEvent = false;

				document.querySelector(".planetoid__orbita-"+orbita_num).addEventListener("mouseenter", function () {
					event.target.querySelector("#orbita_"+orbita_num).style.stroke = "#fe05f2";
					gsapPillsArray.forEach((pillTween) => {
						gsap.to(pillTween, { timeScale: 0.1})
					});
				});

				document.querySelector(".planetoid__orbita-"+orbita_num).addEventListener("mouseleave", function () {
					event.target.querySelector("#orbita_"+orbita_num).style.stroke = "#fff";
					gsapPillsArray.forEach((pillTween) => {
						gsap.to(pillTween, { timeScale: 1})
					});
				});		
			}
		}		
	}
}

function teamOnMain() {
	var teamWrapper;
	if(teamWrapper = document.querySelector(".team__onMain")) {
		var persons = teamWrapper.querySelectorAll(".team__person:not(.team__person_bigSize)");

		if(persons.length) {

			var personsQ = 30,
				isFirstShow = true,
				isPersonHovered = false,
				rotateIntervalId = 0,
				checkDateIntervalId = 0,
				activePositionsArr = [],
				activePersonsArr = [],
				antiLooping = 0;


			ScrollTrigger.create({
				trigger: teamWrapper,
				start: "top 90%",
				end: "bottom 50px",
				onToggle: self => {
					if(self.isActive) {						
						console.log("toggled, isActive:", self.isActive);
						antiLooping = 0;
						teamRotation();
						checkDatePersons();
					}
					else {
						console.log("toggled, isActive:", self.isActive);
						antiLooping = 31;
						clearInterval(checkDateIntervalId);
						clearTimeout(rotateIntervalId);
					}
				},
			});


			const tl = gsap.timeline({
			  scrollTrigger: {
			    trigger: ".team__onMain",
			    start: "top top",
			    end: "bottom 100%",
			    scrub: 2
			  }
			});

			gsap.utils.toArray(".team__person").forEach(layer => {
			  const depth = layer.dataset.depth;
			  const movement = -(layer.offsetHeight * depth)
			  tl.to(layer, {y: movement, ease: "none"}, 0)
			});
		}
	}



	function teamRotation(delay) {
		var _delay = delay ? delay : 500;

		if(antiLooping > 30) return;

		clearInterval(rotateIntervalId);
		activePositionsArr.length = 0;
		activePersonsArr.length = 0;
		if(!isPersonHovered) {
			collectActivePersonsStata();
			IMGrndPersonNumber = getRand(3,personsQ);
			POSrndPersonNumber = getRand(3,11);

			// console.log("###############################");
			// console.log("activePositionsArr: ", activePositionsArr);
			// console.log("activePersonsArr: ", activePersonsArr);
			// console.log("POSrndPersonNumber = ", POSrndPersonNumber);
			// console.log("IMGrndPersonNumber = ", IMGrndPersonNumber);

			antiLooping++;

			if(
				(!activePositionsArr.includes("p"+POSrndPersonNumber))
				&&
				(!activePersonsArr.includes(IMGrndPersonNumber+""))
				) {
				// console.log("1 POSrndPersonNumber = ", POSrndPersonNumber);
				// console.log("1 IMGrndPersonNumber = ", IMGrndPersonNumber);

				if(true || !activePersonsArr.includes(IMGrndPersonNumber+"")) {
					// console.log("2 POSrndPersonNumber = ", POSrndPersonNumber);
					// console.log("2 IMGrndPersonNumber = ", IMGrndPersonNumber);

					var personAboutToShow;
					const start = Date.now();

					rotateIntervalId = setTimeout(function() {
						antiLooping = 0;
						personAboutToShow = teamWrapper.querySelector(".team__person[data-person='p"+POSrndPersonNumber+"']");
						if(personAboutToShow) {

							clearPerson(personAboutToShow);

							var imgTpl = '<img data-img="${NUM}" src="i/team/numbering/person_${NUM}.png" srcset="i/team/numbering/person_${NUM}.png 1x, i/team/numbering/person_${NUM}@2x.png 1.5x" />';
							var imgNew = imgTpl.replace(/\$\{NUM\}/g, IMGrndPersonNumber);

							personAboutToShow.querySelector(".team__person__imgWrap").innerHTML = "";
							personAboutToShow.querySelector(".team__person__imgWrap").insertAdjacentHTML("afterBegin", imgNew);
							personAboutToShow.setAttribute("data-start", start);

							activePositionsArr.length = 0;
							activePersonsArr.length = 0;
							gsap.to(personAboutToShow, {duration:0.5})
							.then(() => {
								personAboutToShow.classList.remove("hovered");
								personAboutToShow.classList.add("active");
								personAboutToShow.setAttribute("data-depth", 0.6);
								personAboutToShow.classList.remove("blured");
							});
							cleanOldTimePersons();
							// teamRotation();
						}
					}, _delay);
				}
				else {
					// activePositionsArr.length = 0;
					// activePersonsArr.length = 0;
					// clearInterval(rotateIntervalId);
					// teamRotation();	
				}
			}
			else {
				activePositionsArr.length = 0;
				activePersonsArr.length = 0;
				clearInterval(rotateIntervalId);
				// teamRotation();
			}
		}

	};

	function collectActivePersonsStata() {
		var activePersons = teamWrapper.querySelectorAll(".team__person.active");
		activePersons.forEach((person) => {
			activePositionsArr.push(person.getAttribute("data-person"));
			activePersonsArr.push(person.getElementsByTagName("img")[0].getAttribute("data-img"));
		});
	};
	function hoverPerson(person) {
		isPersonHovered = true;
		clearInterval(checkDateIntervalId);
		clearTimeout(rotateIntervalId);
		rndImgNumber = getRand(3,personsQ);
		blurAll(person);
		person.classList.add("hovered");
	};
	function unHoverPerson(person) {
		isPersonHovered = false;
		antiLooping = 0;
		person.classList.remove("hovered");
		teamRotation(250);
		checkDatePersons();
	};
	function blurAll(personHovered) {
		var personsForBlur = teamWrapper.querySelectorAll(".team__person:not(.team__person_bigSize):not([data-person='" + personHovered.getAttribute("data-person") + "'])");

		personsForBlur.forEach((person) => {
			person.classList.remove("active");
			person.classList.add("blured");
			person.classList.remove("hovered");
			person.setAttribute("data-depth", 0.3);		
		});
	};
	function checkDatePersons() {		
		checkDateIntervalId = setInterval(function() {
			cleanOldTimePersons();		
		}, 700);
	}
	function cleanOldTimePersons() {
		antiLooping = 0;
		var persons = teamWrapper.querySelectorAll(".team__person.active"),
			elapsed = 0;
		persons.forEach((person) => {
			var start = parseInt(person.getAttribute("data-start"));

			if(start) {				
				elapsed = (Date.now() - start) / 1000;
				console.log("elapsed: ", elapsed);
				if(elapsed > 8) {
					person.classList.add("blured");
					person.classList.remove("hovered");
					person.classList.remove("active");
					person.setAttribute("data-start", 0);
					person.setAttribute("data-depth", 0.3);
				}
			}
		});
		if(elapsed) {
			teamRotation();
		}
	};
	function clearPerson(p) {
		p.setAttribute("data-start", 0);
		p.setAttribute("data-depth", 0.3);
		p.classList.remove("blured");
		p.classList.remove("hovered");
	}
	function getRand(min,max){
      return parseInt(Math.random() * (max - min) + min,10);
    };
    (function() {
    	persons.forEach((person) => {
			person.addEventListener("mouseenter", () => {
				hoverPerson(person);
			});
			person.addEventListener("mouseleave", () => {
				unHoverPerson(person);
			});
		});
    })();
}
