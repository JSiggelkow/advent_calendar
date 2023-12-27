package de.iks.advent_calendar_backend.rest.service;

import de.iks.advent_calendar_backend.security.JwtIssuer;
import de.iks.advent_calendar_backend.security.UserPrincipal;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
	private final JwtIssuer jwtIssuer;
	private final AuthenticationManager authenticationManager;

	public void attemptLogin(HttpServletResponse response, String username, String password) {
		var authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(username, password)
		);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		var principal = (UserPrincipal) authentication.getPrincipal();

		var roles = principal.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.toList();

		var token = jwtIssuer.issue(principal.getUserId(), principal.getUsername(), roles);

		ResponseCookie cookie = ResponseCookie.from("accessToken", token)
			.httpOnly(true)
			.sameSite("Lax")
			.path("/")
			.maxAge(60)
			.build();
		response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
	}

	public void attemptLogout(HttpServletResponse response) {
		ResponseCookie cookie = ResponseCookie.from("accessToken", null)
				.httpOnly(true)
				.sameSite("Lax")
				.path("/")
				.maxAge(0)
				.build();
		response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
	}
}
