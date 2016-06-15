/*
 *|=======================================|
 *| [file:richard.js]
 *|
 *| Library and Logic.
 *| @author Richard Blondet
 *|=======================================|
*/
var w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0],
	x = w.innerWidth || e.clientWidth || g.clientWidth,
	y = w.innerHeight|| e.clientHeight|| g.clientHeight,
	v;
var wrapper = document.getElementById("wrapper"),

richard = {
	version: "0.1",
	DOMReady: false,
	userAgent: navigator.userAgent || navigator.vendor || window.opera,
	isMobile: function() {
		var ua = this.userAgent;
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4))) {
			return true;
		} else {
			return false;
		}
	},
	__: function(string, args) {
		if( !window.console || typeof console == "undefined" ) {
			window.console = function(){};
		}
		console.log.apply(console, arguments);
	},
	addClass: function(el, classN) {
		el.classList 
			? el.classList.add( classN ) 
			: el.className += " " + classN;
	},
	removeClass: function(el, classN) {
		el.classList 
			? el.classList.remove( classN )
			: el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	},
	hasClass: function(el, className) {
		if (el.classList) {
		  return el.classList.contains(className);
		} else {
			return  new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
		}
	},
	isVisible: function(el) {
	    var rect = el.getBoundingClientRect();
	    return (
	    	rect.top >= 0 
	    	&& rect.left >= 0 
	    	&& rect.bottom <= (w.innerHeight || d.documentElement.clientHeight) 
	    	&& /*or $(w).height() */ rect.right <= (w.innerWidth || d.documentElement.clientWidth) /*or $(w).width() */
	    );
	},
	on: function(el, type, callback, eventReturn) {
		if( el == null || typeof el == "undefined" )
			return;

		if( el.addEventListener ) {
			el.addEventListener( type, callback, eventReturn ? true : false );
		}
		else if( el.attachEvent ) {
			el.attachEvent("on" + type, callback );
		}
		else {
			el["on"+type] = callback;
		}
	},
	isReady: function( handler ) {	
		if( d.readyState != "loading" ) {
			if(typeof handler == "function"){
				this.DOMReady = true;
				handler();
			} else {
				return;	
			}
		}
		else {
			d.addEventListener("DOMContentLoaded", handler, false);
		}
	},
	watch: function( callback ) {
		var self = this, width, height;
		this.on( window, "resize", function(e) {
			width = w.innerWidth || e.clientWidth || g.clientWidth,
			height = w.innerHeight|| e.clientHeight|| g.clientHeight;
			callback(e, width, height); 
		});
	},
	load: function( file, callback ) {
		var head = (d.getElementsByTagName("head")[0] || d.head);
		var s;
		var type = file.split('.')[ (file.split('.').length - 1 )];
		switch( type ) {
			case 'css':
				// CSS CODE HERE
				break;
			default:
				var s = document.createElement("script");
					s.src = file;
					s.type = "text/javascript";
					// s.async = true;
					
					head.appendChild( s );
				break;
		}
		s.addEventListener("load", callback);
	}
};

function initHandler() {
	if(! richard.DOMReady ) {
		richard.isReady( initHandler );
	} else {
		pageLoaded();
	}
}
function pageLoaded() {
	wrapper.style.width  = x + 'px';
	wrapper.style.height = y + 'px';
	richard.watch(function(e, x, y) {
		wrapper.style.width  = x + 'px';
		wrapper.style.height = y + 'px';
	});
	richard.removeClass(g, 'is-loading');
}
richard.on(window, "load", initHandler);