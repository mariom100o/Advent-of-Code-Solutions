using namespace std;

#include <iostream>
#include <vector>
#include <fstream>

struct busTime {
	int offset;
	int ID;
};

class busTimeStamp {
	vector<string> IDs;
	vector<busTime> offsets;
	int departure;

	public:

	// Find the offsets for each bus
	void findOffsets(){
		busTime curr;
		for (int i = 0; i < IDs.size(); i++){
			if (IDs[i] == "x")
				continue;
			curr.offset = i;
			curr.ID = stoi(IDs[i]);
			offsets.push_back(curr);
		}
	}

	long long earliestMatchingOffset(){
		// Store the IDs and their proper offset
		findOffsets();
		// Make the frequency everytime the first and third IDs overlap
		long long frequency = offsets[0].ID * offsets[2].ID;
		// Loop until we find the earliest timestamp with matching offsets, incrementing by the frequency each time.
		for (long long int i = frequency; i < 9223372036854775807; i += frequency){
			long long ans = i - offsets[0].ID;
			// Check if we the IDs are in the proper placestamps
			if((ans + offsets[1].offset) % offsets[1].ID == 0)
				if((ans + offsets[2].offset) % offsets[2].ID == 0)
					if((ans + offsets[3].offset) % offsets[3].ID == 0)
						if((ans + offsets[4].offset) % offsets[4].ID == 0)
							if((ans + offsets[5].offset) % offsets[5].ID == 0)
								if((ans + offsets[6].offset) % offsets[6].ID == 0)
									if((ans + offsets[7].offset) % offsets[7].ID == 0)
										if((ans + offsets[8].offset) % offsets[8].ID == 0)
											return ans;
		}
		return -1;
	}

	int findEarliestID(){
		int curr = 0;
		int min = departure;
		int nearestID;
		for (int i = 0; i < IDs.size(); i++){
			if (IDs[i] == "x")
				continue;
			// Set curr equal to the the timestamp the current bus can depart nearest to out departure time
			curr = (departure/stoi(IDs[i])) * stoi(IDs[i]);
			// If the timestamp is before our departure, go to the next timestamp
			if (curr < departure)
				curr += stoi(IDs[i]);
			// Check if this timestamp is the nearest to our departure time so far
			if (curr - departure < min){
				min = curr - departure;
				nearestID = stoi(IDs[i]);
			}
		}
		return nearestID * min;
		
	}

	// Reads input file and return a vector<int> from the input
	void getNotes(string file){
	// Instantinate the input file object and open the file
	ifstream inFile;
	inFile.open(file);
	// Read line by line into an int and then push back into the result vector
	string line;
	// Get the first line
	inFile >> line;
	departure = stoi(line);
	// Get the second line and input it into the IDs vector
	inFile >> line;
	string curr;
	for (int i = 0; i < line.size(); i++){
		if (line[i] == ','){
			IDs.push_back(curr);
			curr = "";
		}
		else
			curr += line[i];
	}
	IDs.push_back(curr);
	// Close the file
	inFile.close();
}

};


int main(){
    busTimeStamp busSheet;
	busSheet.getNotes("input13.txt");
    cout << "Part 1: " << busSheet.findEarliestID() << endl;
    cout << "Part 2: " << busSheet.earliestMatchingOffset() << endl;

    return 0;
}