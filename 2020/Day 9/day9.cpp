using namespace std;

#include <iostream>
#include <vector>
#include <fstream>

class XMAS{
	vector<long long int> data;

	public:
	// Input a number into the data vector
	void input(long long int num){
		data.push_back(num);
	}
	// Check if there's a combination that add to the target
	bool twoSum(int start, int target, int preamble){
		for(int i = start; i < start+preamble; i++)
			for(int j = i; j < start+preamble; j++)
				if(data[i] + data[j] == target)
					return true;
		return false;
	}
	// Find the first number that does not equal to the sum of two of the last specified number
	int findFirstUnique(int preamble){
		for (int i = preamble; i < data.size(); i++)
			if(!twoSum(i-preamble, data[i], preamble))
				return data[i];
	}
	// Find the minimum element in a vector
	int findMin(int start, int end){
		int min = data[start];
		for (int i = start; i < end+1; i++){
			if(data[i] < min)
				min = data[i];
		}
		return min;
	}
	// Find the maximum element in a vector
	int findMax(int start, int end){
		int max = 0;
		for(int i = start; i < end+1; i++){
			if(data[i] > max)
				max = data[i];
		}
		return max;
	}
	// Find the sum of the smallest and largest number in the range
	int findWeakness(int preamble){
		int invalidNum = findFirstUnique(preamble);
		// Loop until we find the contiguous set
		for(int i = 0; i < data.size(); i++){
			int sum = 0;
			int j = i;
			// Add to the sum until we reach the target or go over it
			while(sum < invalidNum){
				sum += data[j];
				// Return the sum of min and max if we reached the target and we have at least two numbers in the set
				if(sum == invalidNum && (j - i) > 1)
					// Return the min and max from the contiguous vector
					return findMin(i, j) + findMax(i, j);
				j++;
			}
		}
	}
};

// Reads input file and return a vector<int> from the input
XMAS readInput(string file){
	// Vector to store the result in
	vector<int> result;
	// Instantinate the input file object and open the file
	ifstream inFile;
	inFile.open(file);
	// Read line by line into an int and then push back into the result vector
	long long int number;
	XMAS currData;
	while (inFile >> number){
		currData.input(number);
	}
	// Close the files
	inFile.close();
	// Return the result vector
	return currData;
}



int main(){
    XMAS data = readInput("input9.txt");
    cout << "Part 1: " << data.findFirstUnique(25) << endl;
    cout << "Part 2: " << data.findWeakness(25) << endl;

    return 0;
}