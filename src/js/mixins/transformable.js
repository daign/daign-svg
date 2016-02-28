daign.Transformable = function () {

	this.transformations = [];

	this.transformMatrix     = new daign.Matrix3();
	this.backtransformMatrix = new daign.Matrix3();
	this.transformAttribute  = '';

	this.addTransformation = function ( transformation ) {

		this.transformations.push( transformation );
		transformation.addObserver( this.updateTransformation )
		this.updateTransformation();

	};

	this.updateTransformation = function () {

		this.transformMatrix.setIdentity();
		this.backtransformMatrix.setIdentity();
		this.transformAttribute = '';

		self = this;
		this.transformations.forEach( function ( t ) {
			self.transformMatrix.multiply( t.matrix );
			self.backtransformMatrix.transform( t.backmatrix ),
			self.transformAttribute += ' ' + t.attribute
		} );

	};

	this.updateTransformation();

};

