/**
 * Sorting Algorithms Implementation
 * Each algorithm returns an array of steps for visualization
 */

const algorithms = {
    // Bubble Sort - O(n²) time, O(1) space
    bubble: function(array) {
        const steps = [];
        const arr = [...array];
        const n = arr.length;
        
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Add comparison step
                steps.push({
                    type: 'comparison',
                    indices: [j, j + 1],
                    description: `Comparing ${arr[j]} and ${arr[j + 1]}`
                });
                
                if (arr[j] > arr[j + 1]) {
                    // Add swap step
                    steps.push({
                        type: 'swap',
                        indices: [j, j + 1],
                        description: `Swapping ${arr[j]} and ${arr[j + 1]}`
                    });
                    
                    // Perform the swap
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
            
            // Mark the last element as sorted
            steps.push({
                type: 'sorted',
                indices: [n - i - 1],
                description: `Element ${arr[n - i - 1]} is now in its sorted position`
            });
        }
        
        // Mark all elements as sorted at the end
        steps.push({
            type: 'allSorted',
            description: 'Array is now sorted'
        });
        
        return {
            steps,
            sortedArray: arr,
            timeComplexity: 'O(n²)',
            spaceComplexity: 'O(1)',
            description: 'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.'
        };
    },
    
    // Selection Sort - O(n²) time, O(1) space
    selection: function(array) {
        const steps = [];
        const arr = [...array];
        const n = arr.length;
        
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            
            // Mark current position
            steps.push({
                type: 'pivot',
                indices: [i],
                description: `Finding minimum element to place at position ${i}`
            });
            
            for (let j = i + 1; j < n; j++) {
                // Add comparison step
                steps.push({
                    type: 'comparison',
                    indices: [minIndex, j],
                    description: `Comparing ${arr[minIndex]} and ${arr[j]}`
                });
                
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            
            if (minIndex !== i) {
                // Add swap step
                steps.push({
                    type: 'swap',
                    indices: [i, minIndex],
                    description: `Swapping ${arr[i]} and ${arr[minIndex]}`
                });
                
                // Perform the swap
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            }
            
            // Mark the element as sorted
            steps.push({
                type: 'sorted',
                indices: [i],
                description: `Element ${arr[i]} is now in its sorted position`
            });
        }
        
        // Mark the last element as sorted
        steps.push({
            type: 'sorted',
            indices: [n - 1],
            description: `Element ${arr[n - 1]} is now in its sorted position`
        });
        
        // Mark all elements as sorted at the end
        steps.push({
            type: 'allSorted',
            description: 'Array is now sorted'
        });
        
        return {
            steps,
            sortedArray: arr,
            timeComplexity: 'O(n²)',
            spaceComplexity: 'O(1)',
            description: 'Selection Sort divides the array into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region and moves it to the sorted region.'
        };
    },
    
    // Insertion Sort - O(n²) time, O(1) space
    insertion: function(array) {
        const steps = [];
        const arr = [...array];
        const n = arr.length;
        
        // Mark first element as sorted
        steps.push({
            type: 'sorted',
            indices: [0],
            description: `Starting with first element ${arr[0]} as sorted`
        });
        
        for (let i = 1; i < n; i++) {
            const key = arr[i];
            let j = i - 1;
            
            // Mark current element being inserted
            steps.push({
                type: 'pivot',
                indices: [i],
                description: `Inserting element ${key} into the sorted portion`
            });
            
            while (j >= 0 && arr[j] > key) {
                // Add comparison step
                steps.push({
                    type: 'comparison',
                    indices: [j, j + 1],
                    description: `Comparing ${arr[j]} and ${key}`
                });
                
                // Add shift step (special case of swap)
                steps.push({
                    type: 'swap',
                    indices: [j, j + 1],
                    description: `Shifting ${arr[j]} to the right`
                });
                
                arr[j + 1] = arr[j];
                j--;
            }
            
            arr[j + 1] = key;
            
            // Mark sorted portion
            const sortedIndices = Array.from({length: i + 1}, (_, idx) => idx);
            steps.push({
                type: 'sorted',
                indices: sortedIndices,
                description: `Elements up to index ${i} are now sorted`
            });
        }
        
        // Mark all elements as sorted at the end
        steps.push({
            type: 'allSorted',
            description: 'Array is now sorted'
        });
        
        return {
            steps,
            sortedArray: arr,
            timeComplexity: 'O(n²)',
            spaceComplexity: 'O(1)',
            description: 'Insertion Sort builds the sorted array one item at a time by repeatedly taking the next element and inserting it into its correct position in the sorted portion.'
        };
    },
    
    // Merge Sort - O(n log n) time, O(n) space
    merge: function(array) {
        const steps = [];
        const arr = [...array];
        
        function merge(left, right, startIdx) {
            const result = [];
            let i = 0, j = 0;
            
            while (i < left.length && j < right.length) {
                // Add comparison step
                steps.push({
                    type: 'comparison',
                    indices: [startIdx + i, startIdx + left.length + j],
                    description: `Comparing ${left[i]} and ${right[j]}`
                });
                
                if (left[i] <= right[j]) {
                    result.push(left[i]);
                    i++;
                } else {
                    result.push(right[j]);
                    j++;
                }
            }
            
            // Add remaining elements
            while (i < left.length) {
                result.push(left[i]);
                i++;
            }
            
            while (j < right.length) {
                result.push(right[j]);
                j++;
            }
            
            // Visualize the merged array
            for (let k = 0; k < result.length; k++) {
                arr[startIdx + k] = result[k];
                steps.push({
                    type: 'overwrite',
                    indices: [startIdx + k],
                    values: [result[k]],
                    description: `Placing ${result[k]} at position ${startIdx + k}`
                });
            }
            
            return result;
        }
        
        function mergeSort(array, startIdx = 0) {
            if (array.length <= 1) return array;
            
            const mid = Math.floor(array.length / 2);
            
            // Visualize the split
            steps.push({
                type: 'split',
                indices: Array.from({length: array.length}, (_, i) => startIdx + i),
                midIndex: startIdx + mid,
                description: `Splitting array at index ${startIdx + mid}`
            });
            
            const left = mergeSort(array.slice(0, mid), startIdx);
            const right = mergeSort(array.slice(mid), startIdx + mid);
            
            return merge(left, right, startIdx);
        }
        
        mergeSort(arr);
        
        // Mark all elements as sorted at the end
        steps.push({
            type: 'allSorted',
            description: 'Array is now sorted'
        });
        
        return {
            steps,
            sortedArray: arr,
            timeComplexity: 'O(n log n)',
            spaceComplexity: 'O(n)',
            description: 'Merge Sort divides the array into halves, sorts each half, and then merges the sorted halves back together. It follows the divide-and-conquer paradigm.'
        };
    },
    
    // Quick Sort - O(n log n) average time, O(n²) worst case, O(log n) space
    quick: function(array) {
        const steps = [];
        const arr = [...array];
        
        function partition(low, high) {
            const pivot = arr[high];
            
            // Mark pivot element
            steps.push({
                type: 'pivot',
                indices: [high],
                description: `Choosing pivot element ${pivot}`
            });
            
            let i = low - 1;
            
            for (let j = low; j < high; j++) {
                // Add comparison step
                steps.push({
                    type: 'comparison',
                    indices: [j, high],
                    description: `Comparing ${arr[j]} with pivot ${pivot}`
                });
                
                if (arr[j] <= pivot) {
                    i++;
                    
                    if (i !== j) {
                        // Add swap step
                        steps.push({
                            type: 'swap',
                            indices: [i, j],
                            description: `Swapping ${arr[i]} and ${arr[j]}`
                        });
                        
                        // Perform the swap
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                    }
                }
            }
            
            if (i + 1 !== high) {
                // Add swap step for pivot
                steps.push({
                    type: 'swap',
                    indices: [i + 1, high],
                    description: `Swapping ${arr[i + 1]} and ${arr[high]} (pivot)`
                });
                
                // Perform the swap
                [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            }
            
            // Mark pivot in its final position
            steps.push({
                type: 'sorted',
                indices: [i + 1],
                description: `Pivot ${pivot} is now in its sorted position`
            });
            
            return i + 1;
        }
        
        function quickSort(low, high) {
            if (low < high) {
                const pivotIndex = partition(low, high);
                
                quickSort(low, pivotIndex - 1);
                quickSort(pivotIndex + 1, high);
            } else if (low === high) {
                // Single element is already sorted
                steps.push({
                    type: 'sorted',
                    indices: [low],
                    description: `Element ${arr[low]} is in its sorted position`
                });
            }
        }
        
        quickSort(0, arr.length - 1);
        
        // Mark all elements as sorted at the end
        steps.push({
            type: 'allSorted',
            description: 'Array is now sorted'
        });
        
        return {
            steps,
            sortedArray: arr,
            timeComplexity: 'O(n log n)',
            spaceComplexity: 'O(log n)',
            description: 'Quick Sort selects a pivot element and partitions the array around it, then recursively sorts the sub-arrays. It follows the divide-and-conquer paradigm.'
        };
    },
    
    // Heap Sort - O(n log n) time, O(1) space
    heap: function(array) {
        const steps = [];
        const arr = [...array];
        const n = arr.length;
        
        function heapify(size, rootIndex) {
            let largest = rootIndex;
            const left = 2 * rootIndex + 1;
            const right = 2 * rootIndex + 2;
            
            // Compare with left child
            if (left < size) {
                steps.push({
                    type: 'comparison',
                    indices: [largest, left],
                    description: `Comparing ${arr[largest]} with left child ${arr[left]}`
                });
                
                if (arr[left] > arr[largest]) {
                    largest = left;
                }
            }
            
            // Compare with right child
            if (right < size) {
                steps.push({
                    type: 'comparison',
                    indices: [largest, right],
                    description: `Comparing ${arr[largest]} with right child ${arr[right]}`
                });
                
                if (arr[right] > arr[largest]) {
                    largest = right;
                }
            }
            
            // If largest is not root
            if (largest !== rootIndex) {
                // Add swap step
                steps.push({
                    type: 'swap',
                    indices: [rootIndex, largest],
                    description: `Swapping ${arr[rootIndex]} and ${arr[largest]}`
                });
                
                // Perform the swap
                [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
                
                // Recursively heapify the affected sub-tree
                heapify(size, largest);
            }
        }
        
        // Build max heap
        steps.push({
            type: 'info',
            description: 'Building max heap'
        });
        
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(n, i);
        }
        
        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            // Move current root to end
            steps.push({
                type: 'swap',
                indices: [0, i],
                description: `Moving largest element ${arr[0]} to the end`
            });
            
            // Perform the swap
            [arr[0], arr[i]] = [arr[i], arr[0]];
            
            // Mark the element as sorted
            steps.push({
                type: 'sorted',
                indices: [i],
                description: `Element ${arr[i]} is now in its sorted position`
            });
            
            // Call heapify on the reduced heap
            heapify(i, 0);
        }
        
        // Mark the first element as sorted
        steps.push({
            type: 'sorted',
            indices: [0],
            description: `Element ${arr[0]} is now in its sorted position`
        });
        
        // Mark all elements as sorted at the end
        steps.push({
            type: 'allSorted',
            description: 'Array is now sorted'
        });
        
        return {
            steps,
            sortedArray: arr,
            timeComplexity: 'O(n log n)',
            spaceComplexity: 'O(1)',
            description: 'Heap Sort builds a max heap from the array and then repeatedly extracts the maximum element from the heap and places it at the end of the array.'
        };
    }
};

// Algorithm metadata for UI display
const algorithmInfo = {
    bubble: {
        name: 'Bubble Sort',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        description: 'A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.'
    },
    selection: {
        name: 'Selection Sort',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        description: 'An in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist, then repeatedly selects the smallest element from the unsorted sublist.'
    },
    insertion: {
        name: 'Insertion Sort',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        description: 'A simple sorting algorithm that builds the final sorted array one item at a time, efficient for small data sets or nearly sorted data.'
    },
    merge: {
        name: 'Merge Sort',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        description: 'An efficient, stable, comparison-based, divide and conquer algorithm that divides the array, sorts the halves, and then merges them.'
    },
    quick: {
        name: 'Quick Sort',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(log n)',
        description: 'An efficient, in-place sorting algorithm that uses divide and conquer strategy by selecting a pivot element and partitioning the array around it.'
    },
    heap: {
        name: 'Heap Sort',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)',
        description: 'A comparison-based sorting algorithm that uses a binary heap data structure to build a max-heap and then repeatedly extracts the maximum.'
    }
};

// Export the algorithms and metadata
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { algorithms, algorithmInfo };
}