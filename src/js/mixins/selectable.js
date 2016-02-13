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
		self.app.selectionManager.select( self );
	};
	this.treeViewNode.addEventListener( 'click', onClick, false );

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

	this.update = function () {

		if ( this.parent !== undefined ) {
			this.parent.update();
		}

	};

	this.getTreeViewNode = function ( h ) {

		this.expandNode.style.marginLeft = ( 14 * h ) + 'px';
		return this.treeViewNode;

	};

	this.select = function ( b, controlLayers ) {

		this.treeViewNode.style.background = ( b ? '#bcd' : '#fff' );
		if ( b ) {
			var self = this;
			controlLayers.forEach( function ( c ) {
				c.clear();
				self.setUpControls( c );
			} );
		} else {
			this.controlElements = [];
		}

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

	// get previous element visible in tree view
	this.getPrevious = function () {

		if ( this.parent !== undefined ) {
			var siblings = this.parent.children;
			var i = siblings.indexOf( this );
			if ( i-1 >= 0 ) {
				var previous = siblings[ i-1 ];
				while ( previous.expanded && previous.children.length > 0 ) {
					previous = previous.children[ previous.children.length - 1 ];
				}
				return previous;
			} else {
				return this.parent;
			}
		} else {
			return undefined;
		}

	};

	// get next element visible in tree view
	this.getNext = function () {

		if ( this.expanded && this.children.length > 0 ) {
			this.app.selectionManager.select( this.children[ 0 ] );
		} else {
			var self = this;
			while ( self.parent !== undefined ) {
				var siblings = self.parent.children;
				var i = siblings.indexOf( self );
				if ( i+1 < siblings.length ) {
					return siblings[ i+1 ];
				} else {
					self = self.parent;
				}
			}
			return undefined;
		}

	};

	// select previous element visible in tree view
	this.up = function () {

		var previous = this.getPrevious();
		if ( previous !== undefined ) {
			this.app.selectionManager.select( previous );
		}

	};

	// select next element visible in tree view
	this.down = function () {

		var next = this.getNext();
		if ( next !== undefined ) {
			this.app.selectionManager.select( next );
		}

	};

	// collapse if expanded, select parent if collapsed
	this.left = function () {

		if ( this.expanded ) {
			this.setExpand( false );
		} else if ( this.parent !== undefined ) {
			this.app.selectionManager.select( this.parent );
		}

	};

	// expand if collapsed
	this.right = function () {

		if ( !this.expanded ) {
			this.setExpand( true );
		}

	};

	this.getTopmostGroup = function () {

		var self = this;
		while ( self.parent.type === 'Group' ) {
			self = self.parent;
		}
		return self;

	};

	this.getBox = function () {

		var box = new daign.Box2();
		this.children.forEach( function ( child ) {
			box.expandByBox( child.getBox() );
		} );
		return box;

	};

};

