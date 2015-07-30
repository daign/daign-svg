daign.View = function ( parent, width, height, saveButton ) {

	this.node = document.createElementNS( daign.SVGNS, 'svg' );
	this.node.setAttribute( 'xmlns:xlink', daign.XLink );
	parent.appendChild( this.node );

	this.node.setAttribute( 'width', width );
	this.node.setAttribute( 'height', height );

	var pageGroup = document.createElementNS( daign.SVGNS, 'g' );
	var drawingGroup = document.createElementNS( daign.SVGNS, 'g' );
	var controlsGroup = document.createElementNS( daign.SVGNS, 'g' );
	this.node.appendChild( pageGroup );
	this.node.appendChild( drawingGroup );
	this.node.appendChild( controlsGroup );

	var page = new daign.Page( pageGroup );
	this.controls = new daign.ControlsManager( controlsGroup );

	this.viewCenter = new daign.Vector2( 50, 50 );
	this.viewCenterSnaphot = undefined;
	this.viewScale = 1;
	this.viewDimensions = new daign.Vector2( 240, 120 );
	this.updateViewport();

	var self = this;
	var viewHandle = new daign.Handle( {
		domNode: self.node,
		beginning: function () {
			self.snap();
		},
		continuing: function () {
			self.drag( this.vectorT.sub( this.vector0 ) );
		},
		ending: function () {},
		clicked: function () {
			self.controls.showPath( null );
		},
		vector0: new daign.Vector2(),
		vectorT: new daign.Vector2()
	} );

	var path1 = new daign.Path( this );
	path1.parse( 'M 20,20 L 60,20 Q 50,50,80,40 L 80,60 C 50,60,80,80,60,80 L 40,80 A 20,20,0,0,0,20,60 Z' );
	drawingGroup.appendChild( path1.node );

	var path2 = new daign.Path( this );
	path2.parse( 'M 15,30 L 25,30 Q 30,60,40,50 L 40,60 15,50 Z' );
	drawingGroup.appendChild( path2.node );

	var onsave = function () {
		var x = self.viewCenter.x - 0.5 * self.viewDimensions.x;
		var y = self.viewCenter.y - 0.5 * self.viewDimensions.y;
		var width = self.viewDimensions.x;
		var height = self.viewDimensions.y;
		var output = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="' + x + ',' + y + ',' + width + ',' + height + '">';
		output += drawingGroup.innerHTML;
		output += '</svg>';

		var blob = new Blob( [ output ], { type: "text/plain;charset=utf-8" } );
		saveAs( blob, "drawing.svg" );
	};
	saveButton.addEventListener( 'click', onsave, false );

};

daign.View.prototype = {

	constructor: daign.View,

	updateViewport: function () {

		var x1 = this.viewCenter.x - ( this.viewDimensions.x * 0.5 );
		var y1 = this.viewCenter.y - ( this.viewDimensions.y * 0.5 );
		this.node.setAttribute( 'viewBox', x1 + ',' + y1 + ',' + this.viewDimensions.x + ',' + this.viewDimensions.y );

	},

	snap: function () {

		this.viewCenterSnaphot = this.viewCenter.clone();

	},

	drag: function ( v ) {

		this.viewCenter.copy( this.viewCenterSnaphot ).sub( v.multiplyScalar( 0.25 ) );
		this.updateViewport();

	}

};

