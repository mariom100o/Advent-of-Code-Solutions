using namespace std;

#include <iostream>
#include <vector>
#include <fstream>
#include <algorithm>


// Reads input file and return a vector<int> from the input
vector<string> readInput(string file){
	// Vector to store the result in
	vector<string> result;
	// Instantinate the input file object and open the file
	ifstream inFile;
	inFile.open(file);
	// Read line by line into an int and then push back into the result vector
	string line;
	while (getline(inFile, line)){
		result.push_back(line);
	}
	// Close the file
	inFile.close();
	// Return the result vector
	return result;
}

// Finds the position of the binary space partitioning code
int findSeatID(string code){
	// Initialize possible rows and columns
	int rowStart = 0;
	int rowEnd = 127;
	int colStart = 0;
	int colEnd = 7;
	int row = 0;
	int col = 0;

	// Go through the first 6 chars to find the row position
	for(int i = 0; i < 6; i++){
		// If the char is F we take the lower half
		if(code[i] == 'F')
			rowEnd = (rowStart + rowEnd)/2;
		// If the char is B we take the upper half
		if(code[i] == 'B')
			rowStart = (rowStart + rowEnd)/2 + 1;
	}
	// Pick the lower half if the last char is F
	if(code[6] == 'F')
		row = rowStart;
	// Pick the upper half if the last char is B
	if(code[6] == 'B')
		row = rowEnd;
	
	// Go through the rest of the characters, except the last one, to find the column position
	for (int i = 7; i < 9; i++){
		// If the char is L we take the lower half
		if(code[i] == 'L')
			colEnd = (colStart + colEnd)/2;
		// If the char is R we take the upper half
		if(code[i] == 'R')
			colStart = (colStart + colEnd)/2 + 1;
	}
	// Pick the lower half if the last char is F
	if(code[9] == 'L')
		col = colStart;
	// Pick the upper half if the last char is B
	if(code[9] == 'R')
		col = colEnd;
	// Return the ID
	return (row * 8) + col;
}

int findLargestID(vector<string> seats){
	int max = 0;
	// Iterate through all of the boarding passes
	for(int i = 0; i < seats.size(); i++){
		int ID = findSeatID(seats[i]);
		// Set the current ID as max if it is the largest so far
		if(ID > max)
			max = ID;
			
	}
	// Return the max
	return max;
}

int findBoardingPass(vector<string> seats){
	vector<int> IDs;
	int missing = -1;
	// Push all of the IDs into a vector
	for(int i = 0; i < seats.size(); i++)
		IDs.push_back(findSeatID(seats[i]));
	// Sort the IDs
	sort(IDs.begin(), IDs.end());
	// Find the missing ID
	for (int i = 0; i < IDs.size()-1; i++)
		// If an ID is skipped we return the skipped ID
		if(IDs[i]+1 != IDs[i+1])
			missing = IDs[i]+1;
	return missing;
}

int main(){
    vector<string> seats = readInput("input5.txt");
    cout << "Part 1: " << findLargestID(seats) << endl;
    cout << "Part 2: " << findBoardingPass(seats) << endl;

    return 0;
}