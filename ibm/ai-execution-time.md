
vector<int> exclusiveTime(int n, vector<string>& logs) {
    vector<int> result(n, 0);  // To store the exclusive time for each function
    stack<int> functionStack;  // Stack to store active function IDs
    int prevTime = 0;          // To track the previous timestamp
    
    for (const string& log : logs) {
        // Split the log into parts (function_id, start/end, timestamp)
        stringstream ss(log);
        string idStr, type, timeStr;
        getline(ss, idStr, ':');
        getline(ss, type, ':');
        getline(ss, timeStr, ':');
        
        int id = stoi(idStr);  // Function ID
        int timestamp = stoi(timeStr);  // Time
        
        if (!functionStack.empty()) {
            // Add time spent by the top function in the stack
            result[functionStack.top()] += (timestamp - prevTime);
        }
        
        prevTime = timestamp;  // Update previous time
        
        if (type == "start") {
            // Function starts, push onto stack
            functionStack.push(id);
        } else {
            // Function ends, pop from stack and account for its time
            result[functionStack.top()] += 1;  // Include the current second
            functionStack.pop();
            prevTime++;  // Move time ahead after the end
        }
    }
    
    return result;
}
