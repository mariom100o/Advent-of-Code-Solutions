using namespace std;

#include <iostream>
#include <vector>
#include <fstream>

// Custom datatype to store Toboggan passwords with requirements (old job)
struct combo1{
	char letter;
	int least;
	int most;
	string password;
};
// Custom datatype to store Toboggan passwords with corrected requirements
struct combo2{
	char letter;
	int index1;
	int index2;
	string password;
};

// Takes in a line of the input and parses into combo1 datatype
combo1 parse1(string line){
	string least;
	string most;
	string password;
	combo1 parsed;

	// Parse the least number and store it into parsed.least
	int i = 0;
	while(line[i] != '-'){
		least += line[i];
		i++;
	}
	parsed.least = stoi(least);
	i++;
	// Parse the most number and store it into parsed.most
	while(line[i] != ' '){
		most += line[i];
		i++;
	}
	parsed.most = stoi(most);
	i++;
	// Store the letter into parsed.letter
	parsed.letter = line[i];
	i+=3;
	// Parse the password and stoe it into parsed.password
	while(i < line.size()){
		password += line[i];
		i++;
	}
	parsed.password = password;

	// Return the parsed object
	return parsed;
}
// Takes in a line of the input and parses into combo2 datatype
combo2 parse2(string line){
	string index1;
	string index2;
	string password;
	combo2 parsed;

	// Parse the index1 number and store it into parsed.index1
	int i = 0;
	while(line[i] != '-'){
		index1 += line[i];
		i++;
	}
	parsed.index1 = stoi(index1);
	i++;
	// Parse the index2 number and store it into parsed.index2
	while(line[i] != ' '){
		index2 += line[i];
		i++;
	}
	parsed.index2 = stoi(index2);
	i++;
	// Store the letter into parsed.letter
	parsed.letter = line[i];
	i+=3;
	// Parse the password and stoe it into parsed.password
	while(i < line.size()){
		password += line[i];
		i++;
	}
	parsed.password = password;

	// Return the parsed object
	return parsed;
}

// Reads input file and return a vector<combo1> from the input
vector<combo1> readInput1(string file){
	// Vector to store the result in
	vector<combo1> result;
	// Instantinate the input file object and open the file
	ifstream inFile;
	inFile.open(file);
	// Read line by line into a string then push back into the result vector
	string line;
	while (getline(inFile, line)){
		combo1 currPass = parse1(line);
		result.push_back(currPass);
	}
	// Close the file
	inFile.close();
	// Return the result vector
	return result;
}
// Reads input file and return a vector<combo2> from the input
vector<combo2> readInput2(string file){
	// Vector to store the result in
	vector<combo2> result;
	// Instantinate the input file object and open the file
	ifstream inFile;
	inFile.open(file);
	// Read line by line into a string then push back into the result vector
	string line;
	while (getline(inFile, line)){
		combo2 thing = parse2(line);
		result.push_back(thing);
	}
	// Close the file
	inFile.close();
	// Return the result vector
	return result;
}

// Return number of correct passwords according to old job policy
int validPasswords1(vector<combo1> combos){
	int valid = 0;
	int occured = 0;
	// Traverses through every password in the vector
	for(int i = 0; i < combos.size(); i++){
		for(int j = 0; j < combos[i].password.size(); j++){
			// Increments occured if the character in password matches the required letter
			if(combos[i].password[j] == combos[i].letter){
				occured++;
			}
		}
		// Increments valid if the password meets the requirements
		if(occured >= combos[i].least && occured <= combos[i].most)
			valid++;
		// Reset occured for the next password
		occured = 0;
	}
	// Return the number of valid passwords
	return valid;
}

// Return number of correct passwords according to current job policy
int validPasswords2(vector<combo2> combos){
	int occured = 0;
	int valid = 0;
	
	// Traverses through every password in the vector
	for(int i = 0; i < combos.size(); i++){
		// Get the character and indices in question
		char letter = combos[i].letter;
		int index1 = combos[i].index1 - 1;
		int index2 = combos[i].index2 - 1;
		// Increment occured for every character that is in the specified index
		if(combos[i].password[index1] == letter)
			occured++;
		if(combos[i].password[index2] == letter)
			occured++;
		// Increments valid if occured is exactly 1
		if(occured == 1)
			valid++;
		// Resets occured for the next password
		occured = 0;
	}
	// Returns the number of valid passwords
	return valid;	
}

int main(){
	// Reads the inputs
    vector<combo1> combos1 = readInput1("input2.txt");
    vector<combo2> combos2 = readInput2("input2.txt");
	// Print the results
    cout << "Part 1: " << validPasswords1(combos1) << endl;
    cout << "Part 2: " << validPasswords2(combos2) << endl;

    return 0;
}