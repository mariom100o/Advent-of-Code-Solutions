using namespace std;

#include <iostream>
#include <vector>
#include <fstream>
#include <sstream>
#include <unordered_set>

// Check if the word is any form of "bag"
bool bagWord(string word){
	if (word == "bags" || word == "bags." || word == "bags," || word == "bag" || word == "bag." || word == "bag,")
		return true;
	return false;
}
// Check if we need the word in the vector
bool necessary(string word){
		// Check if the word is not an unnecessary word
		if(word != "contain" && word != "no" && word != "other")
			// Return true if all tests passed
			return true;
	// Return false if a test was failed
	return false;
}

// Reads input file and return a vector<string> from the input
vector<vector<string>> readInput(string file){
	// Vector to store the result in
	vector<vector<string>> result;
	// Instantinate the input file object and open the file
	ifstream inFile;
	inFile.open(file);
	// Read line by line into an int and then push back into the result vector
	string line;
	string word;
	string bag;
	vector<string> rule;
	while (getline(inFile, line)){
		// Get every individual word in the line
		stringstream ss(line);
		while (ss >> word)
			// Check if the word is a variation of "bag", if it is we push back the completed bag word
			if (bagWord(word) && bag.size() != 0){
				rule.push_back(bag);
				bag.clear();
			}
			// Check if the word is necessary, it it is we add it to out bag word
			else if(necessary(word))
				bag += word;
		// Push back the completed rule vector into the result vector
		result.push_back(rule);
		rule.clear();
		bag.clear();
	}
	// Close the file
	inFile.close();
	// Return the result vector
	return result;
}

bool eventuallyGold(vector<vector<string>> bagList, string bag, unordered_set<string> goldContainingBags){
	// Remove the the number from the name of the bag if it exists
	if(bag[0] == '1' || bag[0] == '2' || bag[0] == '3' || bag[0] == '4' || bag[0] == '5' || bag[0] == '6' || bag[0] == '7' || bag[0] == '8' || bag[0] == '9')
		bag.erase(0, 1);
	// If the bag is our bag, return true
	if(bag == "shinygold" || goldContainingBags.find(bag) != goldContainingBags.end())
		return true;
	// Find the bag in the vector
	int i = 0;
	for(i; i < bagList.size(); i++){
		if (bagList[i][0] == bag)
			break;
	}
	// Return false if the bag does not hold anything
	if(bagList[i].size() == 1)
		return false;
	// Check if the bag's children have the shiny gold bag
	bool eventuallyTrue;
	for(int j = 1; j < bagList[i].size(); j++){
		bool eventuallyTrue = eventuallyGold(bagList, bagList[i][j], goldContainingBags);
		if(eventuallyTrue)
			return true;
	}
}



// Find the number of bags that could eventually hold a shiny gold one
int goldContainingBags(vector<vector<string>> bagList){
	unordered_set<string> goldContainingBags;
	// Go through every bag
	for(int i = 0; i < bagList.size(); i++){
		// Check if the bag eventually has a shiny gold bag and store it if it has not been stored before
		if(eventuallyGold(bagList, bagList[i][0], goldContainingBags) && goldContainingBags.find(bagList[i][0]) == goldContainingBags.end() && bagList[i][0] != "shinygold")
			goldContainingBags.insert(bagList[i][0]);
	}
	return goldContainingBags.size();
}

// Find the number of bags a shiny gold one holds
int numberOfNestedBags(vector<vector<string>> bagList, string bag){
	// Remove the the number from the name of the bag if it exists
	if(bag[0] == '1' || bag[0] == '2' || bag[0] == '3' || bag[0] == '4' || bag[0] == '5' || bag[0] == '6' || bag[0] == '7' || bag[0] == '8' || bag[0] == '9')
		bag.erase(0, 1);
	// Find the bag in the list
	int i = 0;
	for(i; i < bagList.size(); i++){
		if (bagList[i][0] == bag)
			break;
	}
	if(bagList[i].size() == 1)
		return 1;
	// Loops through the bag's children
	int total = 0;
	for(int j = 1; j < bagList[i].size(); j++)
		total += (int(bagList[i][j][0])-48) * numberOfNestedBags(bagList, bagList[i][j]);
	total++;
	return total;
}

int main(){
    vector<vector<string>> bagList = readInput("input7.txt");
    cout << "Part 1: " << goldContainingBags(bagList) << endl;
    cout << "Part 2: " << numberOfNestedBags(bagList, "shinygold")-1 << endl;

    return 0;
}