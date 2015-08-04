
(function(){
	'use strict';
	
	window.Unit = Class.extend.call(THREE.Mesh, {
		init: function(){
			// ensure Unit extends Mesh
			// geometry, material -- should be cloned
			THREE.Mesh.call(
				this,
				this._class.geometry?
					this._class.geometry.clone(): new THREE.Geometry(),
				this._class.material?
					this._class.material.clone(): new THREE.Material()
			);
			// mass, elasticity
			this.mass = this._class.mass;
			this.elasticity = this._class.elasticity;
			
			// unitId
			this.unitId = -1;
			
			return this;
		},
		
		setUnitId: function(id){
			this.unitId = id;
			return this;
		}
	}, {
		type: 'unit',
		
		mass: 1000,
		elasticity: 0.1,
		
		geometry: null,
		material: null
	});
})();
