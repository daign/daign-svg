daign.Views = function ( app, contentNode ) {

	this.node = document.createElement( 'div' );
	this.node.setAttribute( 'class', 'container' );
	contentNode.appendChild( this.node );

	this.viewport = new daign.Viewport( app, this.node );

};

daign.Views.prototype = {

	constructor: daign.Views,

	resize: function ( width, height ) {

		this.node.style.width = width + 'px';
		this.node.style.height = height + 'px';

		this.viewport.resize( width, height );

	}

};

