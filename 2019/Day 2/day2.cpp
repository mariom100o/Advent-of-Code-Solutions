using namespace std;

#include <iostream>
#include <vector>
#include <fstream>

// Reads input file and return a vector<int> from the input
vector<int> readInput(string file){
	// Vector to store the result in
	vector<int> result;
	// string that store the entire input
	string input;
	// Instantinate the input file object and open the file
	ifstream inFile;
	inFile.open(file);
	// store the input into a string
	inFile >> input;
	// Close the file
	inFile.close();

	// Parse the string
	string currentNum = "";
	for (int i = 0; i < input.size(); i++){
		if (input[i] != ','){
			currentNum += input[i];
		} else {
			result.push_back(stoi(currentNum));
			currentNum = "";
		}
	}
	result.push_back(stoi(currentNum));

	// Return the result vector
	return result;
}

vector<int> runProg(vector<int> program){
	for(int i = 0; i < program.size(); i+=4){
		if(program[i] == 1){
			program[program[i+3]] = program[program[i+1]] + program[program[i+2]];
		} 
		else if(program[i] == 2){
			program[program[i+3]] = program[program[i+1]] * program[program[i+2]];
		}
		else if(program[i] == 99){
			return program;
		}
		
	}
	return program;
}

int findInts(vector<int> program){
	for(int i = 0; i < 100; i++){
		for(int j = 0; j < 100; j++){
			program[1] = i;
			program[2] = j;
			if (runProg(program)[0] == 19690720){
				return (100 * i) + j;
			}
		}
	}
	return -1;
}


int main(){
	// Read the input into a vector of ints
	vector<int> program = readInput("input2.txt");
	program[1] = 12;
	program[2] = 2;
	// Output the result
	cout << "Part 1: " << runProg(program)[0] << endl;
	cout << "Part 2: " << findInts(program) << endl;

	return 0;
}

