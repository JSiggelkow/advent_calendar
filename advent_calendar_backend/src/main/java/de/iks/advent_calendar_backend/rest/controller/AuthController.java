package de.iks.advent_calendar_backend.rest.controller;

import de.iks.advent_calendar_backend.model.LoginRequest;
import de.iks.advent_calendar_backend.model.LoginResponse;
import de.iks.advent_calendar_backend.rest.service.AuthService;
import de.iks.advent_calendar_backend.security.JwtIssuer;
import de.iks.advent_calendar_backend.security.UserPrincipal;
import de.iks.advent_calendar_backend.security.UserPrincipalAuthenticationToken;
import jakarta.servlet.http.HttpServletResponse;
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

	private final AuthService authService;

	@PostMapping(value = "/login")
	public void login(HttpServletResponse response, @RequestBody @Validated LoginRequest request) {
		authService.attemptLogin(response, request.getUsername(),request.getPassword());
	}

	@GetMapping("/secured")
	public void secured(@AuthenticationPrincipal UserPrincipal principal) {

	}
}
