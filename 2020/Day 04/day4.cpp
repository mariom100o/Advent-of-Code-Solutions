using namespace std;

#include <iostream>
#include <vector>
#include <fstream>
#include <string>


struct passport {
	string byr;
	string iyr;
	string eyr;
	string hgt;
	string hcl;
	string ecl;
	string pid;
	string cid;

	// Check if the password is valid
	bool isValid(){
		// If any of the required fields are empty, return false
		if(byr == "" || iyr == "" || eyr == "" || hgt == "" || hcl == "" || ecl == "" || pid == "")
			return false;
		// If all required fields are present, return true
		return true;
	}

	// Check if the password is valid with the stricter rules
	bool isValid2() {

		// Make sure we satisfy the first condition first
		if (!isValid())
			return false;

		// Check if the birth year is valid
		if (stoi(byr) < 1920 || stoi(byr) > 2002){
			return false;
		}

		// Check if the issue year is valid
		if (stoi(iyr) < 2010 || stoi(iyr) > 2020){
			return false;
		}

		// Check if the expiration year is valid
		if (stoi(eyr) < 2020 || stoi(eyr) > 2030){
			return false;
		}

		// Check if the height is valid
		if (hgt.size() < 4)
			return false;
		// Find the measurement type and check if it's valid
		string type = hgt.substr(hgt.size()-2, 2);
		if (type != "cm" && type != "in")
			return false;
		// If it is valid, find the number and check if it's valid
		string num = hgt.substr(0, hgt.size()-2);
		// Check if the hgt is valid if it's in centimeters
		if (type == "cm")
			if (stoi(num) < 150 || stoi(num) > 193)
				return false;	
		// Check if the hgt is valid if it's in inches
		if (type == "in")
			if (stoi(num) < 59 || stoi(num) > 76)
				return false;
				
		// Check if the hair color is valid
		if (hcl.size() != 7 || hcl[0] != '#')
			return false;
		for (int i = 1; i < hcl.size(); i++){
			if (hcl[i] != '0' && hcl[i] != '1' && hcl[i] != '2' && hcl[i] != '3' && hcl[i] != '4' && hcl[i] != '5' && hcl[i] != '6' && hcl[i] != '7' && hcl[i] != '8' && hcl[i] != '9' && hcl[i] != 'a' && hcl[i] != 'b' && hcl[i] != 'c' && hcl[i] != 'd' && hcl[i] != 'e' && hcl[i] != 'f')
				return false;
		}

		// Check if the eye color is valid
		if(ecl != "amb" && ecl != "blu" && ecl != "brn" && ecl != "gry" && ecl != "grn" && ecl != "hzl" && ecl != "oth")
			return false;

		int pidCount = 0;
		// Check if the passport ID is valid
		for(int i = 0; i < pid.size(); i++){
			if(pid[i] == '0' || pid[i] == '1' || pid[i] == '2' || pid[i] == '3' || pid[i] == '4' || pid[i] == '5' || pid[i] == '6' || pid[i] == '7' || pid[i] == '8' || pid[i] == '9')
				pidCount++;
		}
		// If we don't have nine digits in the data, return false
		if (pidCount != 9)
			return false;

		// Return true if all test cases passed
		return true;
	}
};

void parse(string line, passport& current){
	string key;
	string data;
	int i = 0;

	// Set the key of the data
	while(i < line.size()){
		while(line[i] != ':'){
			key += line[i];
			i++;
		}
		// Increment i to jump over the ":"
		i++;
		// Set the data
		while(line[i] != ' ' && i < line.size()){
			data += line[i];
			i++;
		}
		// Add to data to the corresponding key
		if(key == "byr")
			current.byr = data;
		if(key == "iyr")
			current.iyr = data;
		if(key == "eyr")
			current.eyr = data;
		if(key == "hgt")
			current.hgt = data;
		if(key == "hcl")
			current.hcl = data;
		if(key == "ecl")
			current.ecl = data;
		if(key == "pid")
			current.pid = data;
		if(key == "cid")
			current.cid = data;
		// Increment i to jump over the space
		i++;
		// Reset the values to get ready for the next key:data
		key = "";
		data = "";
	}
}

// Reads input file and return a vector<int> from the input
vector<passport> readInput(string file){
	// Vector to store the result in
	vector<passport> result;
	// Instantinate the input file object and open the file
	ifstream inFile;
	inFile.open(file);
	// Read line by line into an string and then push back into the result vector
	string line;
	passport original;
	passport current;
	while (getline(inFile, line)){
		// If the line is empty we can push back the completed passport data
		if(line == ""){
			result.push_back(current);
			current = original;
		// If it's not empty we continue building the passport data
		} else {
			parse(line, current);
		}
	}
	// Push back the remaining data
	result.push_back(current);
	// Close the file
	inFile.close();
	// Return the result vector
	return result;
}

int validPassports(vector<passport> batchFile){
	int valid = 0;
	// Go through every password
	for(int i = 0; i < batchFile.size(); i++)
		// Increment the valid count if the password is valid
		if(batchFile[i].isValid())
			valid++;
	// Return the number of valid paswords
	return valid;
}

int validPassports2(vector<passport> batchFile){
	int valid = 0;
	// Go through every valid password to check for the more strict rules
	for(int i = 0; i < batchFile.size(); i++)
		// Increment the valid count if the password is valid
		if(batchFile[i].isValid2())
			valid++;
	// Return the number of valid paswords
	return valid;
}

int main(){
    vector<passport> batchFile = readInput("input4.txt");

    cout << "Part 1: " << validPassports(batchFile) << endl;
    cout << "Part 2: " << validPassports2(batchFile) << endl;

    return 0;
}