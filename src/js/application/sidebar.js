daign.Sidebar = function ( app, contentNode ) {

	this.node = document.createElement( 'div' );
	this.node.setAttribute( 'class', 'container' );
	contentNode.appendChild( this.node );

	this.documentTree = new daign.DocumentTree( app, this.node );

};

daign.Sidebar.prototype = {

	constructor: daign.Sidebar,

	resize: function ( width, height, left ) {
		this.node.style.width = width + 'px';
		this.node.style.height = height + 'px';
		this.node.style.left = left + 'px';

		this.documentTree.resize( width, height );
	}

};

