daign.Page = function () {

	this.x = 0;
	this.y = 0;
	this.width = 100;
	this.height = 100;

	this.nodes = {};

};

daign.Page.prototype = {

	constructor: daign.Page,

	getNode: function ( viewName ) {

		var node = document.createElementNS( daign.SVGNS, 'g' );
		this.nodes[ viewName ] = node;

		var sheet = document.createElementNS( daign.SVGNS, 'rect' );
		sheet.setAttribute( 'x', this.x );
		sheet.setAttribute( 'y', this.y );
		sheet.setAttribute( 'width', this.width );
		sheet.setAttribute( 'height', this.height );
		sheet.setAttribute( 'fill', '#fff' );
		sheet.setAttribute( 'stroke', '#000' );
		sheet.setAttribute( 'stroke-width', 0.3 );

		var shadow = document.createElementNS( daign.SVGNS, 'rect' );
		shadow.setAttribute( 'x', this.x+2 );
		shadow.setAttribute( 'y', this.y+2 );
		shadow.setAttribute( 'width', this.width );
		shadow.setAttribute( 'height', this.height );
		shadow.setAttribute( 'fill', '#ddd' );
		shadow.setAttribute( 'stroke', '#ddd' );
		shadow.setAttribute( 'stroke-width', 0.3 );

		node.appendChild( shadow );
		node.appendChild( sheet );

		return node;

	}

};

