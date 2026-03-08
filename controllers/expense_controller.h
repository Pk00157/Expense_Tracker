#pragma once
#include <crow.h>
#include <nlohmann/json.hpp>
#include "../services/ai_service.h"
#include "../storage/storage.h"

using json = nlohmann::json;

class ExpenseController {
private:
    AIService service;  
    Storage storage;
public:

 // AI categorization

 crow::response analyze(const crow::request& req)
{
    try
    {
        std::cout << req.body << std::endl;

        auto body = json::parse(req.body);

        if (!body.contains("description") || body["description"].is_null() ||
    !body.contains("amount") || body["amount"].is_null())
{
    return crow::response(400, "Invalid description or amount");
}

        std::string description = body.value("description", "");
        int amount = body["amount"].get<int>();

        std::string category = service.categorizeExpense(description);
        double confidence = 0.9;

        json response;
        response["description"] = description;
        response["amount"] = amount;
        response["category"] = category;
        response["confidence"] = 0.9;
        
    storage.saveExpense(
    description,
    amount,
    category,
    confidence
    
);

        crow::response res;
        res.code = 200;
        res.set_header("Content-Type", "application/json");
        res.write(response.dump());
        return res;
    }
    catch (const std::exception& e)
    {
        return crow::response(500, e.what());
    }
}

// AI insights
crow::response insights(const crow::request& req)
{
    try
    {
        auto body = json::parse(req.body);

        if (!body.contains("data"))
        {
            return crow::response(400, "Missing data field");
        }

        std::string data = body["data"].get<std::string>();

        std::vector<std::string> insights =
            service.generateInsights(data);

        json response;
        response["insights"] = insights;

        crow::response res;
        res.code = 200;
        res.set_header("Content-Type", "application/json");
        res.write(response.dump());
        return res;
    }
    catch (const std::exception& e)
    {
        return crow::response(500, e.what());
    }
}

crow::response getExpenses()
{
    try
    {
        json data = storage.getAllExpenses();

        crow::response res;
        res.code = 200;
        res.set_header("Content-Type", "application/json");
        res.write(data.dump());
        return res;
    }
    catch (const std::exception& e)
    {
        return crow::response(500, e.what());
    }
}
};