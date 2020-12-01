using namespace std;

#include <iostream>
#include <vector>
#include <fstream>

// Custom path data type
struct path{
	char dir;
	int dist;
};

struct vertice{
	int x;
	int y;
};

struct pathNum{
	int first;
	int second;
};

vertice findIntersection(vertice end1, vertice end2, vertice start1, vertice start2);

// Reads input file and return a vector<int> from the input
vector<vector<path>> readInput(string file){
	// Vector to store the result in
	vector<vector<path>> result;
	vector<path> wire;

	// string that store the entire input
	string wireString;
	// Instantinate the input file object and open the file
	ifstream inFile;
	inFile.open(file);
	// store the input into a string
	while(inFile >> wireString){
		wire.clear();
		// Parse the wireString
		string currentNum = "";
		path newPath;
		newPath.dir = wireString[0];
		for (int i = 1; i < wireString.size(); i++){
			if (wireString[i] != ','){
				currentNum += wireString[i];
			} else {
				newPath.dist = stoi(currentNum);
				wire.push_back(newPath);
				currentNum = "";
				i++;
				newPath.dir = wireString[i];
			}
	}
	newPath.dist = stoi(currentNum);
	wire.push_back(newPath);
	result.push_back(wire);
	}

	// Close the file
	inFile.close();
	// Return the result vector
	
	return result;
}

int distanceToWireCross(vector<vector<path>> wires){
	int distance = 0;
	vector<path> path1 = wires[0];
	vector<path> path2 = wires[1];
	vector<vertice> vertice1;
	vector<vertice> vertice2;
	vector<vertice> intersections;
	vector<pathNum> stepsTaken;
	vertice curr1;
	vertice curr2;
	curr1.x = 0;
	curr1.y = 0;
	curr2.x = 0;
	curr2.y = 0;
	vertice origin = curr1;

	// Maps all vertices for path 1
	vertice1.push_back(origin);
	for(int i = 0; i < path1.size(); i++){
		if(path1[i].dir == 'R'){
			curr1.x += path1[i].dist;
		}
		else if(path1[i].dir == 'L'){
			curr1.x -= path1[i].dist;
		}
		else if(path1[i].dir == 'U'){
			curr1.y += path1[i].dist;
		}
		else if(path1[i].dir == 'D'){
			curr1.y -= path1[i].dist;
		}
		vertice1.push_back(curr1);
		//cout << "X: " << curr1.x << " Y: " << curr1.y << endl;
	}

	// Maps all vertices for path 2
	vertice2.push_back(origin);
	for(int i = 0; i < path2.size(); i++){
		if(path2[i].dir == 'R'){
			curr2.x += path2[i].dist;
		}
		else if(path2[i].dir == 'L'){
			curr2.x -= path2[i].dist;
		}
		else if(path2[i].dir == 'U'){
			curr2.y += path2[i].dist;
		}
		else if(path2[i].dir == 'D'){
			curr2.y -= path2[i].dist;
		}
		vertice2.push_back(curr2);
		//cout << "X: " << curr2.x << " Y: " << curr2.y << endl;
	}

	// Map all of the intersections
	for(int i = 0; i < vertice1.size()-1; i++){
		for(int j = 0; j < vertice2.size()-1; j++){
			vertice test = findIntersection(vertice1[i+1], vertice2[j+1], vertice1[i], vertice2[j]);
			pathNum steps;
			steps.first = i;
			steps.second = j;
			
			//cout << endl << endl << "X: " << test.x << " Y: " << test.y << endl;
			if(test.x != origin.x || test.y != origin.y){
				intersections.push_back(test);
			}
		}
	}
	int minimumSteps = stepsTaken[0].first;
	int min = abs(intersections[0].x) + abs(intersections[0].y);
	for(int i = 1; i < intersections.size(); i++){
		//cout << "(" << intersections[i].x << ", " << intersections[i].y << ")" << endl;
		int num = abs(intersections[i].x) + abs(intersections[i].y);
		if (num < min){
			min = num;
		}
	}
	distance = min;
	return distance;
}

// Find the intersection if it exists
vertice findIntersection(vertice end1, vertice end2, vertice start1, vertice start2){
	vertice intersection;
	intersection.x = 0;
	intersection.y = 0;
	
	if(start1.x > end1.x){
		int temp = end1.x;
		end1.x = start1.x;
		start1.x = temp;		
	}
	
	if(start2.x > end2.x){
		int temp = end2.x;
		end2.x = start2.x;
		start2.x = temp;		
	}

	if(start1.y > end1.y){
		int temp = end1.y;
		end1.y = start1.y;
		start1.y = temp;		
	}
	
	if(start2.y > end2.y){
		int temp = end2.y;
		end2.y = start2.y;
		start2.y = temp;		
	}
	
	if(start2.x > start1.x && start2.x < end1.x){ 
		if(start1.y > start2.y && start1.y < end2.y){
		intersection.x = start2.x;
		intersection.y = start1.y;

		return intersection;
		}
	}
	
	if(start1.x > start2.x && start1.x < end2.x){ 
		if(start2.y > start1.y && start2.y < end1.y){
		intersection.x = start1.x;
		intersection.y = start2.y;
		return intersection;
		}
	}
	
	return intersection;
}

int main(){
	// Read the input into a vector of ints
	vector<vector<path>> wires = readInput("input3.txt");

	// Output the results
	cout << "Part 1: " << distanceToWireCross(wires) << endl;

	return 0;
}

