/*==========================================================================

@package	IndiLoad
@author 	Evgeny Somkin <esomkin@gmail.com>
@license: 	MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

========================================================================= */

(function (root, factory) {

	'use strict';

	if (typeof module === 'object' 
		&& module.exports) {

		module.exports = factory();

	} else if (typeof define === 'function' 
		&& define.amd) {

		define([], factory);

	} else {

		root.IndiLoad = factory(root);
  }

} (this, function (root) {

	'use strict';

	function IndiLoad (selector) {

		if (!(this instanceof IndiLoad)) {

			return new IndiLoad(selector);
        }

       	init.call(this, selector);

		return this;
	}

	var proto = IndiLoad.prototype;

	var indi = null;

	var settings = {

		namespace: 'indi',
		classes: {

			load: 'load',
			show: 'show',
		}
	};

	function className (name) {

		return settings.namespace + '-' + settings.classes[name];
	}

	function init (selector) {

		if (indi) return;

		selector = selector || className('load');

		indi = document.querySelector('.' + selector);

		if (!indi) {

			throw new Error('It seem`s selector `' + selector + '` does not present in DOM');
		}
	}

	function show () {

		indi.classList.add(className('show'));
		
		return this;
	}

	function hide () {

		indi.classList.remove(className('show'));

		return this;
	}

	var version = '0.1.0';

	proto.version 	= version;
	proto.show 		= show;
	proto.hide 		= hide;

	return IndiLoad;	
}));