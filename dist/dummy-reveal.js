(function() {
	'use strict';
	var extend = function () {
	    // Variables
	    var extended = {};
	    var deep = false;
	    var i = 0;
	    var length = arguments.length;

	    // Check if a deep merge
	    if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
	        deep = arguments[0];
	        i++;
	    }

	    // Merge the object into the extended object
	    var merge = function (obj) {
	        for ( var prop in obj ) {
	            if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
	                // If deep merge and property is an object, merge properties
	                if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
	                    extended[prop] = extend( true, extended[prop], obj[prop] );
	                } else {
	                    extended[prop] = obj[prop];
	                }
	            }
	        }
	    };

	    // Loop through each object and conduct a merge
	    for (var i; i < length; i++ ) {
	        var obj = arguments[i];
	        merge(obj);
	    }
	    return extended;
	};
	window.mobilecheck = function() {
	  var check = false;
	  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	  return check;
	}

	this.DummyReveal = function(options) {
	    this.defaults = {
	        selector: 'reveal',
	        classDefault: 'animated',
	        classActive: 'fadeIn',
	        globalDelay: 0,
	        noAnimateClass: 'noAnimate',
	        reverse: false,
	        mobile: false
	    };
	    this.elements = [];
	    this._init(options);
	}

	DummyReveal.prototype._init = function(options) {
	    this.defaults = extend(true, this.defaults, options);
	    if (!this.defaults.mobile) {
	        if (!window.mobilecheck()) {
	            this._setItems();
	        }
	    } else {
	        this._setItems();
	    }
	}

	DummyReveal.prototype._setItems = function() {
	    var generics = document.getElementsByClassName(this.defaults.selector);

	    for (var i = 0; i < generics.length; i++) {
	        var el = new Element(generics[i], this.defaults);
	        this.elements.push(el);
	    }

	    this._addEventListeners();
	}

	DummyReveal.prototype._addEventListeners = function() {
	    var self = this;
	    var scrolledSpace = window.innerHeight + window.pageYOffset;
	    self._checkVisible(scrolledSpace);
	    window.addEventListener('scroll', function() {
	        var scrolledSpace = window.innerHeight + window.pageYOffset;
	        self._checkVisible(scrolledSpace);
	    });
	}

	DummyReveal.prototype._checkVisible = function(scrollTop) {
	    for (var i = 0; i < this.elements.length; i++) {
			var el = this.elements[i].element;
	    	var rect = el.getBoundingClientRect();
	    	var elScrollTop = rect.top + window.pageYOffset;

	        if (
				parseInt(elScrollTop) + parseInt(this.elements[i].offset) <
				parseInt(scrollTop) && parseInt(elScrollTop) >
				parseInt(scrollTop - window.innerHeight -  this.elements[i].element.offsetHeight)
			) {
	            if (!this.elements[i].hasActive()) {
	                this.elements[i].addActiveClass();
	            }
	        } else {
	            if(this.elements[i].hasReverse()) {
	                this.elements[i].removeActiveClass();
	            }
	        }
	    }
	}

	function Element(el, options) {
	    this.element 			= el;
	    this.offsetTop 			= el.offsetTop;
	    this.triggered 			= false;

		this.offset 			= el.getAttribute('data-offset') == undefined ? 0 : el.getAttribute('data-offset');
	    this.defaultClass 		= el.getAttribute('data-default-class') == undefined ? options.classDefault : el.getAttribute('data-default-class');
	    this.noAnimateClass 	= el.getAttribute('data-no-animate-class') == undefined ? options.noAnimateClass : el.getAttribute('data-no-animate-class');
		this.activeClass 		= el.getAttribute('data-active-class') == undefined ? options.classActive : el.getAttribute('data-active-class');
		this.delay 				= el.getAttribute('data-delay') == undefined ? options.globalDelay : el.getAttribute('data-delay');
		this.reverse 			= el.getAttribute('data-reverse') == undefined ? options.reverse : true;

		this.element.classList.add(this.defaultClass);
	    this.element.classList.add(this.noAnimateClass);
	}

	Element.prototype.hasActive = function() {
	    return this.element.classList.contains(this.activeClass);
	}

	Element.prototype.addActiveClass = function() {
	    var self = this;
	    setTimeout(function() {
	        self.element.classList.remove(self.noAnimateClass);
	        self.element.classList.add(self.activeClass);
	    }, self.delay);
	}

	Element.prototype.removeActiveClass = function() {
	    var self = this;
	    setTimeout(function() {
	        self.element.classList.add(self.noAnimateClass);
	        self.element.classList.remove(self.activeClass);
	    }, self.delay);
	}

	Element.prototype.hasReverse = function() {
	    return this.reverse;
	}

	return DummyReveal;
}).call(this);
