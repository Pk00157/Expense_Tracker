#include <crow.h>
#include "routes/expense_routes.h"
#include "middleware/cors_middleware.h"
#include "./controllers/expense_controller.h"
#include "storage/storage.h"


int main() {
 crow::App<CORSMiddleware> app;

ExpenseController controller;

Storage storage;
storage.init();

CROW_ROUTE(app, "/")([](){
    return "AI Expense Backend Running";
});

CROW_ROUTE(app, "/<path>")
.methods("OPTIONS"_method)
([](std::string){
    return crow::response(204);
});

registerExpenseRoutes(app, controller);

app.port(18080).multithreaded().run();
}