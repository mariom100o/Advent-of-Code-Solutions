using namespace std;

#include <iostream>
#include <vector>
#include <fstream>
struct direction{
	char dir;
	int dist = 0;

};

class ferry{
	vector<direction> movements;

	public:

	int findDist(){
		int x = 0;
		int y = 0;
		int facing = 1;

		for(int i = 0; i < movements.size(); i++){
			switch(movements[i].dir){
				// Move the ferry north by the specified distance
				case 'N' : 
					y += movements[i].dist;
					break;
				// Move the ferry south by the specified distance
				case 'S' : 
					y -= movements[i].dist;
					break;
				// Move the ferry east by the specified distance
				case 'E' : 
					x += movements[i].dist;
					break;
				// Move the ferry west by the specified distance
				case 'W' : 
					x -= movements[i].dist;
					break;
				// Rotate the ferry by the specified degrees counter-clockwise
				case 'L' : 
					// Loop however many times we rotate 90 degrees
					for (int j = 0; j < movements[i].dist/90; j++){
						// Face south if we are facing west
						if(facing == -1)
							facing = 2;
						else
							facing--;
					}
						break;
				// Rotate the ferry by the specified degrees clockwise
				case 'R' :
					// Loop however many times we rotate 90 degrees
					for (int j = 0; j < movements[i].dist/90; j++){
						// Face west if we are facing south
						if(facing == 2)
							facing = -1;
						else
							facing++;
					}
						break;
				// Move the ferry forward in the direction we are facing by the specified distance
				case 'F' :
					if (facing == 0)
						y += movements[i].dist;
					if (facing == 1)
						x += movements[i].dist;
					if (facing == 2)
						y -= movements[i].dist;
					if (facing == -1)
						x -= movements[i].dist;
					break;
				default :
					break;
			}
		}
		// Return the Manhattan distance
		return abs(x) + abs(y);
	}

	int findFixedDist(){
			int x = 0;
			int y = 0;
			int wayX = 10;
			int wayY = 1;
			// Go through each movement
			for (int i = 0; i < movements.size(); i++){
				switch(movements[i].dir){
					// Move the waypoint north by the specified distance
					case 'N' : 
						wayY += movements[i].dist;
						break;
					// Move the waypoint south by the specified distance
					case 'S' : 
						wayY -= movements[i].dist;
						break;
					// Move the waypoint east by the specified distance
					case 'E' : 
						wayX += movements[i].dist;
						break;
					// Move the waypoint west by the specified distance
					case 'W' : 
						wayX -= movements[i].dist;
						break;
					// Rotate the waypoint by the specified degrees counter-clockwise about the ferry 
					case 'L' : 
						for (int j = 0; j < movements[i].dist/90; j++){
							int temp = -wayY;
							wayY = wayX;
							wayX = temp;
						}
						break;
					// Rotate the waypoint by the specified degrees clockwise about the ferry
					case 'R' : 
						for (int j = 0; j < movements[i].dist/90; j++){
							int temp = wayY;
							wayY = -wayX;
							wayX = temp;
						}
						break;
					// Move the ferry towards the waypoint by the specified number of times
					case 'F' :
						x += movements[i].dist * wayX;
						y += movements[i].dist * wayY;
						
					default :
						break;
				}
			}
			// Return the Manhattan distance
			return abs(x) + abs(y);
		}

	// Reads input file stores in a vector<direction>
	void readInput(string file){
	// Instantinate the input file object and open the file
	ifstream inFile;
	inFile.open(file);
	// Read line by line into aa string and then push back into the vector
	string line;
	direction curr;
	while (getline(inFile, line)){
		// Get the direction
		curr.dir = line[0];
		// Get the distance
		curr.dist = stoi(line.substr(1));
		// Push back the data
		movements.push_back(curr);
	}
	// Close the file
	inFile.close();
}

};





int main(){
    ferry ferryMovement;
	ferryMovement.readInput("input12.txt");
    cout << "Part 1: " << ferryMovement.findDist() << endl;
    cout << "Part 2: " << ferryMovement.findFixedDist() << endl;

    return 0;
}