/**
 * Utility functions for the Sorting Visualizer
 * Contains helper methods used across the application
 */

const utils = {
    /**
     * Generate a random integer between min and max (inclusive)
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random integer
     */
    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    /**
     * Generate a random array of integers
     * @param {number} size - Size of the array
     * @param {number} min - Minimum value (default: 1)
     * @param {number} max - Maximum value (default: 100)
     * @returns {Array} Random array
     */
    generateRandomArray: function(size, min = 1, max = 100) {
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(this.randomInt(min, max));
        }
        return array;
    },
    
    /**
     * Generate a nearly sorted array (good for testing insertion sort)
     * @param {number} size - Size of the array
     * @param {number} swapProbability - Probability of swapping elements (0-1)
     * @returns {Array} Nearly sorted array
     */
    generateNearlySortedArray: function(size, swapProbability = 0.1) {
        // Create a sorted array
        const array = Array.from({length: size}, (_, i) => i + 1);
        
        // Perform random swaps
        const swapCount = Math.floor(size * swapProbability);
        for (let i = 0; i < swapCount; i++) {
            const idx1 = this.randomInt(0, size - 1);
            const idx2 = this.randomInt(0, size - 1);
            [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
        }
        
        return array;
    },
    
    /**
     * Generate a reversed array (worst case for many algorithms)
     * @param {number} size - Size of the array
     * @returns {Array} Reversed array
     */
    generateReversedArray: function(size) {
        return Array.from({length: size}, (_, i) => size - i);
    },
    
    /**
     * Generate an array with few unique values (good for testing counting sort)
     * @param {number} size - Size of the array
     * @param {number} uniqueCount - Number of unique values
     * @returns {Array} Array with few unique values
     */
    generateFewUniqueArray: function(size, uniqueCount = 5) {
        const uniqueValues = this.generateRandomArray(uniqueCount, 1, 100);
        const array = [];
        
        for (let i = 0; i < size; i++) {
            const randomIndex = this.randomInt(0, uniqueCount - 1);
            array.push(uniqueValues[randomIndex]);
        }
        
        return array;
    },
    
    /**
     * Delay execution using Promises
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise} Promise that resolves after the delay
     */
    delay: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    /**
     * Check if an array is sorted
     * @param {Array} array - Array to check
     * @returns {boolean} True if sorted, false otherwise
     */
    isSorted: function(array) {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) return false;
        }
        return true;
    },
    
    /**
     * Deep clone an array
     * @param {Array} array - Array to clone
     * @returns {Array} Cloned array
     */
    cloneArray: function(array) {
        return JSON.parse(JSON.stringify(array));
    },
    
    /**
     * Format time complexity for display
     * @param {string} complexity - Complexity notation (e.g., "O(n^2)")
     * @returns {string} Formatted complexity
     */
    formatComplexity: function(complexity) {
        return complexity
            .replace(/n/g, 'n')
            .replace(/\^2/g, '²')
            .replace(/\^3/g, '³')
            .replace(/log/g, 'log');
    },
    
    /**
     * Calculate the delay time based on animation speed
     * @param {number} speed - Animation speed (1-10)
     * @returns {number} Delay in milliseconds
     */
    calculateDelay: function(speed) {
        // Convert speed (1-10) to delay (1000ms - 50ms)
        return 1050 - (speed * 100);
    },
    
    /**
     * Get a color based on a value and a color scheme
     * @param {number} value - Value to map to a color
     * @param {number} min - Minimum value in the range
     * @param {number} max - Maximum value in the range
     * @param {string} scheme - Color scheme name
     * @returns {string} CSS color value
     */
    getColorForValue: function(value, min, max, scheme = 'default') {
        // Normalize value to 0-1 range
        const normalized = (value - min) / (max - min);
        
        // Color schemes
        const schemes = {
            default: {
                start: [67, 97, 238],  // #4361ee
                end: [114, 9, 183]     // #7209b7
            },
            rainbow: {
                start: [255, 0, 0],    // Red
                mid: [0, 255, 0],      // Green
                end: [0, 0, 255]       // Blue
            },
            heat: {
                start: [255, 255, 0],  // Yellow
                end: [255, 0, 0]       // Red
            },
            cool: {
                start: [0, 255, 255],  // Cyan
                end: [0, 0, 255]       // Blue
            }
        };
        
        // Get the selected scheme
        const colorScheme = schemes[scheme] || schemes.default;
        
        // Interpolate colors
        let r, g, b;
        
        if (colorScheme.mid) {
            // Three-color interpolation
            if (normalized < 0.5) {
                // Interpolate between start and mid
                const factor = normalized * 2;
                r = Math.round(colorScheme.start[0] + factor * (colorScheme.mid[0] - colorScheme.start[0]));
                g = Math.round(colorScheme.start[1] + factor * (colorScheme.mid[1] - colorScheme.start[1]));
                b = Math.round(colorScheme.start[2] + factor * (colorScheme.mid[2] - colorScheme.start[2]));
            } else {
                // Interpolate between mid and end
                const factor = (normalized - 0.5) * 2;
                r = Math.round(colorScheme.mid[0] + factor * (colorScheme.end[0] - colorScheme.mid[0]));
                g = Math.round(colorScheme.mid[1] + factor * (colorScheme.end[1] - colorScheme.mid[1]));
                b = Math.round(colorScheme.mid[2] + factor * (colorScheme.end[2] - colorScheme.mid[2]));
            }
        } else {
            // Two-color interpolation
            r = Math.round(colorScheme.start[0] + normalized * (colorScheme.end[0] - colorScheme.start[0]));
            g = Math.round(colorScheme.start[1] + normalized * (colorScheme.end[1] - colorScheme.start[1]));
            b = Math.round(colorScheme.start[2] + normalized * (colorScheme.end[2] - colorScheme.start[2]));
        }
        
        return `rgb(${r}, ${g}, ${b})`;
    },
    
    /**
     * Apply a smooth animation to an element
     * @param {HTMLElement} element - Element to animate
     * @param {Object} properties - CSS properties to animate
     * @param {number} duration - Animation duration in milliseconds
     * @returns {Promise} Promise that resolves when animation completes
     */
    animateElement: function(element, properties, duration = 300) {
        return new Promise(resolve => {
            // Store original values
            const originalValues = {};
            for (const prop in properties) {
                originalValues[prop] = window.getComputedStyle(element)[prop];
            }
            
            // Apply animation
            element.style.transition = `all ${duration}ms ease-in-out`;
            
            // Set new values
            for (const prop in properties) {
                element.style[prop] = properties[prop];
            }
            
            // Resolve when animation completes
            setTimeout(() => {
                element.style.transition = '';
                resolve();
            }, duration);
        });
    },
    
    /**
     * Format a number with commas as thousands separators
     * @param {number} num - Number to format
     * @returns {string} Formatted number
     */
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    /**
     * Debounce a function to limit how often it can be called
     * @param {Function} func - Function to debounce
     * @param {number} wait - Milliseconds to wait
     * @returns {Function} Debounced function
     */
    debounce: function(func, wait = 100) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
};

// Export the utils object if in a module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = utils;
}