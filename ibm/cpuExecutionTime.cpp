vector<int> executionTime(const vector<string>& logs, int n) {
    stack<int> functionStack;
    int prevTime = 0;
    vector<int> result(n, 0);

    // split log into functionId, action and timestamp

    for(const string& logs : log) {
        stringstream ss(log);
        vector<string> logParts;
        string token;

        while(getline(ss, token, ':')) {
            logParts.push_back(token);
        }

        int functionId = stoi(logParts[0]);
        string action = logParts[1];
        int timestamp = stoi(logParts[2]);

        if (action == 'start') {
            if (functionStack.empty()) {
                result[functionStack.top()] = timestamp - prevTime; 
            } 

            functionStack.push(functionId); 
            prevTime = timestamp;
        } else if (action == 'end') {
            result[functionStack.top()] += timestamp - prevTime + 1;
            functionStack.pop();
            prevTime = timestamp + 1; 
        }
    }

    return result;

}