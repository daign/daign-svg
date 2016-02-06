daign.Selectable = function () {

	this.parent = undefined;
	this.children = [];

	this.treeViewNode = document.createElement( 'div' );
	this.treeViewNode.setAttribute( 'class', 'treeViewNode' );

	var self = this;
	var onClick = function () {
		self.branchesOpen = !self.branchesOpen;
		self.app.content.sidebar.documentTree.build();
	};
	this.treeViewNode.addEventListener( 'click', onClick, false );

	this.branchesOpen = false;


	this.append = function ( c ) {

		this.children.push( c );
		c.parent = this;

	};

	this.getTreeViewNode = function ( h ) {

		this.treeViewNode.style.paddingLeft = ( 16 * h + 6 ) + 'px';
		if ( this.children.length > 0 ) {
			//this.treeViewNode.innerHTML = ( this.branchesOpen ? '&#9660; ' : '&#9658; ' ) + this.type;
			this.treeViewNode.innerHTML = ( this.branchesOpen ? '&#9662; ' : '&#9656; ' ) + this.type;
		} else {
			this.treeViewNode.innerHTML = this.type;
		}
		return this.treeViewNode;

	};

	this.select = function ( b ) {

		this.treeViewNode.style.background = ( b ? '#bcd' : '#fff' );

	};

};

