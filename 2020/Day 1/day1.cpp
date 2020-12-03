using namespace std;

#include <iostream>
#include <vector>
#include <fstream>

// Reads input file and return a vector<int> from the input
vector<int> readInput(string file){
	// Vector to store the result in
	vector<int> result;
	// Instantinate the input file object and open the file
	ifstream inFile;
	inFile.open(file);
	// Read line by line into an int and then push back into the result vector
	int number;
	while (inFile >> number){
		result.push_back(number);
	}
	// Close the file
	inFile.close();
	// Return the result vector
	return result;
}


// Find two numbers that add to 2020 and return the product
int twoSum2020(vector<int> expenseReport){
    for (int i = 0; i < expenseReport.size(); i++)
		for (int j = i; j < expenseReport.size(); j++)
			if(expenseReport[i] + expenseReport[j] == 2020)
				return expenseReport[i] * expenseReport[j];
}
// Find three numbers that add to 2020 and return the product
int threeSum2020(vector<int> expenseReport){
    for (int i = 0; i < expenseReport.size(); i++)
		for (int j = i; j < expenseReport.size(); j++)
			for (int k = j; k < expenseReport.size(); k++)
				if(expenseReport[i] + expenseReport[j] + expenseReport[k] == 2020)
					return expenseReport[i] * expenseReport[j] * expenseReport[k];
}
int main(){
    vector<int> expenseReport = readInput("input1.txt");
    cout << "Part 1: " << twoSum2020(expenseReport) << endl;
    cout << "Part 2: " << threeSum2020(expenseReport) << endl;

    return 0;
}