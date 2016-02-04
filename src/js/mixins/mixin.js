daign.mixin = function ( target, mixin ) {

	for ( var property in mixin.prototype ) {
		if ( !target.prototype[ property ] ) {
			target.prototype[ property ] = mixin.prototype[ property ];
		}
	}

};

