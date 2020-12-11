using namespace std;

#include <iostream>
#include <vector>
#include <fstream>

class seatPrediction{
	vector<string> seats;

	public:
	// Loads the starting seat layout from an input file
	void loadSeats(string file){
		// Instantinate the input file object and open the file
		ifstream inFile;
		inFile.open(file);
		// Read line by line into an int and then push back into the result vector
		string row;
		while (inFile >> row){
			seats.push_back(row);
		}
		// Close the file
		inFile.close();
	}
	int adjacentSeats(int row, int col){
		int count = 0;
		// Check if the seat above is occupied
		if (row-1 >= 0 && seats[row-1][col] == '#')
			count++;
		// Check if the seat below is occupied
		if (row+1 < seats.size() && seats[row+1][col] == '#')
			count++;
		// Check if the seat to left is occupied
		if (col-1 >= 0 && seats[row][col-1] == '#')
			count++;
		// Check if the seat to right is occupied
		if (col+1 < seats[row].size() && seats[row][col+1] == '#')
			count++;
		// Check if the seat to top right is occupied
		if (row-1 >= 0 && col+1 < seats[row].size() && seats[row-1][col+1] == '#')
			count++;
		// Check if the seat to top left is occupied
		if (row-1 >= 0 && col-1 >= 0 && seats[row-1][col-1] == '#')
			count++;
		// Check if the seat to bottom right is occupied
		if (row+1 < seats.size() && col+1 < seats[row].size() && seats[row+1][col+1] == '#')
			count++;
		// Check if the seat to bottom left is occupied
		if (row+1 < seats.size() && col-1 >= 0 && seats[row+1][col-1] == '#')
			count++;
		// Return the number of adjacent occupied seats
		return count;
	}

	int firstAdjacentSeats(int row, int col){
		int count = 0;
		int tempRow = row;
		int tempCol = col;
		// Check if the first seat above is occupied
		while(tempRow-1 >= 0 && seats[tempRow-1][tempCol] != 'L'){
			tempRow--;
			if (seats[tempRow][tempCol] == '#'){
				count++;
				break;
			}
		}
		tempRow = row;
		// Check if the first seat below is occupied
		while(tempRow+1 < seats.size() && seats[tempRow+1][tempCol] != 'L'){
			tempRow++;
			if (seats[tempRow][tempCol] == '#'){
				count++;
				break;
			}
		}
		tempRow = row;
		// Check if the first seat to left is occupied
		while(tempCol-1 >= 0 && seats[tempRow][tempCol-1] != 'L'){
			tempCol--;
			if (seats[tempRow][tempCol] == '#'){
				count++;
				break;
			}
		}
		tempCol = col;
		// Check if the first seat to right is occupied
		while(tempCol+1 < seats[tempRow].size() && seats[tempRow][tempCol+1] != 'L'){
			tempCol++;
			if (seats[tempRow][tempCol] == '#'){
				count++;
				break;
			}
		}
		tempCol = col;
		// Check if the first seat to top right is occupied
		while(tempRow-1 >= 0 && tempCol+1 < seats[tempRow].size() && seats[tempRow-1][tempCol+1] != 'L'){
			tempRow--;
			tempCol++;
			if (seats[tempRow][tempCol] == '#'){
				count++;
				break;
			}
		}
		tempRow = row;
		tempCol = col;
		// Check if the first seat to top left is occupied
		while(tempRow-1 >= 0 && tempCol-1 >= 0 && seats[tempRow-1][tempCol-1] != 'L'){
			tempRow--;
			tempCol--;
			if (seats[tempRow][tempCol] == '#'){
				count++;
				break;
			}
		}
		tempRow = row;
		tempCol = col;
		// Check if the first seat to bottom right is occupied
		while(tempRow+1 < seats.size() && tempCol+1 < seats[tempRow].size() && seats[tempRow+1][tempCol+1] != 'L'){
			tempRow++;
			tempCol++;
			if (seats[tempRow][tempCol] == '#'){
				count++;
				break;
			}
		}
		tempRow = row;
		tempCol = col;
		// Check if the first seat to bottom left is occupied
		while(tempRow+1 < seats.size() && tempCol-1 >= 0 && seats[tempRow+1][tempCol-1] != 'L'){
			tempRow++;
			tempCol--;
			if (seats[tempRow][tempCol] == '#'){
				count++;
				break;
			}
		}
		// Return the number of adjacent occupied seats
		return count;
	}

	int occupiedSeats(){
		vector<string> curr = seats;
		vector<string> original = seats;
		int occupied = 0;
		int changed = 1;
		// Loop until no changes are made
		while(changed > 0){
			changed = 0;
			// Go through the first round of rules
			for (int row = 0; row < seats.size(); row++)
				for (int col = 0; col < seats[row].size(); col++)
					if (seats[row][col] == 'L' && adjacentSeats(row, col) == 0){
						curr[row][col] = '#';
						occupied++;
						changed++;
					}
			seats = curr;
			// Go through the second round of rules
			for (int row = 0; row < seats.size(); row++)
				for (int col = 0; col < seats[row].size(); col++)
					if (seats[row][col] == '#' && adjacentSeats(row, col) >= 4){
						curr[row][col] = 'L';
						occupied--;
						changed++;
					}
			seats = curr;
		}
		seats = original;
		return occupied;
	}

	int occupiedSeatsWithTolerance(){
		vector<string> curr = seats;
		int occupied = 0;
		int changed = 1;
		// Loop until no changes are made
		while(changed > 0){
			changed = 0;
			// Go through the first round of rules
			for (int row = 0; row < seats.size(); row++)
				for (int col = 0; col < seats[row].size(); col++)
					if (seats[row][col] == 'L' && firstAdjacentSeats(row, col) == 0){
						curr[row][col] = '#';
						occupied++;
						changed++;
					}
			seats = curr;
			// Go through the second round of rules
			for (int row = 0; row < seats.size(); row++)
				for (int col = 0; col < seats[row].size(); col++)
					if (seats[row][col] == '#' && firstAdjacentSeats(row, col) >= 5){
						curr[row][col] = 'L';
						occupied--;
						changed++;
					}
			seats = curr;
		}
		return occupied;
	}

	// Prints the seat layout
	void printLayout(){
		for (int i = 0; i < seats.size(); i++)
			cout << seats[i] << endl;
	}
	void printCurrLayout(vector<string> curr){
		for (int i = 0; i < curr.size(); i++)
			cout << curr[i] << endl;
	}


};

int main(){
    seatPrediction seatLayout;
	seatLayout.loadSeats("input11.txt");
	//seatLayout.printLayout();
    cout << "Part 1: " <<  seatLayout.occupiedSeats() << endl;
    cout << "Part 2: " << seatLayout.occupiedSeatsWithTolerance() << endl;

    return 0;
}