daign.Menu = function ( app ) {

	this.node = document.createElement( 'div' );
	this.node.setAttribute( 'class', 'menu blur' );
	app.node.appendChild( this.node );

	this.title = document.createElement( 'div' );
	this.title.setAttribute( 'class', 'title' );
	this.title.innerHTML = 'daign svg';
	this.node.appendChild( this.title );

	this.saveButton = document.createElement( 'button' );
	this.saveButton.innerHTML = 'Save';
	this.node.appendChild( this.saveButton );

};

daign.Menu.prototype = {

	constructor: daign.Menu,

	setFocus: function ( b ) {

		if ( b ) {
			this.node.setAttribute( 'class', 'menu focus' );
		} else {
			this.node.setAttribute( 'class', 'menu blur' );
		}

	}

};

