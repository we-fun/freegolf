
(function(){
	'use strict';
	
	var radius = 50;
	
	window.Ball = MovableUnit.extend({
		init: function(){
			this._super();
			
			// radius, mass, elasticity
			this.radius = Ball.radius;
			this.mass = Ball.mass;
			this.elasticity = Ball.elasticity;
			
			return this;
		},
		
		act: function(test){
			this.rotation.x += this.velocity.z / 120;
			this.rotation.z -= this.velocity.x / 120;
			
			return this._super(test);
		}
	}, {
		type: 'ball',
		
		radius: radius,
		mass: 100,
		elasticity: 0.5,
		
		geometry: new THREE.SphereGeometry(radius, 12, 12),
		material: new THREE.MeshBasicMaterial({
			color: 0xEEEEEE
			//map: THREE.ImageUtils.loadTexture('img/textures/glowstone.png')
		})
	});
})();
