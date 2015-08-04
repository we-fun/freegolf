
(function(){
	'use strict';
	
	window.Controls = Class.extend({
		init: function(client){
			this.client = client;
			
			// onDown, onUp
			this.onDown = this._class.onDown.bind(this);
			this.onUp = this._class.onUp.bind(this);
			
			// old
			this.old = null;
			
			return this;
		},
		
		start: function(){
			$(document).on('mousedown', this.onDown)
				.on('mouseup', this.onUp);
			
			return this;
		},
		stop: function(){
			$(document).off('mousedown', this.onDown)
				.off('mouseup', this.onUp);
			
			return this;
		}
	}, {
		onDown: function(ev){
			ev.preventDefault();
			
			this.old = {
				pos: new THREE.Vector2(ev.clientX, ev.clientY),
				date: new Date()
			}
		},
		onUp: function(ev){
			ev.preventDefault();
			if (! this.old) return;
			
			var diffPos = new THREE.Vector2(ev.clientX, ev.clientY).sub(this.old.pos),
				diffTime = new Date().getTime() - this.old.date.getTime();
			
			var dir = diffPos.clone().normalize(),
				speed = diffPos.length() / diffTime;
			
			this.client.onDrag(dir, speed);
			
			this.old = null;
		}
	});
})();
