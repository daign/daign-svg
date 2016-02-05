daign.mixin = function ( target, mixin ) {

	for ( var property in mixin ) {
		if ( !target[ property ] ) {
			target[ property ] = mixin[ property ];
		}
	}

};

