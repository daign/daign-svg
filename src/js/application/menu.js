daign.Menu = function ( app ) {

	this.node = document.createElement( 'div' );
	this.node.setAttribute( 'class', 'menu container' );
	app.node.appendChild( this.node );

	this.title = document.createElement( 'div' );
	this.title.setAttribute( 'class', 'title' );
	this.title.innerHTML = 'daign SVG';
	this.node.appendChild( this.title );

	this.saveButton = document.createElement( 'button' );
	this.saveButton.innerHTML = 'Save';
	this.node.appendChild( this.saveButton );

	var onSave = function () {
		var output = app.document.toString();
		var blob = new Blob( [ output ], { type: "text/plain;charset=utf-8" } );
		saveAs( blob, "drawing.svg" );
	};
	this.saveButton.addEventListener( 'click', onSave, false );

};

daign.Menu.prototype = {

	constructor: daign.Menu,

	resize: function ( width, height ) {
		this.node.style.width = width + 'px';
		this.node.style.height = height + 'px';
	}

};

