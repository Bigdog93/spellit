package com.urs.spellit.common.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class TokenUtils {

    Logger log = LoggerFactory.getLogger(TokenUtils.class);

    @Value("${secret.key}")
    String secretKey;
    public Long getUserIdFromHeader(HttpHeaders requestHeader) {
        try {
            String token = requestHeader.getFirst("Authorization");
            log.info("token in TokenUtils : " + token);
            if(token.substring(0, 6).equals("Bearer")) { // swagger 테스트 용
                token = token.substring("Bearer ".length());
            }
            Claims claim = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
            Long userId = claim.get("user_id", Long.class);
            return userId;
        } catch(Exception e) {
            return -1l;
        }
    }
}
