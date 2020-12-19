using namespace std;

#include <iostream>
#include <vector>
#include <fstream>

class energySource{
	vector<vector<vector<vector<int>>>> dimension;
	vector<vector<vector<vector<int>>>> oldDimension;

	public:

	energySource(string file, int cycles){
		readInput(file, cycles);
	}

	void readInput(string file, int cycles){
		// Instantinate the input file object and open the file
		ifstream inFile;
		inFile.open(file);
		// Set the size we want
		int size = 8;
		// Inititialize our universe with the size we need
		// Initialize a 3d cube
		vector<vector<vector<int>>> cubeSpace(size + ((cycles) * 2), vector<vector<int>>(size + ((cycles) * 2), vector<int>(size + ((cycles) * 2))));
		// Add padding to the dimension
		for(int i = 0; i < cycles; i++){
			dimension.push_back(cubeSpace);
		}
		// Get our input
		string line;
		// Vector to store the slice
		vector<vector<int>> slice;
		// Vector to store the cube
		vector<vector<vector<int>>> cube;
		// Add padding to the cube
		vector<vector<int>> space(size + ((cycles) * 2), vector<int>(size + ((cycles) * 2)));
		for(int i = 0; i < cycles; i++){
			cube.push_back(space);
		}
		// Add padding to the slice
		vector<int> rowSpace(size + ((cycles) * 2));
		for(int i = 0; i < cycles; i++)
			slice.push_back(rowSpace);
		// Go through every line in the the input
		while (getline(inFile, line)){
			// Add padding to the row
			vector<int> row;
			for(int j = 0; j < cycles; j++)
				row.push_back(0);
			// Add a line of the input
			for(int i = 0; i < line.size(); i++){
				if (line[i] == '#')
					row.push_back(1);
				else
					row.push_back(0);
			}
			// Add padding to the row
			for(int j = 0; j < cycles; j++)
				row.push_back(0);

		slice.push_back(row);
		}
		// Add padding to the slice
		for(int i = 0; i < cycles; i++)
			slice.push_back(rowSpace);
			
		cube.push_back(slice);
		// Add padding to the cube
		for(int i = 0; i < cycles; i++){
				cube.push_back(space);
		}
		dimension.push_back(cube);

		// Add padding to the dimension
		for(int i = 0; i < cycles; i++){
			dimension.push_back(cubeSpace);
		}

		// Close the file
		inFile.close();
	}

	bool active(int w, int z, int y, int x){
		// Check if the coordinate is out of bounds
		if (w-1 < 0 || w+1 > dimension.size())
			return false;
		if (z-1 < 0 || z+1 > dimension[w].size())
			return false;
		if (y-1 < 0 || y+1 > dimension[w][z].size())
			return false;
		if (x-1 < 0 || x+1 > dimension[w][z][y].size())
			return false;
		
		// Check if the coordinate is active
		if (dimension[w][z][y][x] == 1)
			return true;
	}

	int surroundingCount3D(int z, int y, int x, int cycle){
		int count = 0;
		// Go through every surrounding coordinate
		for(int zz = z-1; zz <= z+1; zz++){
			for(int yy = y-1; yy <= y+1; yy++){
				for(int xx = x-1; xx <= x+1; xx++){
					if (zz == z && yy == y && xx == x)
						continue;
					if(active(cycle, zz, yy, xx))
						count++;
				}
			}
		}

		return count;
	}

	void print3D(){
		for (int z = 0; z < dimension[6].size(); z++){
			cout << "Z: " << z-6 << endl << endl;
			for (int y = 0; y < dimension[6][z].size(); y++){
				for (int x = 0; x < dimension[6][z][y].size(); x++){
					cout << dimension[6][z][y][x] << " ";
				}
				cout << endl;
			}
			cout << endl;
		}
	}

	int activeCubes3D(int cycle){
		
		vector<vector<vector<vector<int>>>> curr;
		curr = dimension;
		oldDimension = dimension;
		// Do a number of cycles
		for(int i = 0; i < cycle; i++){
			// Go through every element in the 3D vector
			for (int z = 0; z < dimension[cycle].size(); z++){
				for (int y = 0; y < dimension[cycle][z].size(); y++){
					for (int x = 0; x < dimension[cycle][z][y].size(); x++){
						int count = surroundingCount3D(z, y, x, cycle);
						if (dimension[cycle][z][y][x] == 1 && count != 2 && count != 3){
							curr[cycle][z][y][x] = 0;
						}
						
						if (dimension[cycle][z][y][x] == 0 && count == 3){
							curr[cycle][z][y][x] = 1;
						}
					}
				}
			}
		dimension = curr;
		}
		// Count the number of actives
		int count = 0;
		for (int z = 0; z < dimension[cycle].size(); z++)
			for (int y = 0; y < dimension[cycle][z].size(); y++)
				for (int x = 0; x < dimension[cycle][z][y].size(); x++)
					if (dimension[cycle][z][y][x] == 1)
						count++;
		return count;
	}
	//________________________________________________________________________________________________________________________________________//

	int surroundingCount4D(int w, int z, int y, int x){
		int count = 0;
		// Go through every surrounding coordinate
		for (int ww = w-1; ww <= w+1; ww++){
			for(int zz = z-1; zz <= z+1; zz++){
				for(int yy = y-1; yy <= y+1; yy++){
					for(int xx = x-1; xx <= x+1; xx++){
						if (ww == w && zz == z && yy == y && xx == x)
							continue;
						if(active(ww, zz, yy, xx))
							count++;
					}
				}
			}
		}
		return count;
	}

	int activeCubes4D(int cycle){
		dimension = oldDimension;
		vector<vector<vector<vector<int>>>> curr;
		curr = dimension;
		// Do a number of cycles
		for(int i = 0; i < cycle; i++){
			// Go through every element in the 4D vector
			for (int w = 0; w < dimension.size(); w++){
				for (int z = 0; z < dimension[w].size(); z++){
					for (int y = 0; y < dimension[w][z].size(); y++){
						for (int x = 0; x < dimension[w][z][y].size(); x++){
							int count = surroundingCount4D(w, z, y, x);
							if (dimension[w][z][y][x] == 1 && count != 2 && count != 3){
								curr[w][z][y][x] = 0;
							}
							
							if (dimension[w][z][y][x] == 0 && count == 3){
								curr[w][z][y][x] = 1;
							}
						}
					}
				}
			}
		dimension = curr;
		}
		// Count the number of actives
		int count = 0;
		for (int w = 0; w < dimension.size(); w++)
			for (int z = 0; z < dimension[w].size(); z++)
				for (int y = 0; y < dimension[w][z].size(); y++)
					for (int x = 0; x < dimension[w][z][y].size(); x++)
						if (dimension[w][z][y][x] == 1)
							count++;
		return count;
	}

};


int main(){
    energySource conwayCubes("input17.txt", 6);
    cout << "Part 1: " << conwayCubes.activeCubes3D(6) << endl;
    cout << "Part 2: " << conwayCubes.activeCubes4D(6) << endl;
   return 0;
}