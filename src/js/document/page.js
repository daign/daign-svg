daign.Page = function ( parent ) {

	this.x = 0;
	this.y = 0;
	this.width = 100;
	this.height = 100;

	this.node = document.createElementNS( daign.SVGNS, 'rect' );
	this.node.setAttribute( 'x', this.x );
	this.node.setAttribute( 'y', this.y );
	this.node.setAttribute( 'width', this.width );
	this.node.setAttribute( 'height', this.height );
	this.node.setAttribute( 'fill', '#fff' );
	this.node.setAttribute( 'stroke', '#000' );
	this.node.setAttribute( 'stroke-width', 0.3 );

	this.shadow = document.createElementNS( daign.SVGNS, 'rect' );
	this.shadow.setAttribute( 'x', this.x+2 );
	this.shadow.setAttribute( 'y', this.y+2 );
	this.shadow.setAttribute( 'width', this.width );
	this.shadow.setAttribute( 'height', this.height );
	this.shadow.setAttribute( 'fill', '#ddd' );
	this.shadow.setAttribute( 'stroke', '#ddd' );
	this.shadow.setAttribute( 'stroke-width', 0.3 );

	parent.appendChild( this.shadow );
	parent.appendChild( this.node );

};

