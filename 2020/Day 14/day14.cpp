using namespace std;

#include <iostream>
#include <vector>
#include <fstream>
#include <cmath>
#include <unordered_map>

struct initProgram{
	long location;
	long value;
	string bitMask;
};

class computerSys{
	unordered_map<long, long> memory;
	vector<initProgram> program;

	public:

	computerSys(string file){
		getProgram(file);
	}

	string decToBin(int dec){
		string bin = "";
		// Loop through the binary digits
		for(int i = 35; i >= 0; i--){
			// If we need the binary value, push back a 1
			if(pow(2, i) <= dec){
				dec -= pow(2, i);
				bin += '1';
			}
			// If we don't, push back a 0
			else
				bin += '0';
		}
		// Return the binary value
		return bin;
	}

	void applyMask(string& binary, string mask){
		// Loop through the binary digits
		for (int i = 0; i < binary.size(); i++){
			// If the mask digit is an X we do nothing
			if (mask[i] == 'X')
				continue;
			// If it's a digit, we apply it 
			binary[i] = mask[i];
		}
	}
	long binToDec(string binary){
		long dec = 0;
		// Loop through the binary digits
		for(int i = 35; i >= 0; i--){
			// If it's a 0 do nothing
			if(binary[i] == '0')
				continue;
			// If it's a 1 add the value
			dec += pow(2, 35-i);
		}
		// Return the decimal
		return dec;
	}

	long memorySum(){
		// Go through every memory write
		for(int i = 0; i < program.size(); i++){
			// Convert it to binary
			string binary = decToBin(program[i].value);
			// Apply the mask
			applyMask(binary, program[i].bitMask);
			// Convert it back to decimal
			memory[program[i].location] = binToDec(binary);
		}
		// Get the sum of the memory
		long sum = 0;
		// Go through every value in the map
		unordered_map<long, long>::iterator itr;
		for(itr = memory.begin(); itr != memory.end(); itr++)
			// Add the value to the sum
			sum += itr->second;
		// Return the sum
		return sum;
	}

	void applyMaskV2(string& binary, string mask){
		// Loop through the binary digits
		for (int i = 0; i < binary.size(); i++){
			// If the mask digit is an X we do nothing
			if (mask[i] == '0')
				continue;
			// If it's a digit, we apply it 
			binary[i] = mask[i];
		}
	}

	void storeRecursive(string binary, int value){
		// Get the position of the first X
		size_t xPos = binary.find('X');
		// If there was no X we input the value in the masked location
		if (xPos == string::npos)
			memory[binToDec(binary)] = value;
		// Change X to a 1 and a 0
		else{
			binary[xPos] = '0';
			storeRecursive(binary, value);
			binary[xPos] = '1';
			storeRecursive(binary, value);
		}
	}

	long memorySumV2(){
		// Clear memory from part 1
		memory.clear();
		// Go through every memory write
		for(int i = 0; i < program.size(); i++){
			// Convert it to binary
			string binary = decToBin(program[i].location);
			// Apply the mask
			applyMaskV2(binary, program[i].bitMask);
			// Store value in all possible memory locations using storeRecursive()
			storeRecursive(binary, program[i].value);
		}
		// Get the sum of the memory
		long sum = 0;
		// Go through every value in the map
		unordered_map<long, long>::iterator itr;
		for(itr = memory.begin(); itr != memory.end(); itr++)
			// Add the value to the sum
			sum += itr->second;
		// Return the sum
		return sum;
	}

	long getLocation(string line){
		string num;
		int i = 0;
		// Get to the start of the location num
		while(line[i] != '[')
			i++;
		i++;
		// Get the location
		while(line[i] != ']'){
			num += line[i];
			i++;
		}
		// Return the num as a long
		return stol(num);
	}

	long getValue(string line){
		string num;
		int i = 0;
		// Get to the start of the value num
		while(line[i] != '=')
			i++;
		i += 2;
		// Get the value num
		while(i != line.size()){
			num += line[i];
			i++;
		}
		// Return the num as a long
		return stol(num);
	}
	// Reads input file and return a vector<int> from the input
	void getProgram(string file){
		// Instantinate the input file object and open the file
		ifstream inFile;
		inFile.open(file);
		// Read line by line into an int and then push back into the result vector
		string line;
		initProgram curr;
		string currBitMask;
		while (getline(inFile, line)){
			// Get the bitmask of the line we are on if it defines a bitmask
			if(line[1] == 'a'){
				currBitMask = line.substr(7);
				continue;
			}
			// Get the location and value of the memory write
			curr.bitMask = currBitMask;
			curr.location = getLocation(line);
			curr.value = getValue(line);
			// Push back curr
			program.push_back(curr);
		}
		// Close the file
		inFile.close();
	}
};



int main(){
	computerSys instructions("input14.txt");
    cout << "Part 1: " << instructions.memorySum() << endl;
    cout << "Part 2: " << instructions.memorySumV2() << endl;
    return 0;
}