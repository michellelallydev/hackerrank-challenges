const GET =
  "https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=bc7d8712b664eadc7f9698f9b4a7";
const POST =
  "https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=bc7d8712b664eadc7f9698f9b4a7";
  var util = require('util');

const processData = (ipData) => {
  const userMap = new Map();

  ipData.events.forEach((record) => {
    const { url, visitorId, timestamp } = record;
    if (userMap.has(visitorId)) {
      userMap.get(visitorId).push({ url, timestamp });
    } else userMap.set(visitorId, [{ url, timestamp }]);
  });

  let res = {};

  for (const [userId, events] of userMap) {
    res = { ...res, [userId]: [] };

    if (events.length === 1) {
      res[userId].push({
        pages: [events[0].url],
        duration: 0,
        startTime: events[0].timestamp,
      });
      continue;
    }

    events.sort((a, b) => a.timestamp - b.timestamp);

    let pages = [events[0].url];
    let duration = 0;
    let startTime = events[0].timestamp;

    for (let i = 1; i < events.length; i++) {
      const t1 = events[i - 1].timestamp;
      const t2 = events[i].timestamp;
      const resultInMinutes = Math.ceil((t2 - t1) / 60000);
      console.log(new Date(t1), new Date(t2), resultInMinutes);
      if (resultInMinutes <= 10) {
        pages.push(events[i].url);
        duration += t2 - t1;
      } else {
        res[userId].push({
          pages,
          duration,
          startTime,
        });
        pages = [events[i].url];
        duration = 0;
        startTime = events[i].timestamp;
      }
    }

    res[userId].push({
      pages,
      duration,
      startTime,
    });
  }

  //   console.log(userMap);
  //   console.log(JSON.stringify(res, 2, 2));

  return res;
};

const init = async () => {


  const data = await Utils.getData(GET);

  const result = processData(data);


  console.log(JSON.stringify({ sessionsByUser: result }));

  try {
    const postDataRes = await Utils.postData(POST, {
      sessionsByUser: result,
    });

    console.log(postDataRes.data.message);
  } catch (error) {
    // console.log(JSON.stringify(error));
    console.log(error);
  }
};

init();