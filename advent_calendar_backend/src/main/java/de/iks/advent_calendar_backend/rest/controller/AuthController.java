package de.iks.advent_calendar_backend.rest.controller;

import de.iks.advent_calendar_backend.model.LoginRequest;
import de.iks.advent_calendar_backend.model.LoginResponse;
import de.iks.advent_calendar_backend.security.JwtIssuer;
import de.iks.advent_calendar_backend.security.UserPrincipal;
import de.iks.advent_calendar_backend.security.UserPrincipalAuthenticationToken;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final JwtIssuer jwtIssuer;
	private final AuthenticationManager authenticationManager;

	@PostMapping(value = "/login")
	public LoginResponse login(@RequestBody @Validated LoginRequest request) {
		var authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
		);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		var principal = (UserPrincipal) authentication.getPrincipal();

		var roles = principal.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.toList();

		var token = jwtIssuer.issue(principal.getUserId(), principal.getUsername(), roles);
		return  LoginResponse.builder()
				.accessToken(token)
				.build();
	}

	@GetMapping("/secured")
	public String secured(@AuthenticationPrincipal UserPrincipal principal) {
		return "If you see this, then you're logged in as user: " + principal.getUsername()
				+ " User ID: " + principal.getUserId();
	}
}
