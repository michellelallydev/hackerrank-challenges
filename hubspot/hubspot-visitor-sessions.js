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
    let sessionsByUser = [];

    // get list of sessions for visitor
    for (let visitorId in visitors) {
        let events = visitors[visitorId]; 
        let sessions = [];
        
        // looping over events
        for (let i = 0; i < events.length; i++) {
            const currentSession = events[i];
            const previousSession = events[i - 1];

            // checking if current session is the first session
            if (i === 0 || currentSession.timestamp - previousSession.timestamp > timeLimit) {
                // initialize a new session
                sessions.push(currentSession.url);

                let session = {
                    duration: 0,
                    pages: [],
                    startTime: events[0].timestamp     
                };

            }

                // declaring a session object


            // Check the time gap between the current and previous event
            const timeDifference = currentSession.timestamp - previousSession.timestamp;

            // If the time gap is less than 10 minutes, continue the session
            if (timeDifference <= timeLimit) {
                session.pages.push(currentSession.url);
                session.duration = event.timestamp - session.startTime;
            } else {
                // If the gap is more than 10 minutes, close the current session and start a new one
                sessions.push(session);

                // Start a new session
                session = {
                    pages: [currentSession.url],
                    startTime: currentSession.timestamp,
                    duration: 0,
                };
            }
        }
        
        // push last session
        sessions.push(currentSession);

        // push visitor sessions to sessionsByUser 
        sessionsByUser[visitorId].push(session);
    }

    // checking format of sessionsByUser list
    console.log(JSON.stringify((sessionsByUser)))
    return sessionsByUser
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
