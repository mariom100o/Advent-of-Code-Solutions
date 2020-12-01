using namespace std;

#include <iostream>
#include <string>

bool isPossiblePw(int pass){
    string test = to_string(pass);

    if(test.size() != 6)
        return false;
    if(test[0] != test[1] && test[1] != test[2] && test[2] != test[3] && test[3] != test[4] && test[4] != test[5])
        return false;
    if(test[0] > test[1] || test[1] > test[2] || test[2] > test[3] || test[3] > test[4] || test[4] > test[5])
        return false;
    return true;
}

int possiblePws(int start, int end){
    int solution = 0;
     for(int i = start+1; i < end; i++){
         if(isPossiblePw(i)){
             solution++;
         }
     }
    return solution;
}

bool isPossiblePw2(int pass){
    string test = to_string(pass);
    int consecutive = 0;

    if(test.size() != 6)
        return false;
    
    int count = 1;
    bool isTwo = false;

    for (int i = 0; i < 5; i++){
        if(test[i] == test[i+1]){
            count++;
        } else {
            if(count == 2){
                isTwo = true;
            }
            count = 1;
        }
    }

    if(count == 2){
        isTwo = true;
    }    


    if(!isTwo)
        return false;
    
    if(test[0] > test[1] || test[1] > test[2] || test[2] > test[3] || test[3] > test[4] || test[4] > test[5])
        return false;
    
    return true;
}

int possiblePws2(int start, int end){
    int solution = 0;
     for(int i = start+1; i < end; i++){
         if(isPossiblePw2(i)){
             solution++;
         }
     }
    return solution;
}

int main(){
    int start = 248345;
    int end = 746315;
    cout << "Test 1 (1): " << isPossiblePw(111111) << endl;
    cout << "Test 2 (0): " << isPossiblePw(223450) << endl;
    cout << "Test 3 (0): " << isPossiblePw(123789) << endl;
    cout << "Part 1: " << possiblePws(start, end) << endl << endl;

    cout << "Test 2.1 (1): " << isPossiblePw2(112233) << endl;
    cout << "Test 2.2 (0): " << isPossiblePw2(123444) << endl;
    cout << "Test 2.3 (1): " << isPossiblePw2(111122) << endl;
    cout << "Part 2: " << possiblePws2(start, end) << endl;
    return 0;
}