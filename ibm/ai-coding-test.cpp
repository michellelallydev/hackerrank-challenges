
// Function to calculate the maximum number of subjects that can be passed
int maxSubjectsNumber(vector<int> answered, vector<int> needed, int q) {
    int n = answered.size();  // The number of subjects
    vector<int> additionalNeeded(n);

    // Calculate how many more questions are needed for each subject to pass
    for (int i = 0; i < n; ++i) {
        additionalNeeded[i] = needed[i] - answered[i];
    }

    // Sort the subjects by the number of additional questions needed in ascending order
    sort(additionalNeeded.begin(), additionalNeeded.end());

    int subjectsPassed = 0;

    // Distribute the available 'q' questions to pass as many subjects as possible
    for (int i = 0; i < n; ++i) {
        if (q >= additionalNeeded[i]) {
            q -= additionalNeeded[i];  // Use the required number of questions for this subject
            subjectsPassed++;          // This subject is now passed
        } else {
            break;  // No more questions left to pass additional subjects
        }
    }

    return subjectsPassed;  // Return the maximum number of subjects passed
}