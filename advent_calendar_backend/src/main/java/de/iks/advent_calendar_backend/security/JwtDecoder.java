package de.iks.advent_calendar_backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import de.iks.advent_calendar_backend.config.JwtProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtDecoder {
	private final JwtProperties properties;
	public DecodedJWT decode(String token) {
		return JWT.require(Algorithm.HMAC256(properties.getSecretKey()))
				.build()
				.verify(token);
	}
}
