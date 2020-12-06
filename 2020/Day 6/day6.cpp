using namespace std;

#include <iostream>
#include <vector>
#include <fstream>

class groupAnswers{
	vector<int> answers;
	int members;
	
	public:
	// Constructor that initializes public values
	groupAnswers(){
		answers.resize(26);
		members = 0;
	}

	// Increment the passed answer count 
	void insert(int val){
		answers[val-'a']++;
	}

	// Increments number of members
	void addMember(){
		members++;
	}

	// Find the total answers in one group
	int findTotalAnswers(){
		int total = 0;
		// Find all answers that have been answered by at least one person
		for(int i = 0; i < answers.size(); i++)
			if(answers[i] > 0)
				total++;
		// Return the total
		return total;
	}

	// Find total number of "yes's" everyone answered
	int findTotalAllAnswered(){
		int total = 0;
		// Find all the trues in the answers
		for(int i = 0; i < answers.size(); i++)
			if(answers[i] == members)
				total++;
		// Return the total
		return total;
	}
};

void parse(groupAnswers& current, string line){
	// Go through every character in the line
	for(int i = 0; i < line.size(); i++)
		// Increment the corresponding letter
		current.insert(line[i]);
	current.addMember();
}

// Reads input file and return a vector<int> from the input
vector<groupAnswers> readInput(string file){
	// Vector to store the result in
	vector<groupAnswers> result;
	// Instantinate the input file object and open the file
	ifstream inFile;
	inFile.open(file);
	// Read line by line into an string and then push back into the result vector
	string line;
	groupAnswers original;
	groupAnswers current;
	while (getline(inFile, line)){
		// If the line is empty, declaring a new group, push back the current group
		if(line == ""){
			result.push_back(current);
			current = original;
		}
		// Continue parsing if it is still the same group
		else
			parse(current, line);
	}
	// Push back the last group
	result.push_back(current);
	// Close the file
	inFile.close();
	// Return the result vector
	return result;
}

int findTotalAnswers(vector<groupAnswers> formAnswers){
	int total = 0;
	// Go through every group's answers
	for(int i = 0; i < formAnswers.size(); i++)
		// Increment the total by the group's total
		total += formAnswers[i].findTotalAnswers();
	// Return the total number of questions answered "yes"
	return total;
}
int findTotalAllAnswered(vector<groupAnswers> formAnswers){
	int total = 0;
	// Go through every group's answers
	for(int i = 0; i < formAnswers.size(); i++)
		// Increment the total by the group's total
		total += formAnswers[i].findTotalAllAnswered();
	// Return the total number of questions everyone answered "yes"
	return total;
}

int main(){
    vector<groupAnswers> formAnswers = readInput("input6.txt");

    cout << "Part 1: " << findTotalAnswers(formAnswers) << endl;
    cout << "Part 2: " << findTotalAllAnswered(formAnswers) << endl;

    return 0;
}