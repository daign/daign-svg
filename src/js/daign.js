daign = {};
daign.SVGNS = 'http://www.w3.org/2000/svg';
daign.XLink = 'http://www.w3.org/1999/xlink';

daign.init = function ( containerNode ) {

	var width = containerNode.clientWidth;
	var height = containerNode.clientHeight;

	var menu = document.createElement( 'div' );
	menu.setAttribute( 'class', 'menu' );
	containerNode.appendChild( menu );

	var saveButton = document.createElement( 'button' );
	saveButton.innerHTML = 'save';
	menu.appendChild( saveButton );

	var view = new daign.View( containerNode, width, height-40, saveButton );

};

