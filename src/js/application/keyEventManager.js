daign.KeyEventManager = function ( app ) {

	var onKeydown = function ( event ) {
		var keyCode = event.keyCode;
		//console.log( keyCode );

		if ( keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40 || keyCode === 72 ) {
			event.preventDefault();
			event.stopPropagation();
			app.selectionManager.onKeyDown( keyCode );
		}
	};
	document.addEventListener( 'keydown', onKeydown, false );

};

daign.KeyEventManager.prototype = {

	constructor: daign.KeyEventManager

};

