daign.Handle = function ( settings ) {

	this.domNode = settings.domNode;
	this.vector0 = settings.vector0;
	this.vectorT = settings.vectorT;

	this.beginning  = settings.beginning;
	this.continuing = settings.continuing;
	this.ending     = settings.ending;
	this.clicked    = settings.clicked;

	var self = this;

	var beginDrag = function ( event ) {

		event.preventDefault();
		event.stopPropagation();

		var dragged = false;

		self.vector0.setFromEvent( event );
		self.beginning();

		var cancelSelect = function ( event ) {

			event.preventDefault();
			event.stopPropagation();

		};

		var continueDrag = function ( event ) {

			event.preventDefault();
			event.stopPropagation();

			dragged = true;

			self.vectorT.setFromEvent( event );
			self.continuing();

		};

		var endDrag = function ( event ) {

			event.preventDefault();
			event.stopPropagation();

			self.vectorT.setFromEvent( event );

			if ( dragged ) {
				self.ending();
			} else {
				self.clicked();
			}

			document.removeEventListener( 'selectstart', cancelSelect, false );

			document.removeEventListener( 'mousemove',   continueDrag, false );
			document.removeEventListener( 'touchmove',   continueDrag, false );

			document.removeEventListener( 'mouseup',     endDrag, false );
			document.removeEventListener( 'touchend',    endDrag, false );
			document.removeEventListener( 'touchcancel', endDrag, false );
			document.removeEventListener( 'touchleave',  endDrag, false );

		};

		document.addEventListener( 'selectstart', cancelSelect, false );

		document.addEventListener( 'mousemove',   continueDrag, false );
		document.addEventListener( 'touchmove',   continueDrag, false );

		document.addEventListener( 'mouseup',     endDrag, false );
		document.addEventListener( 'touchend',    endDrag, false );
		document.addEventListener( 'touchcancel', endDrag, false );
		document.addEventListener( 'touchleave',  endDrag, false );

	};

	this.domNode.addEventListener( 'mousedown',  beginDrag, false );
	this.domNode.addEventListener( 'touchstart', beginDrag, false );

};

