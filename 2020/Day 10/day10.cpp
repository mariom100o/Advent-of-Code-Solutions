using namespace std;

#include <iostream>
#include <vector>
#include <fstream>
#include <algorithm>

class adapters{
	vector<int> ratings;
	vector<long long int> DP;
	int oneDiff = 0;
	int twoDiff = 0;
	int threeDiff = 0;

	public:
	// Input data into the ratings vector
	void input(int rating){
		ratings.push_back(rating);
	}

	int findDiff(int from, int to){
		// Find the conversion difference
		if(to - from == 1){
			oneDiff++;
			return 1;
		}
		if(to - from == 2){
			twoDiff++;
			return 2;
		}
		if(to - from == 3){
			threeDiff++;
			return 3;
		}
		// Return -1 if there is no conversion
		return -1;
	}

	// Find the differences
	int differences(){
		sort(ratings.begin(), ratings.end());
		// Get the initial joltage increase from 0
		if(findDiff(0, ratings[0]) == -1)
			return oneDiff * threeDiff;
		// Loop through every rating
		for(int i = 0; i < ratings.size()-1; i++)
			if(findDiff(ratings[i], ratings[i+1]) == -1)
				break;
		return oneDiff * threeDiff;
	}

	long long int combinations(){
		sort(ratings.begin(), ratings.end());
		// Get the first three numbers of the DP
		DP.push_back(1);
		DP.push_back(1);
		// Push back 2 if we can get to the third element from the first
		if(ratings[2] >= 3)
			DP.push_back(2);
		else
			DP.push_back(1);
		// Loop through each element in the ratings vector and build onto our DP vector
		for (int i = 2; i < ratings.size(); i++){
			long long int total = 0;
			// If we can get to the current voltage from the voltage three steps back, 
			// add the number of ways to get the voltage three steps back to the total
			if(ratings[i] - ratings[i-3] <= 3)
				total += DP[i-2];
			// If we can get to the current voltage from the voltage two steps back, 
			// add the number of ways to get the voltage two steps back to the total
			if(ratings[i] - ratings[i-2] <= 3)
				total += DP[i-1];
			// If we can get to the current voltage from the voltage one step back, 
			// add the number of ways to get the voltage one step back to the total
			if(ratings[i] - ratings[i-1] <= 3)
				total += DP[i];
			DP.push_back(total);
			total = 0;
		}
		// Return the last element of the DP vector
		return DP[DP.size()-1];
	}

};

// Reads input file and return a vector<int> from the input
adapters readInput(string file){
	adapters curr;
	// Instantinate the input file object and open the file
	ifstream inFile;
	inFile.open(file);
	// Read line by line into an int and then push back into the result vector
	int number;
	int max = 0;
	while (inFile >> number){
		curr.input(number);
		if(number > max)
			max = number;
	}
	curr.input(max+3);
	// Close the file
	inFile.close();
	// Return the result vector
	return curr;
}

int main(){
    adapters adapterBag = readInput("input10.txt");
    cout << "Part 1: " << adapterBag.differences() << endl;
    cout << "Part 2: " << adapterBag.combinations() << endl;

    return 0;
}