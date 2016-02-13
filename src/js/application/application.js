daign.Application = function ( node ) {

	this.node = node;

	this.keyEventManager  = new daign.KeyEventManager( this );
	this.selectionManager = new daign.SelectionManager( this );
	this.domPool          = new daign.DomPool( this );

	this.document = new daign.Document( this );

	this.menu    = new daign.Menu( this );
	this.content = new daign.Content( this );
	this.status  = new daign.Status( this );

	this.document.setExpand( true );
	this.selectionManager.last_selected = this.document;

	var postponedResize = daign.SCHEDULE.postpone( this.resize, this, 20 );
	var throttledResize = daign.SCHEDULE.deferringThrottle( this.resize, this, 40 );

	this.resize();
	postponedResize();

	window.addEventListener( 'resize', throttledResize, false );

};

daign.Application.prototype = {

	constructor: daign.Application,

	resize: function () {

		var width = Math.max( window.innerWidth, 300 );
		var height = Math.max( window.innerHeight, 200 );

		this.node.style.width = width + 'px';
		this.node.style.height = height + 'px';

		var menuHeight = 30;
		var statusHeight = 20;
		var contentHeight = height - menuHeight - statusHeight;

		this.menu.resize( width, menuHeight );
		this.content.resize( width, contentHeight, menuHeight );
		this.status.resize( width, statusHeight, menuHeight+contentHeight );

	}

};

