daign.Menu = function ( containerNode ) {

	var node = document.createElement( 'div' );
	node.setAttribute( 'class', 'menu' );
	containerNode.appendChild( node );

	this.title = document.createElement( 'div' );
	this.title.setAttribute( 'class', 'title' );
	this.title.innerHTML = 'daign svg';
	node.appendChild( this.title );

	this.saveButton = document.createElement( 'button' );
	this.saveButton.innerHTML = 'Save';
	node.appendChild( this.saveButton );

};

