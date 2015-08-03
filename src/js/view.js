daign.View = function ( app ) {

	this.node = document.createElementNS( daign.SVGNS, 'svg' );
	this.node.setAttribute( 'xmlns:xlink', daign.XLink );
	app.node.appendChild( this.node );

	this.node.setAttribute( 'width', app.width );
	this.node.setAttribute( 'height', app.height-40 );

};

daign.View.prototype = {

	constructor: daign.View,

	display: function ( document ) {

		this.node.appendChild( document.node );
		document.viewport.bindToView( this );

	}

};

