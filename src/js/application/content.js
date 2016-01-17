daign.Content = function ( app ) {

	this.node = document.createElement( 'div' );
	this.node.setAttribute( 'class', 'container' );
	app.node.appendChild( this.node );

	this.views = new daign.Views( app, this.node );

	this.splitter = document.createElement( 'div' );
	this.splitter.setAttribute( 'class', 'splitter container' );
	this.node.appendChild( this.splitter );

	this.sidebar = new daign.Sidebar( app, this.node );

};

daign.Content.prototype = {

	constructor: daign.Content,

	resize: function ( width, height, top ) {
		this.node.style.width = width + 'px';
		this.node.style.height = height + 'px';
		this.node.style.top = top + 'px';

		var splitterWidth = 10;
		var sidebarWidth = 200;
		var viewsWidth = Math.max( width-sidebarWidth-splitterWidth, 200 );

		this.views.resize( viewsWidth, height );
		this.sidebar.resize( sidebarWidth, height, viewsWidth+splitterWidth );

		this.splitter.style.width = splitterWidth + 'px';
		this.splitter.style.height = height + 'px';
		this.splitter.style.left = viewsWidth + 'px';
	}

};

