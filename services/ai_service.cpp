#include <sstream>
#include <vector>
#include "ai_service.h"
#include "../utils/http_client.h"

std::string AIService::categorizeExpense(const std::string& description)
{
    
    std::string prompt =
        "Classify this expense into one category: "
        "Food, Transport, Shopping, Bills, Entertainment, Health, Other.\n"
        "Return only the category.\n"
        "Expense: " + description;

    std::string response = HttpClient::post(prompt);

    return response;
}
std::vector<std::string> AIService::generateInsights(const std::string& expenseData)
{
    std::string prompt =
        "Analyze the following weekly expense data and generate 3 short financial insights.\n"
        "Focus on spending patterns.\n"
        "Return each insight on a new line.\n\n"
        + expenseData;

    std::string response = HttpClient::post(prompt);

    std::vector<std::string> insights;
    std::stringstream ss(response);
    std::string line;

    while (std::getline(ss, line)) {
        if (!line.empty())
            insights.push_back(line);
    }

    return insights;
}