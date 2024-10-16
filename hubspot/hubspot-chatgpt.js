const axios = require('axios');
const USER_KEY = 'bc7d8712b664eadc7f9698f9b4a7';
const DATASET_URL = `https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=${USER_KEY}`;
const RESULT_URL = `https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=${USER_KEY}`;
const TEN_MINUTES = 600000; // 10 minutes in milliseconds

// Fetch event data from the API
async function fetchEventData() {
  try {
    const response = await axios.get(DATASET_URL);
    return response.data.events;
  } catch (error) {
    console.error('Error fetching event data:', error);
  }
}

// Group events by visitorId
function groupEventsByVisitor(events) {
  return events.reduce((acc, event) => {
    const { visitorId } = event;
    if (!acc[visitorId]) acc[visitorId] = [];
    acc[visitorId].push(event);
    return acc;
  }, {});
}

// Sort events by timestamp for each visitor
function sortEventsByTimestamp(eventsByVisitor) {
  for (const visitorId in eventsByVisitor) {
    eventsByVisitor[visitorId].sort((a, b) => a.timestamp - b.timestamp);
  }
}

// Group events into sessions based on the 10-minute rule
function groupEventsIntoSessions(events) {
  const sessions = [];
  let currentSession = {
    duration: 0,
    pages: [],
    startTime: events[0].timestamp,
  };

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const previousEvent = events[i - 1];

    // If this is the first event, initialize the session
    if (i === 0) {
      currentSession.pages.push(event.url);
      continue;
    }

    // Check the time gap between the current and previous event
    const timeGap = event.timestamp - previousEvent.timestamp;

    // If the time gap is less than 10 minutes, continue the session
    if (timeGap <= TEN_MINUTES) {
      currentSession.pages.push(event.url);
      currentSession.duration = event.timestamp - currentSession.startTime;
    } else {
      // If the gap is more than 10 minutes, close the current session and start a new one
      sessions.push(currentSession);

      // Start a new session
      currentSession = {
        pages: [event.url],
        startTime: event.timestamp,
        duration: 0,
      };
    }
  }

  // Push the last session
  sessions.push(currentSession);
  return sessions;
}

// Main function to process the events and group them into sessions
async function processEvents() {
  const events = await fetchEventData();

  // Step 1: Group events by visitorId
  const eventsByVisitor = groupEventsByVisitor(events);

  // Step 2: Sort events by timestamp for each visitor
  sortEventsByTimestamp(eventsByVisitor);

  // Step 3: For each visitor, group their events into sessions
  const sessionsByUser = {};

  for (const visitorId in eventsByVisitor) {
    const sessions = groupEventsIntoSessions(eventsByVisitor[visitorId]);
    console.log(sessions)
    sessionsByUser[visitorId] = sessions;
  }

  return { sessionsByUser };
}

// Submit the result to the API
async function submitResult(result) {
  try {
    const response = await axios.post(RESULT_URL, result);
    console.log('Submission status:', response.status);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error submitting results:', error);
  }
}

// Execute the process
async function main() {
  const result = await processEvents();
  await submitResult(result);
}

main();
