daign.Viewport = function ( app, viewsNode ) {

	this.node = document.createElementNS( daign.SVGNS, 'svg' );
	this.node.setAttribute( 'class', 'viewport container' );
	this.node.setAttribute( 'xmlns:xlink', daign.XLink );
	viewsNode.appendChild( this.node );

	this.node.appendChild( app.document.node );

	this.controls = new daign.ControlLayer( this.node );
	app.selectionManager.addControlLayer( this.controls );

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

};

daign.Viewport.prototype = {

	constructor: daign.Viewport,

	resize: function ( width, height ) {

		this.node.style.width  = ( width-2 ) + 'px';
		this.node.style.height = ( height-2 ) + 'px';

	},

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

