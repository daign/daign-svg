daign.Selectable = {};

daign.Selectable.prototype = {

	treeViewNode: document.createElement( 'div' ),

	getTreeViewNode: function ( h ) {

		var res = '';
		for ( var i = 0; i < h; i++ ) {
			res += '-';
		}
		this.treeViewNode.innerHTML = res + this.type;
		return this.treeViewNode;

	}

};

