package de.iks.advent_calendar_backend.rest.service;

import de.iks.advent_calendar_backend.model.LoginResponse;
import de.iks.advent_calendar_backend.security.JwtIssuer;
import de.iks.advent_calendar_backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
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

	public LoginResponse attemptLogin(String username, String password) {
		var authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(username, password)
		);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		var principal = (UserPrincipal) authentication.getPrincipal();

		var roles = principal.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.toList();

		var token = jwtIssuer.issue(principal.getUserId(), principal.getUsername(), roles);
		return LoginResponse.builder()
				.accessToken(token)
				.build();
	}
}
