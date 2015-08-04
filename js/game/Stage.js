
(function(){
	'use strict';
	
	window.Stage = Class.extend({
		init: function(){
			// camera
			this.camera = new THREE.PerspectiveCamera(50,
				window.innerWidth / window.innerHeight, 1, 200000);
			// scene
			this.scene = new THREE.Scene();
			// renderer
			try {	// support WebGL
				this.renderer = new THREE.WebGLRenderer({ antialias: true });
			} catch (err) {	// not support
				this.renderer = new THREE.CanvasRenderer();
			} finally {
				this.renderer.setClearColor(this._class.color);
			}
			// $screen
			this.$screen = $('#screen');
			this.$screen.empty().append(this.renderer.domElement);
			
			// loop
			this.running = false;
			this.loop = null;
			
			// window resize
			var _this = this;
			$(window).on('resize', function(){
				_this.onWindowResize();
			}).trigger('resize');
			
			return this.act();
		},
		
		act: function(){
			var _this = this;
			requestAnimationFrame(function(){
				_this.act();
			});
			
			if (this.running && this.loop) {
				this.loop();
			}
			this.renderer.render(this.scene, this.camera);
			
			return this;
		},
		start: function(){
			this.running = true;
			return this;
		},
		stop: function(){
			this.running = false;
			return this;
		},
		
		onWindowResize: function(){
			var w = window.innerWidth, h = window.innerHeight;
			
			this.windowRatio = w / h;
			this.camera.aspect = this.windowRatio;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(w, h);
		}
	}, {
		color: 0x000000
	});
})();
