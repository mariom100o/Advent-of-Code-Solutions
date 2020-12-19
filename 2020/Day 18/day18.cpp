using namespace std;

#include <iostream>
#include <vector>
#include <fstream>
#include <deque>

class calculator{
	vector<deque<string>> expressions;

	public:

	calculator(string file){
		getExpressions(file);
	}

	void getExpressions(string file){
		// Instantinate the input file object and open the file
		ifstream inFile;
		inFile.open(file);
		// Read line by line into a string and then push back into the expressions vector
		string expression;
		while (getline(inFile, expression)){
			deque<string> currExpression;
			for (int i = 0; i < expression.size(); i++){
				if (expression[i] != ' '){
					string value;
					value += expression[i];
					currExpression.push_back(value);
				}
			}
			expressions.push_back(currExpression);
		}
		// Close the file
		inFile.close();
	}

	// Solve a two term expression
	string solve(string operand1, string op, string operand2){
		long solved;
		if (op == "*")
			solved = (stol(operand1) * stol(operand2));
		if (op == "+")
			solved = (stol(operand1) + stol(operand2));
		return to_string(solved);
	}
	// Evaluate the expression using simple math
	long evaluate(deque<string> expression){
		string operand1 = "";
		string operand2 = "";
		string op = "";
		while(expression.size() > 1){
			// Check if we hit a parenthesis
			if (expression.front() == "("){
				expression.pop_front();
				int balanced = 0;
				deque<string> parenthesis;
				// Get the expression in the parenthesis
				while (balanced != 0 || expression.front() != ")"){
					if (expression.front() == "(")
						balanced++;
					if (expression.front() == ")")
						balanced--;
					parenthesis.push_back(expression.front());
					expression.pop_front();
				}
				expression.pop_front();
				// Solve the expression in the parenthesis
				operand1 = to_string(evaluate(parenthesis));
			} else {
				// Get the operand if it's not a parenthesis
				operand1 = expression.front();
				expression.pop_front();
			}
			// Get the operator
			op = expression.front();
			expression.pop_front();

			// Get the second operand
			// Check if we hit a parenthesis
			if (expression.front() == "("){
				expression.pop_front();
				int balanced = 0;
				deque<string> parenthesis;
				// Get the expression in the parenthesis
				while (balanced != 0 || expression.front() != ")"){
					if (expression.front() == "(")
						balanced++;
					if (expression.front() == ")")
						balanced--;
					parenthesis.push_back(expression.front());
					expression.pop_front();
				}
				expression.pop_front();
				// Solve the expression in the parenthesis
				operand2 = to_string(evaluate(parenthesis));
			} else {
				// Get the operand if it's not a parenthesis
				operand2 = expression.front();
				expression.pop_front();
			}
			// Solve the two term expression and add it to the front of the queue
			expression.push_front(solve(operand1, op, operand2));
		}
		return stol(expression.front());
	}

	// Evaluate an expression using advanced math
	long evaluateAdvanced(deque<string> expression){
		string operand1 = "";
		string operand2 = "";
		string op = "";
		// Queue to store the simplified multiplication expression
		deque<string> simplified;
		while(expression.size() > 1){
			// Check if we hit a parenthesis
			if (expression.front() == "("){
				expression.pop_front();
				int balanced = 0;
				deque<string> parenthesis;
				// Get the expression in the parenthesis
				while (balanced != 0 || expression.front() != ")"){
					if (expression.front() == "(")
						balanced++;
					if (expression.front() == ")")
						balanced--;
					parenthesis.push_back(expression.front());
					expression.pop_front();
				}
				expression.pop_front();
				// Solve the two term expression and add it to the front of the queue
				operand1 = to_string(evaluateAdvanced(parenthesis));
			} else {
				// Get the operand if it's not a parenthesis
				operand1 = expression.front();
				expression.pop_front();
			}
			// Get the operator
			op = expression.front();
			expression.pop_front();

			// Get the second operand
			// Check if the operand is (
			if (expression.front() == "("){
				expression.pop_front();
				int balanced = 0;
				deque<string> parenthesis;
				// Get the expression in the parenthesis
				while (balanced != 0 || expression.front() != ")"){
					if (expression.front() == "(")
						balanced++;
					if (expression.front() == ")")
						balanced--;
					parenthesis.push_back(expression.front());
					expression.pop_front();
				}
				expression.pop_front();
				// Solve the two term expression and add it to the front of the queue
				operand2 = to_string(evaluateAdvanced(parenthesis));
			} else {
				// Get the operand if it's not a parenthesis
				operand2 = expression.front();
				expression.pop_front();
			}
			// If the operator is multiply, we add it to our simplified queue
			if (op == "*"){
				simplified.push_back(operand1);
				simplified.push_back(op);
				expression.push_front(operand2);
			}
			// Solve it normally if the operator is add
			if (op == "+")
				expression.push_front(to_string((stol(operand1) + stol(operand2))));

		}
		// Add the last operand to the simplified queue
		string finalOperand = expression.front();
		expression.pop_front();
		simplified.push_back(finalOperand);
		// Evaluate the simplfiied multiplication expression using basic math
		return evaluate(simplified);
	}
	// Get the sum using basic math
	long getSum(){
		long sum = 0;
		for (int i = 0; i < expressions.size(); i++){
			sum += evaluate(expressions[i]);
		}
		return sum;
	}
	// Get the sum using advanced math
	long getSumAdvanced(){
		long sum = 0;
		for (int i = 0; i < expressions.size(); i++){
			sum += evaluateAdvanced(expressions[i]);
		}
		return sum;
	}

};

int main(){
	// Create our object and read the input
   	calculator math("input18.txt");
	// Get the solution to part one
    cout << "Part 1: " << math.getSum() << endl;
	// Get the solution to part two
    cout << "Part 2: " << math.getSumAdvanced() << endl;

    return 0;
}