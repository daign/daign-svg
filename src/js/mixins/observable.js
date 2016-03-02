daign.Observable = function () {

	this.callbacks = [];

	this.addObserver = function ( callback ) {

		this.callbacks.push( callback );

	};

	this.clearObservers = function () {

		this.callbacks = [];

	};

	this.notifyObservers = function () {

		this.callbacks.forEach( function ( callback ) {
			callback();
		} );

	};

};

