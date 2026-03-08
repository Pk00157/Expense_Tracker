#pragma once
#include <crow.h>

struct CORSMiddleware {

    struct context {};

    void before_handle(crow::request& req,
                       crow::response& res,
                       context& ctx) {
        // nothing needed before
    }

    void after_handle(crow::request& req,
                      crow::response& res,
                      context& ctx) {

        res.add_header("Access-Control-Allow-Origin", "*");
        res.add_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        res.add_header("Access-Control-Allow-Headers", "Content-Type");
    }
};