package de.iks.advent_calendar_backend.rest.controller;

import de.iks.advent_calendar_backend.model.LoginRequest;
import de.iks.advent_calendar_backend.model.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	@PostMapping("/login")
	public LoginResponse login(@RequestBody @Validated LoginRequest request) {
		return  LoginResponse.builder()
				.accessToken("bla bla bla")
				.build();
	}
}
