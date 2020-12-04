using namespace std;

#include <iostream>
#include <vector>
#include <fstream>

// Reads input file and return a vector<int> from the input
vector<string> readInput(string file){
	// Vector to store the result in
	vector<string> result;
	// Instantinate the input file object and open the file
	ifstream inFile;
	inFile.open(file);
	// Read line by line into an string and then push back into the result vector
	string line;
	while (getline(inFile, line)){
		result.push_back(line);
	}
	// Close the file
	inFile.close();
	// Return the result vector
	return result;
}

// Calculate the total number of trees encountered on the slope
int treePath(vector<string> treeMap, int right, int down){
	int treesHit = 0;
	int col = 0;
	int row = 0;

	// Loop until we hit the bottom
	while(row < treeMap.size()){
		// If we are on a tree spot, increment treesHit
		if(treeMap[row][col] == '#')
			treesHit++;

		// Move to the right by specified spaces
		col+=right;
		// Loops back to the start if passes edge
		if(col >= treeMap[row].size())
			col -= treeMap[row].size();
		// Move down by specified spaces
		row+=down;
	}
	// Return the number of trees hit
	return treesHit;
}

int main(){
    vector<string> treeMap = readInput("input3.txt");
    cout << "Part 1: " << treePath(treeMap, 3, 1) << endl;
	unsigned long long int part2 = treePath(treeMap, 1, 1) * treePath(treeMap, 3, 1) * treePath(treeMap, 5, 1) * treePath(treeMap, 7, 1) * treePath(treeMap, 1, 2); 
    cout << "Part 2: " << part2 << endl;

    return 0;
}