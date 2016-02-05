daign.Selectable = function () {

	this.treeViewNode = document.createElement( 'div' );
	this.treeViewNode.setAttribute( 'class', 'treeViewNode' );

};

daign.Selectable.prototype = {

	constructor: daign.Selectable,

	getTreeViewNode: function ( h ) {

		this.treeViewNode.style.paddingLeft = ( 16 * h + 6 ) + 'px';
		this.treeViewNode.innerHTML = this.type;
		return this.treeViewNode;

	},

	select: function ( b ) {

		this.treeViewNode.style.background = ( b ? '#bcd' : '#fff' );

	}

};

