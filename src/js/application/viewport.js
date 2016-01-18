daign.Viewport = function ( app, viewsNode ) {

	this.node = document.createElementNS( daign.SVGNS, 'svg' );
	this.node.setAttribute( 'class', 'viewport container' );
	this.node.setAttribute( 'xmlns:xlink', daign.XLink );
	viewsNode.appendChild( this.node );

	this.docNode = app.document.node;
	this.node.appendChild( this.docNode );

	this.controls = new daign.ControlLayer( this );
	app.selectionManager.addControlLayer( this.controls );

	this.viewCenter = new daign.Vector2( 50, 50 );
	this.viewCenterSnaphot = undefined;
	//this.viewScale = 1;
	this.viewDimensions = new daign.Vector2( 0, 0 );

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

	resize: function ( width, height, left, top ) {

		this.node.style.width  = ( width-2 ) + 'px';
		this.node.style.height = ( height-2 ) + 'px';
		this.node.style.left = left + 'px';
		this.node.style.top = top + 'px';
		this.node.setAttribute( 'viewBox', 0 + ',' + 0 + ',' + width + ',' + height );
		this.viewDimensions.set( width, height );
		this.updateViewport();

	},

	updateViewport: function () {

		var dx = ( this.viewDimensions.x * 0.5 ) - this.viewCenter.x;
		var dy = ( this.viewDimensions.y * 0.5 ) - this.viewCenter.y;
		this.docNode.setAttribute( 'transform', 'translate(' + dx + ',' + dy + ')' );

	},

	snap: function () {

		this.viewCenterSnaphot = this.viewCenter.clone();

	},

	drag: function ( v ) {

		this.viewCenter.copy( this.viewCenterSnaphot ).sub( v.multiplyScalar( 1 ) );
		this.updateViewport();

	},

	projectToViewCoordinates ( v ) {

		return this.viewDimensions.clone().multiplyScalar( 0.5 ).sub( this.viewCenter ).add( v );

	}

};

