
(function(){
	'use strict';
	
	window.Client = Class.extend({
		init: function(){
			// stage
			this.stage = new Stage();
			// controls
			this.controls = new Controls(this).start();
			
			// ground, goal, ball, tracker
			this.ground = null;
			this.goal = null;
			this.ball = null;
			this.tracker = null;
			
			// toTest
			this.toTest = false;
			
			return this;
		},
		
		onDrag: function(dir, speed){
			this.controls.stop();
			
			speed = (function(x){	// projection
				var k = 2
				return x > k? k: -Math.pow(x - k, 2) / k + k;
			})(speed);
			var f = 25;
			var vx = dir.x * speed * f,
				vy = Math.abs(speed > 1.7? dir.y * speed * f: 0),
				vz = dir.y * speed * f;
			
			var ball = this.ball,
				goal = this.goal,
				ground = this.ground;
			var tracker = this.tracker;
			var _this = this;
			this.stage.loop = function(){
				ball.act(_this.toTest? function(){
					_this.ballTest(ball, ground, goal);
				}: null);
				tracker.act(ball);
			}
			
			ball.velocity.set(vx, vy, vz);
			return this.start();
		},
		
		ballTest: function(ball, ground, goal){
			var vel = ball.velocity;
			if (Math.abs(vel.z) < 1) {	// get static
				this.onDrain();
			}
			
			var pos1 = ball.position,
				pos2 = goal.position,
				pos3 = ground.position;
			var r1 = ball.radius,
				r2 = goal.radius;
			var w = ground.width,
				d = ground.depth;
			if (pos1.y >= r1
			&& pos1.y + vel.y < r1) {	// about to cross the horizon
				if (pos1.distanceTo(pos2) < r2 - r1) {	// inside the hole
					this.onScore();
				} else if (Math.abs(pos1.x - pos3.x) < w / 2
				&& Math.abs(pos1.z - pos3.z) < d / 2) {	// inside the ground
					var vel = ball.velocity;
					var comp1 = vel.clone().projectOnVector(ground.plane.normal),
						comp2 = vel.clone().sub(comp1);
					var fric = comp2.clone().negate().normalize().multiplyScalar(ground.friction);
					
					if (fric.length() < comp2.length()) {
						comp2.add(fric);
					} else {
						comp2.set(0, 0, 0);
					}
					
					vel.addVectors(comp1, comp2);
					ball.onHit(ground.plane);
				} else {	// outside
					var dx = Math.abs(pos1.x - pos3.x) - w / 2,
						dz = Math.abs(pos1.z - pos3.z) - d / 2;
					
					var a = 5;
					if (dx > 0 && dx < r1) {
						ball.velocity.add(new THREE.Vector3(pos1.x > pos3.x? a: -a, 0, 0));
					}
					if (dz > 0 && dz < r1) {
						ball.velocity.add(new THREE.Vector3(0, 0, pos1.z > pos3.z? a: -a));
					}
					
					this.onDropOut();
				}
			}
		},
		
		onScore: function(){
			this.stop();
			
			var _this = this;
			setTimeout(function(){
				alert('Score!');
				
				location.reload();
			}, 2000);
		},
		onDrain: function(){
			//this.toTest = false;
			//this.stage.stop();
			this.stop();
			
			var tracker = this.tracker,
				ball = this.ball,
				goal = this.goal;
			var controls = this.controls;
			
			setTimeout(function(){
				//alert('Time out!');
				//location.reload();
				
				tracker.set(ball, goal);
				controls.start();
			}, 2000);
		},
		onDropOut: function(){
			var _this = this;
			setTimeout(function(){
				_this.stop();
				
				setTimeout(function(){
					alert('Drop out!');
					
					location.reload();
				}, 2000);
			}, 1500);
			
			console.log('drop out!');
		},
		
		setItems: function(ground, goal, ball, tracker){
			this.ground = ground;
			this.goal = goal;
			this.ball = ball;
			this.tracker = tracker;
			
			tracker.lookAt(new THREE.Vector3(0, 0, goal.position.z / 2));
			
			return this;
		},
		
		start: function(){
			this.toTest = true;
			this.stage.start();
			//this.controls.start();
			
			return this;
		},
		stop: function(){
			//this.controls.stop();
			this.stage.stop();
			this.toTest = false;
			
			this.ball.velocity.set(0, 0, 0);
			
			return this;
		}
	}, {
		mobi: (function(){
			var u = navigator.userAgent;
			var ios = u.indexOf('iPhone') > -1 || u.indexOf('iad') > -1,
				android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
			return ios || android;
		})()
	});
})();
