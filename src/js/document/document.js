daign.Document = function ( app ) {

	this.node = document.createElementNS( daign.SVGNS, 'g' );

	var pageGroup     = document.createElementNS( daign.SVGNS, 'g' );
	this.drawingGroup = document.createElementNS( daign.SVGNS, 'g' );
	var controlsGroup = document.createElementNS( daign.SVGNS, 'g' );
	this.node.appendChild( pageGroup );
	this.node.appendChild( this.drawingGroup );
	this.node.appendChild( controlsGroup );

	var page = new daign.Page( pageGroup );
	this.controls = new daign.ControlsManager( controlsGroup );

	this.viewport = new daign.Viewport( app, this.controls );

	var path1 = new daign.Path( this );
	path1.parse( 'M 20,20 L 60,20 Q 50,50,80,40 L 80,60 C 50,60,80,80,60,80 L 40,80 A 20,20,0,0,0,20,60 Z' );
	this.drawingGroup.appendChild( path1.node );

	var path2 = new daign.Path( this );
	path2.parse( 'M 15,30 L 25,30 Q 30,60,40,50 L 40,60 15,50 Z' );
	this.drawingGroup.appendChild( path2.node );

};

daign.Document.prototype = {

	constructor: daign.Document,

	toString: function () {

		var x = this.viewport.viewCenter.x - 0.5 * this.viewport.viewDimensions.x;
		var y = this.viewport.viewCenter.y - 0.5 * this.viewport.viewDimensions.y;
		var width = this.viewport.viewDimensions.x;
		var height = this.viewport.viewDimensions.y;
		var output = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="' + x + ',' + y + ',' + width + ',' + height + '">';
		output += this.drawingGroup.innerHTML;
		output += '</svg>';
		return output;

	}

};

