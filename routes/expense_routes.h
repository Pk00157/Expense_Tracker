#pragma once
#include <crow.h>
#include "../controllers/expense_controller.h"

template<typename App>
void registerExpenseRoutes(App& app, ExpenseController& controller) {
    
    CROW_ROUTE(app, "/analyze")
    .methods("POST"_method)
    ([&controller](const crow::request& req){
        return controller.analyze(req);
    });

    CROW_ROUTE(app, "/insights")
    .methods("POST"_method)
    ([&controller](const crow::request& req){
        return controller.insights(req);
    });

    CROW_ROUTE(app, "/expenses")
    .methods("GET"_method)
    ([&controller](){
        return controller.getExpenses();
    });
}