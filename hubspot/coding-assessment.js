/* TODO
    > Get data X
    > Get list of calls
        - group calls by customerId
        - and date?
    > Get list of concurrent calls
        - check what calls a customer made on each day
        - check if any of the calls overlap
    > Post data
*/

const axios = require('axios');
const userKey = "2047e604484b107b6af05700bdad"
const datasetURL = `https://candidate.hubteam.com/candidateTest/v3/problem/test-dataset?userKey=${userKey}`;
const resultURL = `https://candidate.hubteam.com/candidateTest/v3/problem/test-result?userKey=${userKey}`;
// const moment = require('moment');

function formatMilliseconds(milliseconds) {
    const date = new Date(milliseconds);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

function getConcurrentCalls(calls) {
    const results = {};

    calls.forEach(call => {
        const date = formatMilliseconds(call.startTimestamp);
        const {customerId, callId, startTimestamp, endTimestamp} = call;
          
        // using a key for customer and date
          const key = `${customerId}_${date}`;
          if (!results[key]) {
              results[key] = {
                  customerId,
                  date,
                  maxConcurrentCalls: 0,
                  timestamp: 0,
                  callIds: []
              };
          }
  
          // Check for overlaps
          const overlappingCalls = [];
  
          for (const currentCall of calls) {
              if (
                  currentCall.customerId === customerId &&
                  currentCall.startTimestamp < endTimestamp && // Check if the start of the existing call is before the end of the current call
                  currentCall.endTimestamp > startTimestamp // Check if the end of the existing call is after the start of the current call
              ) {
                  overlappingCalls.push(currentCall.callId);
              }
          }
  
          // Update max concurrent calls if necessary
          if (overlappingCalls.length > results[key].results) {
              results[key].maxConcurrentCalls = overlappingCalls.length;
              results[key].timestamp = startTimestamp; // Or any timestamp from overlappingCalls, based on your requirements
              results[key].callIds = overlappingCalls;
          }
      });
      console.log(results)
      return results;
    }
/*
        for (let i = 0; i < calls.length; i++) {
            const currentCall = calls[i];
            const previousCall = calls[i - 1];

            if (i === 0) {
                // initialize a new session
            
            else {
                    if (currentCall.startTimestamp < previousCall.endTimestamp) {
                        // concurrent call
                        concurrentCallCount++;
                        concurrentCalls.push(currentCall[callId]);
                    }

                    let result = {
                        customerId: currentCall.customerId,
                        date: formatMilliseconds(currentCall.startTimestamp),
                        results: concurrentCallCount,
                        callIds: [
                            currentCall.callId,
                            previousCall.callId
                        ],
                        timestamp: currentCall.startTimestamp
                    };
                }

            }
        }*/


    function main() {
        // get request
        axios.get(datasetURL)
            .then(res => {
                // check status
                console.log("GET:", res.status);

                // check response data
                //console.log(res.data.callRecords);

                // getting result of getCalls() and assigning it
                // const customers = getCalls(res.data.callRecords);

                // getting result of concurrentCalls() and assigning it
                const concurrentCalls = getConcurrentCalls(res.data.callRecords)
                    // post request
                    axios.post(resultURL, { getConcurrentCalls })
                        .then((res) => {
                            console.log("POST:", res.status);
                        })
                        .catch((err) => {
                            console.log(err.message);
                        })
            })
            .catch(err => {
                console.error(err.message);
            });
    }

    main();