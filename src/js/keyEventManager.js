daign.KeyEventManager = function ( app ) {

	var onKeydown = function ( event ) {
		//console.log( event.keyCode );
	};
	app.node.addEventListener( 'keydown', onKeydown, false );

};

daign.KeyEventManager.prototype = {

	constructor: daign.KeyEventManager

};

