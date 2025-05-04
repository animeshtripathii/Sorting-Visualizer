/**
 * Sorting Visualizer
 * Handles the visualization of sorting algorithms
 */

class Visualizer {
    constructor() {
        // DOM Elements
        this.arrayContainer = document.getElementById('array-container');
        this.algorithmSelect = document.getElementById('algorithm-select');
        this.sizeSlider = document.getElementById('size-slider');
        this.speedSlider = document.getElementById('speed-slider');
        this.sizeValue = document.getElementById('size-value');
        this.speedValue = document.getElementById('speed-value');
        this.generateBtn = document.getElementById('generate');
        this.startBtn = document.getElementById('start');
        this.nextBtn = document.getElementById('next');
        this.resetBtn = document.getElementById('reset');
        this.stepModeToggle = document.getElementById('step-mode');
        // In the constructor, after getting DOM elements
        this.showValuesToggle = document.getElementById('show-values');
        this.showValuesToggle.checked = true; // Add this line
        this.highContrastToggle = document.getElementById('high-contrast');
        this.timeComplexity = document.getElementById('time-complexity');
        this.spaceComplexity = document.getElementById('space-complexity');
        this.explanationText = document.getElementById('explanation-text');
        this.themeToggleBtn = document.getElementById('theme-toggle-btn');
        
        // Visualization properties
        this.array = [];
        this.arrayBars = [];
        this.arraySize = parseInt(this.sizeSlider.value);
        this.animationSpeed = parseInt(this.speedSlider.value);
        this.currentAlgorithm = this.algorithmSelect.value;
        this.isRunning = false;
        this.isPaused = false;
        this.isStepMode = false;
        this.showValues = true; // Change this from false to true
        this.highContrast = false;
        this.currentStep = 0;
        this.sortingSteps = [];
        this.sortedIndices = new Set();
        
        // Initialize the visualizer
        this.init();
    }
    
    // Initialize the visualizer
    init() {
        // Generate initial array
        this.generateArray();
        
        // Update algorithm info
        this.updateAlgorithmInfo();
        
        // Add event listeners
        this.addEventListeners();
    }
    
