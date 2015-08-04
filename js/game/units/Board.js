
(function(){
	'use strict';
	
	window.Board = Unit.extend({
		init: function(width, depth, colorOrTexture){
			this._super();
			// width, depth
			this.width = width;
			this.depth = depth;
			
			// geometry, material
			this.setGeometry(new THREE.PlaneGeometry(width, depth));
			this.setMaterial(
				this._class.material? this._class.material:
					new THREE.MeshBasicMaterial((function(){
						var o = { side: THREE.DoubleSide };
						if (! isNaN(colorOrTexture)) {	// color
							var color = colorOrTexture
							o.color = color;
						} else {
							var texture = colorOrTexture;
							o.map = THREE.ImageUtils.loadTexture(texture);
						}
						return o;
					})())
			);
			
			return this;
		}
	}, {
		type: 'board'
	});
})();
