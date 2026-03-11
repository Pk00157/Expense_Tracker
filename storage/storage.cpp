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
void Storage::deleteExpense(int id)
{
    std::string sql = "DELETE FROM expenses WHERE id = " + std::to_string(id);

    char* err;

if (sqlite3_exec(db, sql.c_str(), 0, 0, &err) != SQLITE_OK)
{
    std::cout << "Delete failed: " << err << std::endl;
    sqlite3_free(err);
}
else
{
    std::cout << "Delete successful" << std::endl;
}
}
void Storage::init()
{
    const char* sql =
    "CREATE TABLE IF NOT EXISTS expenses ("
    "id INTEGER PRIMARY KEY AUTOINCREMENT,"
    "description TEXT,"
    "amount REAL,"
    "category TEXT,"
    "confidence REAL,"
    "created_at TEXT);";

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
    "INSERT INTO expenses(description, amount, category, confidence, created_at) VALUES("
    "'" + description + "',"
    + std::to_string(amount) + ","
    "'" + category + "',"
    + std::to_string(confidence) + ","
    "datetime('now'));";

    char* err;
    sqlite3_exec(db, sql.c_str(), 0, 0, &err);
}

json Storage::getAllExpenses()
{
    json result = json::array();
    std::cout << "GET EXPENSES ROUTE HIT" << std::endl;
    std::string sql =
    "SELECT id, description, amount, category, confidence, created_at FROM expenses ORDER BY created_at DESC;";

    sqlite3_stmt* stmt;

    if (sqlite3_prepare_v2(db, sql.c_str(), -1, &stmt, NULL) != SQLITE_OK)
    {
        std::cerr << "Prepare failed: " << sqlite3_errmsg(db) << std::endl;
        return result;
    }

    while (sqlite3_step(stmt) == SQLITE_ROW)
    {
        json e;

        e["id"] = sqlite3_column_int(stmt, 0);
        e["description"] = (char*)sqlite3_column_text(stmt, 1);
        e["amount"] = sqlite3_column_double(stmt, 2);
        e["category"] = (char*)sqlite3_column_text(stmt, 3);
        e["confidence"] = sqlite3_column_double(stmt, 4);

        const unsigned char* date = sqlite3_column_text(stmt, 5);
        e["created_at"] = date ? (const char*)date : "";

        result.push_back(e);
    }

    sqlite3_finalize(stmt);

    return result;
}