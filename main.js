/**
 * Main JavaScript file for the Sorting Visualizer
 * Initializes the application and handles global functionality
 */

// Create a utility file for helper functions
const utils = {
    // Generate a random integer between min and max (inclusive)
    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // Delay function using Promises
    delay: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    // Check if the array is sorted
    isSorted: function(array) {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) return false;
        }
        return true;
    },
    
    // Deep clone an array
    cloneArray: function(array) {
        return JSON.parse(JSON.stringify(array));
    },
    
    // Format time complexity for display
    formatComplexity: function(complexity) {
        return complexity.replace(/n/g, 'n').replace(/\^2/g, '²').replace(/\^3/g, '³');
    }
};

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
    }
    
    // Listen for dark mode changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        document.body.classList.toggle('dark-theme', event.matches);
    });
    
    // Add additional array type options to the UI
    const arrayTypeSelect = document.getElementById('array-type');
    if (arrayTypeSelect) {
        arrayTypeSelect.addEventListener('change', () => {
            const visualizer = window.visualizerInstance;
            if (visualizer) {
                visualizer.generateArray(arrayTypeSelect.value);
            }
        });
    }
    
    // Add color scheme options to the UI
    const colorSchemeSelect = document.getElementById('color-scheme');
    if (colorSchemeSelect) {
        colorSchemeSelect.addEventListener('change', () => {
            const visualizer = window.visualizerInstance;
            if (visualizer) {
                visualizer.updateColorScheme(colorSchemeSelect.value);
            }
        });
    }
});

// Add a global function to handle algorithm selection changes
function handleAlgorithmChange(algorithmKey) {
    const info = algorithmInfo[algorithmKey];
    if (!info) return;
    
    // Update algorithm details in the UI
    const timeComplexity = document.getElementById('time-complexity');
    const spaceComplexity = document.getElementById('space-complexity');
    const explanationText = document.getElementById('explanation-text');
    
    if (timeComplexity) {
        timeComplexity.textContent = utils.formatComplexity(info.timeComplexity);
    }
    
    if (spaceComplexity) {
        spaceComplexity.textContent = utils.formatComplexity(info.spaceComplexity);
    }
    
    if (explanationText) {
        explanationText.textContent = info.description;
    }
}