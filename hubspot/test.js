const axios = require('axios');
const userKey = "2047e604484b107b6af05700bdad";
const datasetURL = `https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=${userKey}`;
const resultURL = `https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=${userKey}`;

// Helper function to format timestamp into UTC date (YYYY-MM-DD)
function formatMilliseconds(milliseconds) {
    const date = new Date(milliseconds);
    return date.toISOString().slice(0, 10); // Return only the YYYY-MM-DD part
}

// Function to get max concurrent calls for each customer on a specific date
function getConcurrentCalls(calls) {
    const results = [];

    calls.forEach(call => {
        // Format the date to YYYY-MM-DD
        const date = formatMilliseconds(call.startTimestamp).slice(0, 10); // Only keep the date part
        const { customerId, callId, startTimestamp, endTimestamp } = call;

        // Find or create the entry for the customer and date in the results array
        let result = results.find(r => r.customerId === customerId && r.date === date);

        if (!result) {
            result = {
                customerId,
                date,
                maxConcurrentCalls: 0,
                callIds: [],
                timestamp: 0               
            };
            results.push(result);
        }

        // Check for overlaps
        const overlappingCalls = [];
        const currentDate = new Date(startTimestamp).toISOString().slice(0, 10); // Get current call date

        for (const currentCall of calls) {
            const currentCallDate = formatMilliseconds(currentCall.startTimestamp).slice(0, 10);
            if (
                currentCall.customerId === customerId &&
                currentCall.startTimestamp < endTimestamp && // Check if current call starts before the end of the current call
                currentCall.endTimestamp > startTimestamp &&// Check if current call ends after the start of the current call
                currentCallDate <= currentDate
            ) {
                overlappingCalls.push(currentCall.callId);
            }
        }

        // Update max concurrent calls if necessary
        if (overlappingCalls.length > result.maxConcurrentCalls) {
            result.maxConcurrentCalls = overlappingCalls.length;
            result.callIds = overlappingCalls;
            result.timestamp = startTimestamp;
        }
    });

    console.log(results)
    return {results};
}

// Main function
function main() {
    // Get request
    axios.get(datasetURL)
        .then(res => {
            console.log("GET Status:", res.status);

            // Getting result of concurrentCalls()
            const concurrentCalls = getConcurrentCalls(res.data.callRecords);

            axios.post(resultURL, concurrentCalls)
                .then(postRes => {
                    console.log("POST Status:", postRes.status);
                })
                .catch(err => {
                    console.error("POST Error:", err);
                });
        })
        .catch(err => {
            console.error("GET Error:", err);
        });
}

main();
