package com.urs.spellit.common.util;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class StatusCodeGeneratorUtils {

    public Map<String, Object> checkResultByObject(Object result) {
        Map<String, Object> res = new HashMap<>();
        res.put("result", result);
        if(result == null) {
            res.put("code", 0);
        }else {
            res.put("code", 1);
        }
        return res;
    }

    public Map<String, Object> checkResultByNumber(Long result) {
        Map<String, Object> res = new HashMap<>();
        res.put("result", result);
        if(result <= 0) {
            res.put("code", 0);
        }else {
            res.put("code", 1);
        }
        return res;
    }
    public Map<String, Object> checkResultByNumber(int result) {
        Map<String, Object> res = new HashMap<>();
        res.put("result", result);
        if(result == 0) {
            res.put("code", 0);
        }else {
            res.put("code", 1);
        }
        return res;
    }

    public Map<String, Object> checkResultByList(List result) {
        Map<String, Object> res = new HashMap<>();
        res.put("result", result);
        if(result == null) {
            res.put("code", 0);
        }else {
            res.put("code", 1);
        }
        return res;
    }
}
