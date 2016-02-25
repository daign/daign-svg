daign.Transformable = function () {

	this.translate = new daign.Vector2( 0, 0 );
	this.scale     = new daign.Vector2( 1, 1 );

	this.transformMatrix     = new daign.Matrix3();
	this.backtransformMatrix = new daign.Matrix3();

	this.updateTransformMatrix = function () {

		this.transformMatrix.setIdentity();
		this.transformMatrix.applyTranslation( this.translate.x, this.translate.y );
		this.transformMatrix.applyScaling( this.scale.x, this.scale.y );

		this.backtransformMatrix.setIdentity();
		this.backtransformMatrix.applyScaling( 1/this.scale.x, 1/this.scale.y );
		this.backtransformMatrix.applyTranslation( -this.translate.x, -this.translate.y );

	};
	this.updateTransformMatrix();

};

