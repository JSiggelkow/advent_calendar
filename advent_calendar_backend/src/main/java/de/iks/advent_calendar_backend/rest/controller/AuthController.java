package de.iks.advent_calendar_backend.rest.controller;

import de.iks.advent_calendar_backend.model.LoginRequest;
import de.iks.advent_calendar_backend.model.LoginResponse;
import de.iks.advent_calendar_backend.security.JwtIssuer;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final JwtIssuer jwtIssuer;

	@PostMapping("/login")
	public LoginResponse login(@RequestBody @Validated LoginRequest request) {
		var token = jwtIssuer.issue(1L, request.getUsername(), List.of("USER"));
		return  LoginResponse.builder()
				.accessToken(token)
				.build();
	}
}
