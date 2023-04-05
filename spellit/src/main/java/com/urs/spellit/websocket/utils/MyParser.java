package com.urs.spellit.websocket.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class MyParser {
    private final ObjectMapper mapper = new ObjectMapper();

    public Object getBackData(JsonElement data) throws JsonProcessingException {
        try{
            Object res = mapper.readValue(data.toString(), Object.class);
            return res;
        }catch (Exception e) {
            return null;
        }
    }
    public String getString(String key, JsonElement json) {
        JsonElement jsonElement = json.getAsJsonObject().get(key);
        if(jsonElement == null) {
            return null;
        }
        return jsonElement.getAsString();
    }
    public boolean getBoolean(String key, JsonElement json) {
        JsonElement jsonElement = json.getAsJsonObject().get(key);
        if(jsonElement == null || jsonElement.isJsonNull()) {
            return false;
        }
        return jsonElement.getAsBoolean();
    }
    public long getLong(String key, JsonElement json) {
        JsonElement jsonElement = json.getAsJsonObject().get(key);
        if(jsonElement == null || jsonElement.isJsonNull()) {
            return 0;
        }
        return jsonElement.getAsLong();
    }
    public <T> T getObject(String key, JsonElement json, Class<T> type) throws JsonProcessingException {
        JsonElement jsonElement = json.getAsJsonObject().get(key);
        return mapper.readValue(jsonElement.toString(), type);
    }
    public <T> List<T> getList(String key, JsonElement json, Class<T> type) throws JsonProcessingException {
        List<T> list = new ArrayList<>();
        JsonArray jsonArray = json.getAsJsonObject().get(key).getAsJsonArray();
        if(jsonArray.isJsonNull()) return list;
        for(int i = 0; i < jsonArray.size(); i++) {
            list.add(mapper.readValue(jsonArray.get(i).toString(), type));
        }
        return list;
    }
}
