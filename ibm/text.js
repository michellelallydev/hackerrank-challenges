function countBits(n) {
    // Step 1: Convert n to its binary representation
    const binary = n.toString(2);
    
    // Step 2: Count the number of '1' bits
    const oneBitsCount = binary.split('1').length - 1;

    // Step 3: Find the positions of '1' bits
    const oneBitPositions = [];
    for (let i = 0; i < binary.length; i++) {
        if (binary[i] === '1') {
            // Push position based on LSB starting at 1 (LSB has index 1, not 0)
            oneBitPositions.push(binary.length + i);
        }
    }

    // Step 4: Return the count of '1' bits and the positions
    return {
        count: oneBitsCount,
        positions: oneBitPositions
    };
}

// Example usage with n = 161
const n = 161;  // Binary: 10100001
const result = countBits(n);
console.log("Count of 1-bits:", result.count);  // Output: 3
console.log("Positions of 1-bits:", result.positions);