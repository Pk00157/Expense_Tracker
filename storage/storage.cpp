#include "storage.h"
#include <iostream>

Storage::Storage()
{
    sqlite3_open("expenses.db", &db);
}

Storage::~Storage()
{
    sqlite3_close(db);
}

void Storage::init()
{
    const char* sql =
        "CREATE TABLE IF NOT EXISTS expenses ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT,"
        "description TEXT,"
        "amount REAL,"
        "category TEXT,"
        "confidence REAL);";

    char* err;
    sqlite3_exec(db, sql, 0, 0, &err);
}

void Storage::saveExpense(
    const std::string& description,
    double amount,
    const std::string& category,
    double confidence
)   
{
    std::string sql =
        "INSERT INTO expenses(description, amount, category, confidence) VALUES("
        "'" + description + "',"
        + std::to_string(amount) + ","
        "'" + category + "',"
        + std::to_string(confidence) + ");";

    char* err;
    sqlite3_exec(db, sql.c_str(), 0, 0, &err);
}

json Storage::getAllExpenses()
{
    json result = json::array();

    std::string sql = "SELECT * FROM expenses;";

    sqlite3_stmt* stmt;
    sqlite3_prepare_v2(db, sql.c_str(), -1, &stmt, NULL);

    while (sqlite3_step(stmt) == SQLITE_ROW)
    {
        json e;

        e["id"] = sqlite3_column_int(stmt, 0);
        e["description"] = (char*)sqlite3_column_text(stmt, 1);
        e["amount"] = sqlite3_column_double(stmt, 2);
        e["category"] = (char*)sqlite3_column_text(stmt, 3);
        e["confidence"] = sqlite3_column_double(stmt, 4);

        result.push_back(e);
    }

    sqlite3_finalize(stmt);

    return result;
}