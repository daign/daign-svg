daign.Page = function ( documentNode ) {

	this.node = document.createElementNS( daign.SVGNS, 'g' );
	documentNode.appendChild( this.node );

	this.x = 0;
	this.y = 0;
	this.width = 100;
	this.height = 100;

	this.sheet = document.createElementNS( daign.SVGNS, 'rect' );
	this.sheet.setAttribute( 'x', this.x );
	this.sheet.setAttribute( 'y', this.y );
	this.sheet.setAttribute( 'width', this.width );
	this.sheet.setAttribute( 'height', this.height );
	this.sheet.setAttribute( 'fill', '#fff' );
	this.sheet.setAttribute( 'stroke', '#000' );
	this.sheet.setAttribute( 'stroke-width', 0.3 );

	this.shadow = document.createElementNS( daign.SVGNS, 'rect' );
	this.shadow.setAttribute( 'x', this.x+2 );
	this.shadow.setAttribute( 'y', this.y+2 );
	this.shadow.setAttribute( 'width', this.width );
	this.shadow.setAttribute( 'height', this.height );
	this.shadow.setAttribute( 'fill', '#ddd' );
	this.shadow.setAttribute( 'stroke', '#ddd' );
	this.shadow.setAttribute( 'stroke-width', 0.3 );

	this.node.appendChild( this.shadow );
	this.node.appendChild( this.sheet );

};

