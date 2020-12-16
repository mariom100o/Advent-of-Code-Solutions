using namespace std;

#include <iostream>
#include <vector>
#include <fstream>
#include <sstream>

struct field{
	string name;
	int start1;
	int start2;
	int end1;
	int end2;
};

class tickets{
	vector<int> myTicket;
	vector<vector<int>> nearbyTickets;
	vector<field> fields;
	vector<vector<bool>> used;

	public:

	tickets(string file){
		readInput(file);
		// Resize the used vector
		used.resize(fields.size());
		for(int i = 0; i < used.size(); i++){
			used[i].resize(nearbyTickets[0].size());
		}
	}
	void readInput(string file){
		// Instantinate the input file object and open the file
		ifstream inFile;
		inFile.open(file);
		// Read line by line into a string
		string line = "hi";
		field curr;
		// Get a line of the file
		getline(inFile, line);
		// Get the fields
		while (line != ""){
			int i = 0;
			string name;
			// Get the name
			while(line[i] != ':'){
				name += line[i];
				i++;
			}
			// Set the name
			curr.name = name;
			// Get to the start of the first number
			i+=2;
			string num;
			// Get the first start number
			while(line[i] != '-'){
				num += line[i];
				i++;
			}
			curr.start1 = stoi(num);
			// Reset the num
			num.clear();
			// Get to the start of the end number
			i++;
			// Get the first end number
			while(line[i] != ' '){
				num += line[i];
				i++;
			}
			curr.end1 = stoi(num);
			num.clear();
			// Get to the start of the second number
			i+=4;
			// Get the first start number
			while(line[i] != '-'){
				num += line[i];
				i++;
			}
			curr.start2 = stoi(num);
			num.clear();
			// Get to the start of the end number
			i++;
			// Get the second end number
			while(i < line.size()){
				num += line[i];
				i++;
			}
			// Set the first end number
			curr.end2 = stoi(num);
			
			fields.push_back(curr);
			// Get a new line of the input
			getline(inFile, line);
		}

		// Get my ticket
		getline(inFile, line);
		getline(inFile, line);
		string num;
		for(int i = 0; i < line.size(); i++){
			if(line[i] == ','){
				myTicket.push_back(stoi(num));
				num.clear();
			}else
				num += line[i];
		}
		myTicket.push_back(stoi(num));

		// Get the nearby tickets
		getline(inFile, line);
		getline(inFile, line);
		while(getline(inFile, line)){
			string num;
			vector<int> currTicket;
			for(int i = 0; i < line.size(); i++){
				if(line[i] == ','){
					currTicket.push_back(stoi(num));
					num.clear();
				}
				else
					num += line[i];
			}
			currTicket.push_back(stoi(num));
			nearbyTickets.push_back(currTicket);
		}
		// Close the file
		inFile.close();
	}

	// Check if the num is valid to any field
	bool checkValid(int num){
		for(int i = 0; i < fields.size(); i++)
			if((num >= fields[i].start1 && num <= fields[i].end1) || (num >= fields[i].start2 && num <= fields[i].end2))
				return true;
		return false;
	}
	// Check if the num is valid to a specific field
	bool checkValidSpecific(int num, int i){
		if((num >= fields[i].start1 && num <= fields[i].end1) || (num >= fields[i].start2 && num <= fields[i].end2))
			return true;
		return false;
	}
	// Find and remove any invalid ticket
	int invalidTickets(){
		int sum = 0;
		for(int i = 0; i < nearbyTickets.size(); i++)
			for(int j = 0; j < nearbyTickets[i].size(); j++)
				// If the number is invalid, add to the sum and remove it from the nearby ticket vector
				if(!checkValid(nearbyTickets[i][j])){
					sum += nearbyTickets[i][j];
					nearbyTickets.erase(nearbyTickets.begin() + i);
					i--;
				}
		return sum;
	}

	long long departureProduct(){
		// Find which fields are used by all in a single column
		for (int i = 0; i < fields.size(); i++){
			for (int col = 0; col < nearbyTickets[0].size(); col++){
				bool all = true;
				for (int row = 0; row < nearbyTickets.size(); row++){
					// Check if the num is valid to a specific field
					if (!checkValidSpecific(nearbyTickets[row][col], i)){
						all = false;
						break;
					}
				}
				if(all){
					used[i][col] = true;
				}
			}
		}
		// Figure out which fields corresponds to each column
		for (int loopCount = 0; loopCount < 10; loopCount++){
			for (int col = 0; col < used[0].size(); col++){
				int count = 0;
				int currRow;
				int skip;
				for (int row = 0; row < used.size(); row++){
					// Increment count, set the current row, and set the skip if it is true
					if (used[row][col] == true){
						count++;
						currRow = row;
						skip = col;
					}
				}
				// If we do not only have 1 true, continue
				if (count != 1)
					continue;
				// Find which columns use which field
				for (int currCol = 0; currCol < used[0].size(); currCol++){
					// If we need to skip it, do so
					if (currCol == skip)
						continue;
					used[currRow][currCol] = false;
				}	
			}
		}
		//Find which columns are departure
		long long product = 1;
		// Loop through the first 20 fields (these are the departure ones)
		for (int field = 0; field < 6; field++){
			// Find with column uses that field
			for (int col = 0; col < used[0].size(); col++){
				if (used[field][col] == true)
					product *= myTicket[col];
			}
		}
		return product;
	}
};





int main(){
	tickets ticketTranslation("input16.txt");
    cout << "Part 1: " << ticketTranslation.invalidTickets() << endl;
    cout << "Part 2: " << ticketTranslation.departureProduct() << endl;

    return 0;
}