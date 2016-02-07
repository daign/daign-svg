daign.Selectable = function ( hideable ) {

	this.parent = undefined;
	this.children = [];

	this.expanded = false;
	this.hidden   = false;
	this.hideable = hideable;

	this.treeViewNode = document.createElement( 'div' );
	this.treeViewNode.setAttribute( 'class', 'treeViewNode' );

	this.visibilityNode = document.createElement( 'div' );
	this.visibilityNode.setAttribute( 'class', 'visibility' );
	this.visibilityNode.innerHTML = ( hideable ? '&#9673;' : '&nbsp;' );
	this.treeViewNode.appendChild( this.visibilityNode );

	this.expandNode = document.createElement( 'div' );
	this.expandNode.setAttribute( 'class', 'expand' );
	this.expandNode.innerHTML = '&nbsp;';
	this.treeViewNode.appendChild( this.expandNode );

	this.textNode = document.createElement( 'div' );
	this.textNode.setAttribute( 'class', 'text' );
	this.textNode.innerHTML = this.type;
	this.treeViewNode.appendChild( this.textNode );

	var self = this;

	var onClick = function ( event ) {
		;
	};
	this.treeViewNode.addEventListener( 'click', onExpand, false );

	var onExpand = function ( event ) {
		if ( self.children.length > 0 ) {
			event.preventDefault();
			event.stopPropagation();
			self.toggleExpand();
		}
	};
	this.expandNode.addEventListener( 'click', onExpand, false );

	if ( this.hideable ) {
		var onHide = function ( event ) {
			event.preventDefault();
			event.stopPropagation();
			self.toggleHide();
		};
		this.visibilityNode.addEventListener( 'click', onHide, false );
	}

	this.append = function ( c ) {

		this.children.push( c );
		c.parent = this;
		this.setExpand( this.expanded );

	};

	this.getTreeViewNode = function ( h ) {

		this.expandNode.style.marginLeft = ( 14 * h ) + 'px';
		return this.treeViewNode;

	};

	this.select = function ( b ) {

		this.treeViewNode.style.background = ( b ? '#bcd' : '#fff' );

	};

	this.toggleExpand = function () {

		this.setExpand( !this.expanded );

	};

	this.setExpand = function ( b ) {

		if ( this.children.length > 0 ) {
			this.expanded = b;
			this.expandNode.innerHTML = ( this.expanded ? '&#9662;' : '&#9656;' );
			if ( this.app.content !== undefined ) {
				this.app.content.sidebar.documentTree.build();
			}
		} else {
			this.expandNode.innerHTML = '&nbsp;';
		}

	};

	this.toggleHide = function () {

		this.setHide( !this.hidden );

	};

	this.setHide = function ( b ) {

		if ( this.hideable ) {
			this.hidden = b;

			for ( var n in this.nodes ) {
				this.nodes[ n ].style.display = ( b ? 'none' : 'block' );
				this.visibilityNode.innerHTML = ( b ? '&#9676;' : '&#9673;' );
			}
			// TODO remove controls if selected
		}

	};

};

