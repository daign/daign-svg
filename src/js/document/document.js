daign.Document = function ( app ) {

	this.app = app;
	this.nodes = {};
	this.drawingGroups = {};
	this.children = [];

	this.page = new daign.Page();

	var path1 = new daign.Path( this );
	path1.parse( 'M 20,20 L 60,20 Q 50,50,80,40 L 80,60 C 50,60,80,80,60,80 L 40,80 A 20,20,0,0,0,20,60 Z' );
	this.children.push( path1 );

	var path2 = new daign.Path( this );
	path2.parse( 'M 15,30 L 25,30 Q 30,60,40,50 L 40,60 15,50 Z' );
	this.children.push( path2 );

};

daign.Document.prototype = {

	constructor: daign.Document,

	getNode: function ( viewName ) {

		var node = document.createElementNS( daign.SVGNS, 'g' );
		this.nodes[ viewName ] = node;

		node.appendChild( this.page.getNode() );

		var drawingGroup = document.createElementNS( daign.SVGNS, 'g' );
		node.appendChild( drawingGroup );
		this.drawingGroups[ viewName ] = drawingGroup;

		this.children.forEach( function ( child ) {
			drawingGroup.appendChild( child.getNode( viewName ) );
		} );

		return node;

	},

	toString: function () {

		var x = this.page.x;
		var y = this.page.y;
		var width = this.page.width;
		var height = this.page.height;
		var output = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="' + x + ',' + y + ',' + width + ',' + height + '">';
		output += this.drawingGroups[ '1' ].innerHTML;
		output += '</svg>';
		return output;

	}

};