    // Add event listeners to controls
    addEventListeners() {
        // Algorithm selection
        this.algorithmSelect.addEventListener('change', () => {
            this.currentAlgorithm = this.algorithmSelect.value;
            this.updateAlgorithmInfo();
            this.reset();
        });
        
        // Array size slider
        this.sizeSlider.addEventListener('input', () => {
            this.arraySize = parseInt(this.sizeSlider.value);
            this.sizeValue.textContent = this.arraySize;
            this.generateArray();
        });
        
        // Animation speed slider
        this.speedSlider.addEventListener('input', () => {
            this.animationSpeed = parseInt(this.speedSlider.value);
            this.speedValue.textContent = this.animationSpeed;
        });
        
        // Generate new array button
        this.generateBtn.addEventListener('click', () => {
            this.generateArray();
        });
        
        // Start button
        this.startBtn.addEventListener('click', () => {
            if (this.isRunning) {
                if (this.isPaused) {
                    this.resume();
                } else {
                    this.pause();
                }
            } else {
                this.start();
            }
        });
        
        // Next step button
        this.nextBtn.addEventListener('click', () => {
            if (this.isStepMode && this.isRunning && this.isPaused) {
                this.nextStep();
            }
        });
        
        // Reset button
        this.resetBtn.addEventListener('click', () => {
            this.reset();
        });
        
        // Step mode toggle
        this.stepModeToggle.addEventListener('change', () => {
            this.isStepMode = this.stepModeToggle.checked;
            if (this.isStepMode && this.isRunning) {
                this.pause();
            }
        });
        
        // Show values toggle
        this.showValuesToggle.addEventListener('change', () => {
            this.showValues = this.showValuesToggle.checked;
            this.updateArrayDisplay();
        });
        
        // High contrast toggle
        this.highContrastToggle.addEventListener('change', () => {
            this.highContrast = this.highContrastToggle.checked;
            document.body.classList.toggle('high-contrast', this.highContrast);
        });
        
        // Theme toggle
        this.themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
        });
    }
    
    // Generate a random array
    // Add these methods to the Visualizer class
    
    // Update the generateArray method to handle different array types
    generateArray(type = 'random') {
        // Reset if sorting is in progress
        if (this.isRunning) {
            this.reset();
        }
        
        // Generate array based on type
        switch (type) {
            case 'nearlySorted':
                this.array = utils.generateNearlySortedArray(this.arraySize);
                break;
            case 'reversed':
                this.array = utils.generateReversedArray(this.arraySize);
                break;
            case 'fewUnique':
                this.array = utils.generateFewUniqueArray(this.arraySize);
                break;
            case 'random':
            default:
                this.array = utils.generateRandomArray(this.arraySize);
                break;
        }
        
        // Update the display
        this.updateArrayDisplay();
    }
    
    // Add a method to update the color scheme
    updateColorScheme(scheme = 'default') {
        this.colorScheme = scheme;
        this.updateArrayDisplay();
    }
    
    // Update the updateArrayDisplay method to use the color scheme
    updateArrayDisplay() {
        // Clear the container
        this.arrayContainer.innerHTML = '';
        this.arrayBars = [];
        
        // Find min and max values for color mapping
        const minValue = Math.min(...this.array);
        const maxValue = Math.max(...this.array);
        
        // Create array bars
        // Inside the updateArrayDisplay method
        for (let i = 0; i < this.array.length; i++) {
            const bar = document.createElement('div');
            bar.className = 'array-bar';
            
            // Show values if enabled
            if (this.showValues) {
                bar.textContent = this.array[i];
            }
            
            // Set bar styles
            bar.style.setProperty('--value', this.array[i]);
            
            // Apply color based on scheme
            const barColor = utils.getColorForValue(this.array[i], minValue, maxValue, this.colorScheme);
            bar.style.background = barColor;
            
            // Add to container and store reference
            this.arrayContainer.appendChild(bar);
            this.arrayBars.push(bar);
        }
    }
    
    // Update algorithm information
    updateAlgorithmInfo() {
        const info = algorithmInfo[this.currentAlgorithm];
        this.timeComplexity.textContent = info.timeComplexity;
        this.spaceComplexity.textContent = info.spaceComplexity;
        this.explanationText.textContent = info.description;
    }
    
    // Start the sorting visualization
    start() {
        if (this.isRunning) return;
        
        // Update UI state
        this.isRunning = true;
        this.isPaused = false;
        this.startBtn.textContent = 'Pause';
        this.resetBtn.disabled = false;
        this.generateBtn.disabled = true;
        this.algorithmSelect.disabled = true;
        this.sizeSlider.disabled = true;
        
        // Enable next button if in step mode
        this.nextBtn.disabled = !(this.isStepMode);
        
        // Get the sorting algorithm
        const algorithm = algorithms[this.currentAlgorithm];
        
        // Run the algorithm and get steps
        const result = algorithm(this.array);
        this.sortingSteps = result.steps;
        this.currentStep = 0;
        this.sortedIndices = new Set();
        
        // Start visualization
        if (this.isStepMode) {
            this.pause();
        } else {
            this.runAnimation();
        }
    }
    
    // Run the animation
    runAnimation() {
        if (this.currentStep >= this.sortingSteps.length) {
            this.finishSorting();
            return;
        }
        
        if (this.isPaused) return;
        
        // Get the current step
        const step = this.sortingSteps[this.currentStep];
        
        // Update explanation
        this.explanationText.textContent = step.description;
        
        // Process the step based on its type
        switch (step.type) {
            case 'comparison':
                this.visualizeComparison(step.indices);
                break;
                
            case 'swap':
                this.visualizeSwap(step.indices);
                break;
                
            case 'sorted':
                this.visualizeSorted(step.indices);
                break;
                
            case 'pivot':
                this.visualizePivot(step.indices);
                break;
                
            case 'overwrite':
                this.visualizeOverwrite(step.indices, step.values);
                break;
                
            case 'allSorted':
                this.visualizeAllSorted();
                break;
                
            case 'split':
                this.visualizeSplit(step.indices, step.midIndex);
                break;
                
            case 'info':
                // Just update the explanation
                break;
        }
        
        // Move to next step
        this.currentStep++;
        
        // Schedule next step
        const delay = 1100 - (this.animationSpeed * 100);
        setTimeout(() => this.runAnimation(), delay);
    }
    
    // Visualize comparison
    visualizeComparison(indices) {
        // Reset previous comparisons
        this.resetStepStyles();
        
        // Highlight compared elements
        indices.forEach(index => {
            if (!this.sortedIndices.has(index)) {
                this.arrayBars[index].classList.add('comparing');
            }
        });
    }
    
    // Visualize swap
    visualizeSwap(indices) {
        // Reset previous styles
        this.resetStepStyles();
        
        // Highlight swapped elements
        indices.forEach(index => {
            if (!this.sortedIndices.has(index)) {
                this.arrayBars[index].classList.add('swapping');
            }
        });
        
        // Update array and display
        const [i, j] = indices;
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        
        // Update bar values
        this.arrayBars[i].textContent = this.array[i];
        this.arrayBars[j].textContent = this.array[j];
        
        // Update bar styles
        this.arrayBars[i].style.setProperty('--value', this.array[i]);
        this.arrayBars[j].style.setProperty('--value', this.array[j]);
        
        // Set swap distance for animation
        const distance = (j - i) * (this.arrayBars[0].offsetWidth + 15); // Width + gap
        this.arrayBars[i].style.setProperty('--swap-distance', `${distance}px`);
        this.arrayBars[j].style.setProperty('--swap-distance', `${-distance}px`);
    }
    
    // Visualize sorted elements
    visualizeSorted(indices) {
        // Reset previous styles
        this.resetStepStyles();
        
        // Mark elements as sorted
        indices.forEach(index => {
            this.arrayBars[index].classList.add('sorted');
            this.sortedIndices.add(index);
        });
    }
    
    // Visualize pivot element
    visualizePivot(indices) {
        // Reset previous styles
        this.resetStepStyles();
        
        // Highlight pivot element
        indices.forEach(index => {
            if (!this.sortedIndices.has(index)) {
                this.arrayBars[index].classList.add('pivot');
            }
        });
    }
    
    // Visualize overwrite (for merge sort)
    visualizeOverwrite(indices, values) {
        // Reset previous styles
        this.resetStepStyles();
        
        // Update array and display
        indices.forEach((index, i) => {
            this.array[index] = values[i];
            
            // Update bar value
            if (this.showValues) {
                this.arrayBars[index].textContent = values[i];
            }
            
            // Update bar style
            this.arrayBars[index].style.setProperty('--value', values[i]);
            this.arrayBars[index].classList.add('comparing');
        });
    }
    
    // Visualize array split (for merge sort)
    visualizeSplit(indices, midIndex) {
        // Reset previous styles
        this.resetStepStyles();
        
        // Highlight split sections
        indices.forEach(index => {
            if (index < midIndex) {
                this.arrayBars[index].classList.add('left-split');
            } else {
                this.arrayBars[index].classList.add('right-split');
            }
        });
    }
    
    // Visualize all sorted
    visualizeAllSorted() {
        // Mark all elements as sorted
        for (let i = 0; i < this.arrayBars.length; i++) {
            this.arrayBars[i].classList.add('sorted');
            this.sortedIndices.add(i);
        }
    }
    
    // Reset step styles
    resetStepStyles() {
        for (let i = 0; i < this.arrayBars.length; i++) {
            if (!this.sortedIndices.has(i)) {
                this.arrayBars[i].classList.remove('comparing', 'swapping', 'pivot', 'left-split', 'right-split');
                this.arrayBars[i].style.removeProperty('--swap-distance');
            }
        }
    }
    
    // Pause the animation
    pause() {
        this.isPaused = true;
        this.startBtn.textContent = 'Resume';
        this.nextBtn.disabled = !(this.isStepMode);
    }
    
    // Resume the animation
    resume() {
        this.isPaused = false;
        this.startBtn.textContent = 'Pause';
        this.nextBtn.disabled = true;
        this.runAnimation();
    }
    
    // Execute next step in step mode
    nextStep() {
        if (this.currentStep >= this.sortingSteps.length) {
            this.finishSorting();
            return;
        }
        
        // Get the current step
        const step = this.sortingSteps[this.currentStep];
        
        // Update explanation
        this.explanationText.textContent = step.description;
        
        // Process the step based on its type
        switch (step.type) {
            case 'comparison':
                this.visualizeComparison(step.indices);
                break;
                
            case 'swap':
                this.visualizeSwap(step.indices);
                break;
                
            case 'sorted':
                this.visualizeSorted(step.indices);
                break;
                
            case 'pivot':
                this.visualizePivot(step.indices);
                break;
                
            case 'overwrite':
                this.visualizeOverwrite(step.indices, step.values);
                break;
                
            case 'allSorted':
                this.visualizeAllSorted();
                break;
                
            case 'split':
                this.visualizeSplit(step.indices, step.midIndex);
                break;
                
            case 'info':
                // Just update the explanation
                break;
        }
        
        // Move to next step
        this.currentStep++;
        
        // Check if finished
        if (this.currentStep >= this.sortingSteps.length) {
            this.finishSorting();
        }
    }
    
    // Reset the visualization
    reset() {
        // Stop animation
        this.isRunning = false;
        this.isPaused = false;
        
        // Reset UI
        this.startBtn.textContent = 'Start';
        this.resetBtn.disabled = true;
        this.nextBtn.disabled = true;
        this.generateBtn.disabled = false;
        this.algorithmSelect.disabled = false;
        this.sizeSlider.disabled = false;
        
        // Reset steps
        this.currentStep = 0;
        this.sortingSteps = [];
        this.sortedIndices = new Set();
        
        // Reset array display
        this.updateArrayDisplay();
        
        // Reset explanation
        this.explanationText.textContent = algorithmInfo[this.currentAlgorithm].description;
    }
    
    // Finish sorting
    finishSorting() {
        this.isRunning = false;
        this.isPaused = false;
        this.startBtn.textContent = 'Start';
        this.nextBtn.disabled = true;
        this.generateBtn.disabled = false;
        this.algorithmSelect.disabled = false;
        this.sizeSlider.disabled = false;
        
        // Mark all elements as sorted
        this.visualizeAllSorted();
        
        // Update explanation
        this.explanationText.textContent = 'Sorting completed!';
    }
}

// Initialize the visualizer when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the visualizer
    const visualizer = new Visualizer();
    
    // Make the visualizer instance globally accessible
    window.visualizerInstance = visualizer;
    
    // Initialize background effect if Vanta.js is available
    if (typeof VANTA !== 'undefined') {
        VANTA.BIRDS({
            el: "#background",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0xffffff,
            color1: 0x4361ee,
            color2: 0x7209b7,
            colorMode: "lerp",
            birdSize: 1.50,
            wingSpan: 30.00,
            speedLimit: 5.00,
            separation: 60.00,
            alignment: 20.00,
            cohesion: 20.00,
            quantity: 3.00
        });
    }
});