import { breakpoints as defaultBreakpoints } from '@groundworx/foundation-dev';
import { applyFilters } from '@wordpress/hooks';

// Apply the WordPress filter to allow overrides
let breakpoints = applyFilters(
	'groundworx.breakpoints',
	{ ...defaultBreakpoints }
);

const GetBreakpoints = {
	/**
	 * Get all breakpoints, optionally adjusted for a container width.
	 * @param {HTMLElement|null} el
	 * @returns {Object}
	 */
	all(adjustment = 0) {
		const adjusted = {};
	
		for (const key in breakpoints) {
			const originalValue = breakpoints[key];
			const numeric = this._resolveRaw(key);
	
			if (numeric !== null) {
				let newValue = numeric;
	
				if (adjustment) {
					newValue += adjustment;
					newValue = Math.max(newValue, 0);
					newValue = Math.floor(newValue); // or Math.ceil() depending
				}
	
				adjusted[key] = `${newValue}px`;
			} else {
				adjusted[key] = originalValue;
			}
		}
	
		return adjusted;
	},

	/**
	 * Get a specific breakpoint value by key, optionally adjusted.
	 * @param {string} key
	 * @param {HTMLElement|null} el
	 * @returns {string|null}
	 */
	get(key, adjustment = 0) {
		const allBreakpoints = this.all(adjustment);
		return allBreakpoints[key] || null;
	},

	/**
	 * Resolve a numeric pixel value from a breakpoint key or numeric string, optionally adjusted.
	 * @param {string|number} key
	 * @param {HTMLElement|null} el
	 * @returns {number|null}
	 */
	resolve(key, adjustment = 0) {
		if (!key) return null;

		// Already numeric
		if (!isNaN(parseInt(key))) {
			return parseInt(key);
		}

		const val = this.get(key, adjustment);
		if (val) {
			const match = val.match(/^\d+/);
			return match ? parseInt(match[0]) : null;
		}

		return null;
	},

	/**
	 * Get the current active breakpoint based on width (window or container).
	 * @param {HTMLElement|null} el
	 * @returns {number|null}
	 */
	current(adjustment = 0) {
		const width = el ? this.getContainerWidth(el) : this.getWindowWidth();
		let currentBreakpoint = null;

		for (const key of Object.keys(this.all(adjustment)).map(Number).sort((a, b) => a - b)) {
			if (width >= key) {
				currentBreakpoint = key;
			}
		}

		return currentBreakpoint;
	},

	/**
	 * Get window width.
	 * @returns {number}
	 */
	getWindowWidth() {
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	},

	/**
	 * Get container width from an element.
	 * @param {HTMLElement} el
	 * @returns {number}
	 */
	getContainerWidth(el) {
		if (!el) {
			return 0;
		}
		return el.getBoundingClientRect().width;
	},

	/**
	 * Internal raw resolver (no adjustment).
	 * @private
	 */
	_resolveRaw(key) {
		if (!key) return null;

		if (!isNaN(parseInt(key))) {
			return parseInt(key);
		}

		const val = breakpoints[key];
		if (val) {
			const match = val.match(/^\d+/);
			return match ? parseInt(match[0]) : null;
		}

		return null;
	},
};

export default GetBreakpoints;
