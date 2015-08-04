
(function(){
	'use strict';
	
	var radius = 150;
	var poleRadius = 20, poleHeight = 1000;
	
	// flagpole
	var flagpole = new THREE.Object3D();
	var pole = new THREE.Mesh(
		new THREE.CylinderGeometry(poleRadius, poleRadius, poleHeight),
		new THREE.MeshBasicMaterial({
			color: 0x999999
		})
	);
	pole.position.copy(new THREE.Vector3(0, poleHeight / 2, 0));
	var flag = new THREE.Mesh(
		(function(){
			var geom = new THREE.Geometry();
			geom.vertices.push(new THREE.Vector3(0, 600, 0));
			geom.vertices.push(new THREE.Vector3(0, 1000, 0));
			geom.vertices.push(new THREE.Vector3(500, 800, 0));
			geom.faces.push(new THREE.Face3(0, 2, 1));
			return geom;
		})(),
		new THREE.MeshBasicMaterial({
			side: THREE.DoubleSide,
			//map: THREE.ImageUtils.loadTexture('img/textures/opaque.png')
			color: 0xFFFF33
		})
	);
	flagpole.add(pole);
	flagpole.add(flag);
	flagpole.position.copy(new THREE.Vector3(-radius / 3, 0, -radius));
	
	// hole
	var hole = new THREE.Mesh(
		new THREE.CircleGeometry(radius, 16),
		new THREE.MeshBasicMaterial({
			color: 0x000000,
			side: THREE.DoubleSide
		})
	);
	hole.position.copy(new THREE.Vector3(0, 15, 0));	// above the ground
	hole.rotation.x = -Math.PI / 2;
	
	window.Goal = Unit.extend({
		init: function(){
			this._super();
			
			// hole
			this.hole = hole;
			// radius
			this.radius = Goal.radius;
			
			// objects
			this.add(flagpole);
			this.add(hole);
			
			return this;
		}
	}, {
		type: 'goal',
		
		radius: radius
	});
})();
