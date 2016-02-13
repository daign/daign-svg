daign.Viewport = function ( app, viewName, viewsNode ) {

	this.app = app;

	this.viewName = viewName;

	this.node = document.createElement( 'div' );
	this.node.setAttribute( 'class', 'viewport container' );
	viewsNode.appendChild( this.node );

	this.contextNode = document.createElementNS( daign.SVGNS, 'svg' );
	this.contextNode.setAttribute( 'class', 'context container' );
	this.contextNode.setAttribute( 'xmlns:xlink', daign.XLink );
	this.node.appendChild( this.contextNode );

	this.transformNode = document.createElementNS( daign.SVGNS, 'g' );
	this.contextNode.appendChild( this.transformNode );

	var docNode = app.document.getNode( this.viewName );
	this.transformNode.appendChild( docNode );

	this.controls = new daign.ControlLayer( app, this );
	app.selectionManager.addControlLayer( this.controls );

	this.viewCenter = new daign.Vector2( 50, 50 );
	this.viewCenterSnaphot = undefined;
	this.viewScale = 2;
	this.viewDimensions = new daign.Vector2( 0, 0 );

	this.transformMatrix = new daign.Matrix3();
	this.backtransformMatrix = new daign.Matrix3();

	this.updateViewport();

	var self = this;
	var viewHandle = new daign.Handle( {
		domNode: self.contextNode,
		beginning: function () {
			self.snap();
			return true;
		},
		continuing: function () {
			self.drag( this.vectorT.clone().sub( this.vector0 ) );
		},
		ending: function () {},
		clicked: function () {
			app.selectionManager.select( null );
		},
		vector0: new daign.Vector2(),
		vectorT: new daign.Vector2()
	} );

	var onMouseWheel = function ( event ) {
		var sign = Math.sign( event.deltaY );
		var factor = Math.pow( 1.1, -sign );

		var oldScale = self.viewScale;
		self.viewScale = Math.max( 0.01, Math.min( 1000, oldScale * factor ) );
		factor = self.viewScale / oldScale;

		var mousePosition = self.projectToDocumentCoordinates( new daign.Vector2( event.layerX, event.layerY ) );
		self.viewCenter.copy( mousePosition.add( self.viewCenter.sub( mousePosition ).multiplyScalar( 1/factor ) ) );

		self.updateViewport();
		return false;
	};

	this.contextNode.addEventListener( 'wheel', onMouseWheel, false );

};

daign.Viewport.prototype = {

	constructor: daign.Viewport,

	resize: function ( width, height, left, top ) {

		width -= 2;  // because of border
		height -= 2;

		this.node.style.width  = width + 'px';
		this.node.style.height = height + 'px';
		this.node.style.left = left + 'px';
		this.node.style.top  = top + 'px';

		this.contextNode.style.width  = width + 'px';
		this.contextNode.style.height = height + 'px';
		this.contextNode.setAttribute( 'viewBox', 0 + ',' + 0 + ',' + width + ',' + height );
		this.viewDimensions.set( width-1, height-1 );
		this.updateViewport();

	},

	updateViewport: function () {

		this.transformMatrix.setIdentity();
		this.transformMatrix.applyTranslation( -this.viewCenter.x, -this.viewCenter.y );
		this.transformMatrix.applyScaling( this.viewScale, this.viewScale );
		this.transformMatrix.applyTranslation( this.viewDimensions.x * 0.5, this.viewDimensions.y * 0.5 );

		this.backtransformMatrix.setIdentity();
		this.backtransformMatrix.applyTranslation( -this.viewDimensions.x * 0.5, -this.viewDimensions.y * 0.5 );
		this.backtransformMatrix.applyScaling( 1/this.viewScale, 1/this.viewScale );
		this.backtransformMatrix.applyTranslation( this.viewCenter.x, this.viewCenter.y );

		this.transformNode.setAttribute( 'transform', this.transformMatrix.getTransformAttribute() );

		this.controls.update();

	},

	snap: function () {

		this.viewCenterSnaphot = this.viewCenter.clone();

	},

	drag: function ( v ) {

		this.viewCenter.copy( this.viewCenterSnaphot ).sub( v.multiplyScalar( 1/this.viewScale ) );
		this.updateViewport();

	},

	projectToViewCoordinates: function ( v ) {

		return v.clone().transform( this.transformMatrix );

	},

	projectToDocumentCoordinates: function ( v ) {

		return v.transform( this.backtransformMatrix );

	}

};

