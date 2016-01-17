daign.Status = function ( app ) {

	this.node = document.createElement( 'div' );
	this.node.setAttribute( 'class', 'status container' );
	app.node.appendChild( this.node );

};

daign.Status.prototype = {

	constructor: daign.Status,

	resize: function ( width, height, top ) {
		this.node.style.width = width + 'px';
		this.node.style.height = height + 'px';
		this.node.style.top = top + 'px';
	}

};

