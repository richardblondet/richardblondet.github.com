/*
 *|=======================================|
 *| [file:richard.js]
 *|
 *| Page Custom Logic. 
 *| @author Richard Blondet
 *|=======================================|
*/
var w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0],
	x = w.innerWidth || e.clientWidth || g.clientWidth,
	y = w.innerHeight|| e.clientHeight|| g.clientHeight,
	v,

	wrapper = d.getElementById("wrapper"), // our wrapper

_ = {
	version: "0.1",
	domReady: false,
	userAgent: navigator.userAgent || navigator.vendor || window.opera,
	isMobile: function() {
		var ua = this.userAgent;
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4))) {
			return true;
		} else {
			return false;
		}
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
			obj["on"+type] = callback;
		}
	},
	onReady: function( handler ) {	
		if( d.readyState != "loading" ) {
			if(typeof handler == "function"){
				this.domReady = true;
				handler();
			} else {
				return;	
			}
		}
		else {
			d.addEventListener("DOMContentLoaded", hander, false);
		}
	},
	watch: function( callback ) {
		this.on( window, "resize", function(e){
			callback(e); 
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
}
function initHandler() {
	console.log("Init handler");
	if( !window.console || typeof console == "undefined" ) {
		window.console = function(){};
	}
	reflow();
	_.watch(function(e){
		x = w.innerWidth || e.clientWidth || g.clientWidth;
		y = w.innerHeight|| e.clientHeight|| g.clientHeight;
		reflow();
	});
	// _.onReady(function(){
	// 	_.removeClass(document.body, "page-is-loading");
	// });
	politeLoadHandler();
}
function reflow() {
	var loaderEl = document.getElementById("loader");
	console.log("new width: ", x);
	console.log("new height: ", y);
	wrapper.style.top = "50px";
	wrapper.style.height = ( y - 100 ) + "px";
	loaderEl.style.width = ( x ) + "px";
	loaderEl.style.height = ( y ) + "px";
}
function politeLoadHandler() {
	var prepareAnimationSet = new Array();
	_.load("assets/js/velocity.min.js", function(){
		_.load("assets/js/velocity.ui.min.js", function(){
			/*Good to go*/
			prepareAnimationSet = [
				{
					e: document.getElementById("logo"),
					p: { translateY: ["-20px", 0], opacity: [0,1] },
					o: { duration: 250, delay: 550 }
				},
				{
					e: document.getElementById("page-heading"),
					p: { translateX: ["-50px", 0], opacity: [0,1] },
					o: { duration: 100, sequenceQueue: false }
				},
				{
					e: document.getElementById("the-content"),
					p: { opacity: [0,1] },
					o: { duration: 100, sequenceQueue: false }
				}
			]
			Velocity.RunSequence( prepareAnimationSet );
		});
		_.load("assets/js/vivus.min.js", loadingAnimation);
	});
}
function loadingAnimation() {
	new Vivus("svg-logo", {
		duration: 400,
		type: 'oneByOne',
		start: 'inViewport'
	}, introAnimationHandler);
}
/* Velocity CheatSheet
 *|=======================================|
	duration: 400,
	easing: "swing",
	queue: "",
	begin: undefined,
	progress: undefined,
	complete: undefined,
	display: undefined,
	visibility: undefined,
	loop: false,
	delay: false,
	mobileHA: true
 *|=======================================|
*/

function introAnimationHandler(prepareAnimationSet) {
	console.log(prepareAnimationSet);
	var loader = document.getElementById("loader"), 
		svgLogoPaths = document.querySelectorAll("#svg-logo path");
	// Velocity.mock = 1;
	var introAnimationSequence = [
		{
			e: svgLogoPaths,
			p: { fill: "#3D3F47" },
			o: { duration: 550 }
		},
		{
			e: document.getElementById("svg-logo-container"),
			p: { translateY: "50px", opacity: 0 },
			o: { duration: 450, delay: 200, easing: [ 0.17, 0.67, 0.83, 0.67] }
		},
		{
			e: loader,
			p: { opacity: 0 },
			o: { duration: 450, complete:function(){
				_.removeClass(document.body, "page-is-loading");
				loader.style.display = "none";
			}}
		},
		{
			e: document.getElementById("logo"),
			p: { translateY: [0, "-20px"], opacity: [1,0] },
			o: { duration: 300, delay: 650, easing: "ease-in-out" }
		},
		{
			e: document.getElementById("page-heading"),
			p: { translateX: [0, "-50px"], opacity: [1,0] },
			o: { duration: 300, delay: 400, easing: "ease-in-out" }
		},
		{
			e: document.getElementById("the-content"),
			p: { opacity: [1,0] },
			o: { duration: 300, delay: 350, easing: "ease-in-out", sequenceQueue: false }
		}
	];

	Velocity.RunSequence( introAnimationSequence );
}