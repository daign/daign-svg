daign.Viewport = function ( svgNode ) {

	this.svgNode = svgNode;

	this.viewCenter = new daign.Vector2( 50, 50 );
	this.viewCenterSnaphot = undefined;
	this.viewScale = 1;
	this.viewDimensions = new daign.Vector2( 240, 120 );
	this.updateViewPort();

	var self = this;
	var viewHandle = new daign.Handle( {
		domNode: self.svgNode,
		beginning: function () {
			self.snap();
		},
		continuing: function () {
			self.drag( this.vectorT.sub( this.vector0 ) );
		},
		ending: function () {},
		clicked: function () {
			daign.ControlsManager.showPath( null );
		},
		vector0: new daign.Vector2(),
		vectorT: new daign.Vector2()
	} );

};

daign.Viewport.prototype = {

	constructor: daign.Viewport,

	updateViewPort: function () {

		var x1 = this.viewCenter.x - ( this.viewDimensions.x * 0.5 );
		var y1 = this.viewCenter.y - ( this.viewDimensions.y * 0.5 );
		this.svgNode.setAttribute( 'viewBox', x1 + ',' + y1 + ',' + this.viewDimensions.x + ',' + this.viewDimensions.y );

	},

	snap: function () {

		this.viewCenterSnaphot = this.viewCenter.clone();

	},

	drag: function ( v ) {

		this.viewCenter.copy( this.viewCenterSnaphot ).sub( v.multiplyScalar( 0.25 ) );
		this.updateViewPort();

	}

};

