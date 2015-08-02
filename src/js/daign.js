daign = {};
daign.SVGNS = 'http://www.w3.org/2000/svg';
daign.XLink = 'http://www.w3.org/1999/xlink';

daign.init = function ( containerNode ) {

	var width = containerNode.clientWidth;
	var height = containerNode.clientHeight;

	var menu = new daign.Menu( containerNode );
	var view = new daign.View( containerNode, width, height-40, menu.saveButton );

};

