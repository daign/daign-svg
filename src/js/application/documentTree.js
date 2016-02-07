daign.DocumentTree = function ( app, sidebarNode ) {

	this.app = app;

	this.node = document.createElement( 'div' );
	this.node.setAttribute( 'class', 'documentTree container' );
	sidebarNode.appendChild( this.node );

	this.build();

};

daign.DocumentTree.prototype = {

	constructor: daign.DocumentTree,

	resize: function ( width, height ) {

		this.node.style.width  = ( width-2 ) + 'px';
		this.node.style.height = ( height-2 ) + 'px';

	},

	build: function () {

		while ( this.node.firstChild ) {
			this.node.removeChild( this.node.firstChild );
		}

		var self = this;
		var traverse = function ( parent, h ) {
			self.node.appendChild( parent.getTreeViewNode( h ) );

			if ( parent.children.length > 0 && parent.expanded ) {
				parent.children.forEach( function ( child ) {
					traverse( child, h+1 );
				} );
			}
		};

		traverse( this.app.document, 0 )

	}

};

