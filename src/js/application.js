daign.Application = function ( node ) {

	this.node = node;

	this.width = this.node.clientWidth;
	this.height = this.node.clientHeight;

	this.keyEventManager = new daign.KeyEventManager( this );
	this.menu = new daign.Menu( this );
	this.view = new daign.View( this );

	var document1 = new daign.Document( this );
	this.view.display( document1 );

	var self = this;
	var onFocus = function ( event ) { self.menu.setFocus( true ); };
	var onBlur = function ( event ) { self.menu.setFocus( false ); };
	this.node.addEventListener( 'focus', onFocus, false );
	this.node.addEventListener( 'blur', onBlur, false );

	this.node.setAttribute( 'tabindex', 1 );
	this.focus();

	var onsave = function () {
		var output = document1.toString();
		var blob = new Blob( [ output ], { type: "text/plain;charset=utf-8" } );
		saveAs( blob, "drawing.svg" );
	};
	this.menu.saveButton.addEventListener( 'click', onsave, false );

};

daign.Application.prototype = {

	constructor: daign.Application,

	focus: function () {

		this.node.focus();

	}

};

