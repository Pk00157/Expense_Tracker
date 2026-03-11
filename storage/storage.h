#pragma once
#include <vector>
#include <string>
#include <sqlite3.h>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

class Storage
{
 
public:
    Storage();
    ~Storage();

    void init();

    void saveExpense(
        const std::string& description,
        double amount,
        const std::string& category,
        double confidence
    );
    void deleteExpense(int id );

    json getAllExpenses();
    sqlite3* getDB()   // <-- ADD THIS
    {
        return db;
    }
private:
    sqlite3* db;
};