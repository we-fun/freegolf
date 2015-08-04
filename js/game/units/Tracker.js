
(function(){
	'use strict';
	
	window.Tracker = MovableUnit.extend({
		init: function(camera){
			this._super();
			// camera
			this.camera = camera;
			camera.rotation.y = Math.PI;
			this.add(camera);
			
			return this;
		},
		
		act: function(ball){
			var vel = ball.velocity;
			
			this.velocity.copy(
				 vel.clone().divideScalar(
				 	Math.abs(vel.y) < 1 || vel.y > 0? 1.5: 4
				 )
			);
			
			return this._super();
		},
		
		set: function(ball, goal){
			//this.position.copy(new THREE.Vector3(0, 1500, 2500));
			//this.lookAt(new THREE.Vector3(0, 0, goal.position.z / 2));
			
			var pos1 = ball.position,
				pos2 = goal.position;
			/*this.position.copy(
				pos1.clone().add(pos1.clone().sub(pos2.clone()).normalize().multiplyScalar(2500))
					.add(new THREE.Vector3(0, 1500, 0))
			);
			this.lookAt(
				pos1.clone().add(pos2.clone()).divideScalar(2)
			);*/
			this.position.copy(
				pos1.clone().add(new THREE.Vector3(0, 1500, 2500))
			);
			
			return this;
		}
	}, {
		type: 'tracker'
	});
})();
