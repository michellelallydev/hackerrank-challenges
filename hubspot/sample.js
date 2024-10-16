const axios = require('axios');
const userKey = "bc7d8712b664eadc7f9698f9b4a7"
const datasetURL = `https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=${userKey}`;
const resultURL = `https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=${userKey}`;
const timeLimit = 600000

// group and sort the list of visitors
function getVisitors(events) {
    let visitors = {}

    // looping over events 
    for (let event of events) {
        let visitorId = event.visitorId;

        // checking if its the first event for each visitor
        if (!visitors[visitorId]) {
            // initialize an empty array if it is
            visitors[visitorId] = [];
        }

        // push event to visitors list
        visitors[visitorId].push(event);
    }

    // sorting each visitors sessions by their timestamp in ascending order
    for (let visitor in visitors) {
        visitors[visitor].sort((a, b) => a.timestamp - b.timestamp)
    }

    // checking grouping if visitors 
    //console.log(visitors)
    return visitors;
}


function getSessionsByUser(visitors) {
    const sessionsByUser = {};

    // Loop through each visitor
    for (let visitorId in visitors) {
        const events = visitors[visitorId];

        const sessions = [];
        let currentSession = null;

        // Loop through events to group them into sessions
        for (let i = 0; i < events.length; i++) {
            const event = events[i];

            // If it's the first event or more than 10 minutes since the last event
            if (i === 0 || event.timestamp - events[i - 1].timestamp > timeLimit) {
                // Start a new session
                if (currentSession) {
                    sessions.push(currentSession); // Save the previous session
                }

                // Initialize a new session
                currentSession = {
                    pages: [event.url],
                    startTime: event.timestamp,
                    duration: 0,
                };
            } else {
                // Continue the current session
                currentSession.pages.push(event.url);
            }

            // Update the duration of the current session
            currentSession.duration = event.timestamp - currentSession.startTime;
        }

        // Push the last session if it exists
        if (currentSession) {
            sessions.push(currentSession);
        }

        // Store the sessions by user
        sessionsByUser[visitorId] = sessions;
    }

    return sessionsByUser;
}



function main() {
    // get request
    axios.get(datasetURL)
        .then(res => {
            // check status
            console.log("GET:", res.status);

            // check response data
            //console.log(res.data.events);

            // getting result of getVisitor() and assigning it 
            const visitors = getVisitors(res.data.events);

            // getting result of getSessionsByUser() and assigning it
            const sessionsByUser = getSessionsByUser(visitors)

            // post request
            axios.post(resultURL, { sessionsByUser })
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
