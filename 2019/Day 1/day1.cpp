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

int calcFuel(vector<int> modules){
    // Store total fuel
    int fuel = 0;
    // For every module calculate fuel usage and add to total
    for(int i = 0; i < modules.size(); i++){
        fuel += (modules[i]/3) - 2;
    }
    // Return total fuel
    return fuel;
}

int calcFuel2(vector<int> modules){
    // Store total fuel
    int totalFuel = 0;
    // Store individual fuel
    int fuel = 0;
    // For every module calculate fuel usage and add to total
    for(int i = 0; i < modules.size(); i++){
            fuel = (modules[i]/3) - 2;
        while(fuel > 0){
            totalFuel += fuel;
            fuel = (fuel/3) - 2;
        }
    }
    // Return total fuel
    return totalFuel;
}


int main(){
    vector<int> modules = readInput("input1.txt");
    cout << "Part one: " << calcFuel(modules) << endl;
    cout << "Part two: " << calcFuel2(modules) << endl;
    return 0;
}