package com.spring.app.security.jwt;

import io.jsonwebtoken.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@Component
@Log
public class JwtProvider {
    private static final int TOKEN_EXPIRE_DAYS = 15;

    @Value("${jwt.token.secret}")
    private String jwtSecret;
    @Value("${jwt.token.expired}")
    private Long validInMillis;

    public String generateToken(String userName) {
        Date date = Date.from(LocalDate.now().plusDays(TOKEN_EXPIRE_DAYS).atStartOfDay(ZoneId.systemDefault()).toInstant());

        return Jwts.builder()
                .setSubject(userName)
                .setExpiration(date)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);

            return true;
        } catch (ExpiredJwtException expEx) {
            log.severe("Token expired");
        } catch (UnsupportedJwtException unsEx) {
            log.severe("Unsupported jwt");
        } catch (MalformedJwtException mjEx) {
            log.severe("Malformed jwt");
        } catch (SignatureException sEx) {
            log.severe("Invalid signature");
        } catch (Exception e) {
            log.severe("invalid token");
        }
        return false;
    }

    public String getUserNameFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();

        return claims.getSubject();
    }
}
