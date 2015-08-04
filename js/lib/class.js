
/** Simple JavaScript Inheritance
 *  John Resig http://ejohn.org/
 * MIT Licensed.
 * Inspired by base2 and Prototype
 */
// modified by h5-Lium

(function(){
	'use strict';
	
	var _initializing = false;
	var _Class = function(){};
	_Class._ = {};
	_Class.extend = function(prop, statics) {
		function Class() {
			if (! _initializing && this.init)
				this.init.apply(this, arguments);
		}
		Class.constructor = Class;
		Class.extend = _Class.extend;
		var _super = this.prototype;
		_initializing = true;
		var prototype = new this();
		_initializing = false;
		
		for (var k in prop) {
			prototype[k] = typeof prop[k] === 'function'
				&& typeof _super[k] === 'function'?
				(function(k, fn){
					return function(){
						var tmp = this._super;
						this._super = _super[k] || function(){};
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				})(k, prop[k]): prop[k];
		}
		
		Class._ = {};
		for (var k in this._) {
			Class[k] = Class._[k] = this._[k];
		}
		for (var k in statics) {
			Class[k] = Class._[k] = statics[k];
		}
		prototype._class = Class;
		
		Class.prototype = prototype;
		return Class;
	};
	
	// Export the THREE object for **Node.js**
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = _Class;
	} else {
		window.Class = _Class;
	}
})();
