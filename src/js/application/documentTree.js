daign.DocumentTree = function ( app, sidebarNode ) {

	this.node = document.createElement( 'div' );
	this.node.setAttribute( 'class', 'documentTree container' );
	sidebarNode.appendChild( this.node );

};

daign.DocumentTree.prototype = {

	constructor: daign.DocumentTree,

	resize: function ( width, height ) {
		this.node.style.width = width + 'px';
		this.node.style.height = height + 'px';
	}

};

