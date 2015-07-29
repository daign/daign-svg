daign.Page = function ( parent, p1, p2 ) {

	this.p1 = p1;
	this.p2 = p2;

	this.node = document.createElementNS( daign.SVGNS, 'rect' );
	this.node.setAttribute( 'x', 0 );
	this.node.setAttribute( 'y', 0 );
	this.node.setAttribute( 'width', 100 );
	this.node.setAttribute( 'height', 100 );
	this.node.setAttribute( 'fill', '#fff' );
	this.node.setAttribute( 'stroke', '#000' );
	this.node.setAttribute( 'stroke-width', 0.3 );

	this.shadow = document.createElementNS( daign.SVGNS, 'rect' );
	this.shadow.setAttribute( 'x', 2 );
	this.shadow.setAttribute( 'y', 2 );
	this.shadow.setAttribute( 'width', 100 );
	this.shadow.setAttribute( 'height', 100 );
	this.shadow.setAttribute( 'fill', '#ddd' );
	this.shadow.setAttribute( 'stroke', '#ddd' );
	this.shadow.setAttribute( 'stroke-width', 0.3 );

	parent.appendChild( this.shadow );
	parent.appendChild( this.node );

};

