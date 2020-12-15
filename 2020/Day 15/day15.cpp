using namespace std;

#include <iostream>
#include <vector>
#include <fstream>
#include <unordered_map>

class memGame{
	// Maps a spoken number to turn it was last spoken
	unordered_map<int, int> spoken;
	int lastSpoken;
	int turn = 1;

	public:

	memGame(string file){
		readInput(file);
	}

	void playTurn(){
		// Look for the last spoken number
		unordered_map<int, int>::iterator itr = spoken.find(lastSpoken);
		// If the number was never spoken before, we add the spoken number to the map then speak 0
		if (itr == spoken.end()){
			spoken[lastSpoken] = turn;
			lastSpoken = 0;
		}
		// If the number was spoken before, we update the map, then speak the difference in turns
		else{
			// Find the last spoken word
			itr = spoken.find(lastSpoken);
			// Get the turn difference
			int difference = turn - itr->second;
			// Update the map
			spoken[lastSpoken] = turn;
			// Update the last spoken word
			lastSpoken = difference;
		} 
		turn++;
	}

	int numberSpoken(int turnNum){
		// Go through the number of specified turns
		while(turn < turnNum)
			playTurn();
		return lastSpoken;
	}

	void readInput(string file){
		// Instantinate the input file object and open the file
		ifstream inFile;
		inFile.open(file);
		// Read the line into an int and then push back into the mem vector
		string line;
		// Get the input
		getline(inFile, line);
		int i = 0;
		while (i < line.size()){
			string num;
			// Get every number in the line
			while (i < line.size() && line[i] != ','){
				num += line[i];
				i++;
			}
			i++;
			// Set the last spoken to the most recent number
			lastSpoken = stoi(num);
			// Store the number mapped to it's turn, unless it's the last number
			if(i < line.size()){
				spoken[stoi(num)] = turn;
				turn++;
			}
		}
		// Close the file
		inFile.close();
	}
};

int main(){
    memGame recitation("input15.txt");
    cout << "Part 1: " << recitation.numberSpoken(2020) << endl;
    cout << "Part 2: " << recitation.numberSpoken(30000000) << endl;
	return 0;
}