daign = {};
daign.SVGNS = 'http://www.w3.org/2000/svg';

daign.init = function ( svgNode ) {

	svgNode.setAttribute( 'width', '800' );
	svgNode.setAttribute( 'height', '400' );

	var page = document.createElementNS( daign.SVGNS, 'g' );
	var drawing = document.createElementNS( daign.SVGNS, 'g' );
	var controls = document.createElementNS( daign.SVGNS, 'g' );
	svgNode.appendChild( page );
	svgNode.appendChild( drawing );
	svgNode.appendChild( controls );

	new daign.Page( page );
	daign.ControlsManager.setGroup( controls );

	var view = new daign.Viewport( svgNode );

	var path1 = new daign.Path();
	path1.parse( 'M 20,20 L 60,20 Q 50,50,80,40 L 80,60 C 50,60,80,80,60,80 L 40,80 A 20,20,0,0,0,20,60 Z' );
	drawing.appendChild( path1.node );

	var path2 = new daign.Path();
	path2.parse( 'M 15,30 L 25,30 Q 30,60,40,50 L 40,60 15,50 Z' );
	drawing.appendChild( path2.node )

	var saveButton = document.getElementById( 'saveButton' );
	var onsave = function () {
		var x = view.viewCenter.x - 0.5 * view.viewDimensions.x;
		var y = view.viewCenter.y - 0.5 * view.viewDimensions.y;
		var width = view.viewDimensions.x;
		var height = view.viewDimensions.y;
		var output = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="' + x + ',' + y + ',' + width + ',' + height + '">';
		output += drawing.innerHTML;
		output += '</svg>';

		var blob = new Blob( [ output ], { type: "text/plain;charset=utf-8" } );
		saveAs( blob, "drawing.svg" );
	};
	saveButton.addEventListener( 'click', onsave, false );

};

