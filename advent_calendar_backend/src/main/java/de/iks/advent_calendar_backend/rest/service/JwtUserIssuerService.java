package de.iks.advent_calendar_backend.rest.service;


import de.iks.advent_calendar_backend.security.JwtAuthenticationFilter;
import de.iks.advent_calendar_backend.security.JwtDecoder;
import de.iks.advent_calendar_backend.security.JwtToPrincipalConverter;
import de.iks.advent_calendar_backend.security.UserPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtUserIssuerService {

	private final JwtDecoder jwtDecoder;
	private final JwtToPrincipalConverter jwtToPrincipalConverter;
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	public int getUserIdFromJWT(HttpServletRequest request) {
		return jwtAuthenticationFilter.extractTokenFromRequest(request)
				.map(jwtDecoder::decode)
				.map(jwtToPrincipalConverter::convert)
				.map(UserPrincipal::getUserId)
				.orElseThrow(() -> new RuntimeException("Could not resolve userID"));
	}

}
