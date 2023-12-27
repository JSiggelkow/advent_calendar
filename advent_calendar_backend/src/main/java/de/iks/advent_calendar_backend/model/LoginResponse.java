package de.iks.advent_calendar_backend.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponse {
	private final String accessToken;
}
