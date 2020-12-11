using namespace std;

#include <iostream>
#include <vector>
#include <fstream>
#include <sstream>

struct instruction{
	string type;
	int argument;
	bool executed;
};

class computer{
	int PC = 0;
	int acc = 0;
	vector<instruction> instructions;
	
	public:
	void programInstruction(instruction newInstr){
		instructions.push_back(newInstr);
	}

	void execute(){
		// Mark the instruction as executed
		instructions[PC].executed = true;
		// If the action is jump, increase the program counter
		if(instructions[PC].type == "jmp"){
			PC += instructions[PC].argument;
			return;
		}
		// If the action is "acc" increase the accumulator
		if(instructions[PC].type == "acc")
			acc += instructions[PC].argument;
		// Increment the program counter
		PC++;
	}

	int accumulatorValueBeforeLoop(){
		while (PC < instructions.size()){
			// Return the accumulator if we are back to the same instruction
			if(instructions[PC].executed)
				return acc;
			execute();
		}
	}

	void resetVisited(){
		for (int i = 0; i < instructions.size(); i++){
			instructions[i].executed = false;
		}
	}

	int runProgram(){
		while (PC < instructions.size())
			execute();
		return acc;
	}

	bool isLoop(){
		resetVisited();
		PC = 0;
		acc = 0;
		while (PC < instructions.size()){
			// Return true if we are back to the same instruction
			if(instructions[PC].executed)
				return true;
			execute();
		}
		return false;
	}


	int accumulatorValueAfterTermination(){
		// Loop until we find the fixed instructions
		for (int i = 0; i < instructions.size(); i++){
			if(instructions[i].type == "acc")
				continue;
			// Check if changing the nop to a jmp fixes the corruption
			else if(instructions[i].type == "nop"){
				instructions[i].type = "jmp";
				// Revert the instruction if it is still a loop
				if(isLoop())
					instructions[i].type = "nop";
				// Run the program if the instruction terminates and return the accumulator
				else
					return runProgram();
			}
			else{
				instructions[i].type = "nop";
				// Revert the instruction if it is still a loop
				if(isLoop())
					instructions[i].type = "jmp";
				// Run the program if the instruction terminates and return the accumulator
				else
					return runProgram();
			}
		}
	}

};

// Reads input file and return a vector<int> from the input
computer readInput(string file){
	// Computer class
	computer comp;
	// Instantinate the input file object and open the file
	ifstream inFile;
	inFile.open(file);
	// Read line by line into a string and then push back into the result vector
	string line;
	while (getline(inFile, line)){
		stringstream ss(line);
		instruction currInstruction;
		string type;
		string argument;
		// Get the instruction operation and argument
		ss >> type >> argument;
		// Input it into the current variable
		currInstruction.type = type;
		currInstruction.argument = stoi(argument);
		currInstruction.executed = false;
		comp.programInstruction(currInstruction);
	}
	// Close the file
	inFile.close();
	return comp;
}

int main(){
	computer comp = readInput("input8.txt");
    cout << "Part 1: " << comp.accumulatorValueBeforeLoop() << endl;
    cout << "Part 2: " << comp.accumulatorValueAfterTermination() << endl;

    return 0;
}