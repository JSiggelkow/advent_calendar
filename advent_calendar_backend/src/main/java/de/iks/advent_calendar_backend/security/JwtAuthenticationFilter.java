package de.iks.advent_calendar_backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	private final JwtDecoder jwtDecoder;
	private final JwtToPrincipalConverter jwtToPrincipalConverter;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		extractTokenFromRequest(request)
				.map(jwtDecoder::decode)
				.map(jwtToPrincipalConverter::convert)
				.map(UserPrincipalAuthenticationToken::new)
				.ifPresent(authentication -> SecurityContextHolder.getContext().setAuthentication(authentication));
		filterChain.doFilter(request,response);
	}

	public Optional<String> extractTokenFromRequest(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if ("accessToken".equals(cookie.getName())) {
					return Optional.of(cookie.getValue());
				}
			}
		}
		return Optional.empty();
	}
}
