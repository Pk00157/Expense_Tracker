#include "http_client.h"
#include <curl/curl.h>
#include <nlohmann/json.hpp>
#include <iostream>


using json = nlohmann::json;

static size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* output)
{
    size_t totalSize = size * nmemb;
    output->append((char*)contents, totalSize);
    return totalSize;
}

std::string HttpClient::post(const std::string& prompt)
{
    CURL* curl;
    CURLcode res;
    std::string response;
    const char* key = std::getenv("OPENAI_API_KEY");

if (!key)
{
    std::cerr << "Missing GEMINI API KEY!" << std::endl;
    return "Other";
}
    curl = curl_easy_init();

    if (curl)
    {
      std::string url =
"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" 
+ std::string(key);

        json body = {
    {"contents", {
        {
            {"parts", {
                {{"text", prompt}}
            }}
        }
    }}
};

        std::string bodyStr = body.dump();

        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
       

        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, bodyStr.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);
        res = curl_easy_perform(curl);

        curl_easy_cleanup(curl);
    }

    

    try
    {
        std::cout << "RAW AI RESPONSE:\n" << response << std::endl;
        auto parsed = json::parse(response);

        if (parsed.contains("candidates") &&
    parsed["candidates"].size() > 0 &&
    parsed["candidates"][0]["content"].contains("parts"))
        {
            return parsed["candidates"][0]["content"]["parts"][0]["text"].get<std::string>();
        }

        if (parsed.contains("error"))
        {
            return "Other"; // fallback category
        }
    }
    catch (...)
    {
        return "Other";
    }

    return "Other";
}