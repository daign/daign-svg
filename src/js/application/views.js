daign.Views = function ( app, contentNode ) {

	this.node = document.createElement( 'div' );
	this.node.setAttribute( 'class', 'container' );
	contentNode.appendChild( this.node );

	this.viewport1 = new daign.Viewport( app, this.node );
	this.viewport2 = new daign.Viewport( app, this.node );

};

daign.Views.prototype = {

	constructor: daign.Views,

	resize: function ( width, height ) {

		this.node.style.width = width + 'px';
		this.node.style.height = height + 'px';

		var width1 = Math.round( width * 0.5 );

		this.viewport1.resize( width1, height, 0, 0 );
		this.viewport2.resize( width-width1, height, width1, 0 );

	}

};

