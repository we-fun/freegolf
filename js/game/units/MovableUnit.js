
(function(){
	'use strict';
	
	window.MovableUnit = Unit.extend({
		init: function(){
			this._super();
			
			// forces
			this.forces = {};
			
			// velocity, acceleration
			this.velocity = new THREE.Vector3();
			this.acceleration = new THREE.Vector3();
			
			return this;
		},
		
		// force operation
		resetForce: function(key, force){	// force: Vector3 or Number(indirectional fraction)
			return this.remove(key).addForce(key, force);
		},
		addForce: function(key, force){
			this.forces[key] = force;
			return this;
		},
		removeForce: function(key){
			delete this.forces[key];
			return this;
		},
		getForce: function(key){
			return this.forces[key];
		},
		
		act: function(test){
			this.updateAcceleration()
				.updateVelocity();
			
			if (test) {
				test();
			}
			return this.doMove();
		},
		doMove: function(){
			return this.move(this.velocity);
		},
		
		// updating of velocity, acceleration
		updateVelocity: function(){
			var vel = this.velocity.clone().add(this.acceleration);
			this.velocity.copy(vel);
			return this;
		},
		updateAcceleration: function(){
			var accel = new THREE.Vector3();
			for (var key in this.forces) {
				var force = this.forces[key];
				accel.add(
					force.clone().divideScalar(this.mass)	// clone
				);
			}
			this.acceleration.copy(accel);
			return this;
		},
		
		// shortcut for move and translate
		translate: function(vec){
			return this.translateX(vec.x)
				.translateY(vec.y)
				.translateZ(vec.z);
		},
		move: function(vec){
			this.position.add(vec);
			return this;
		},
		
		onHit: function(face){	// bound
			this.velocity.sub(
				this.velocity.clone()
					.projectOnVector(face.normal)
					.multiplyScalar(1 + this.elasticity)
			);
		}
	}, {
		type: 'movable_unit'
	});
})();
