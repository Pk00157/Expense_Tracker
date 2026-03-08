#pragma once
#include <string>

class AIService {
public:
    std::string categorizeExpense(const std::string& description);
    std::vector<std::string> generateInsights(const std::string& data);
  
};