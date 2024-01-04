package de.iks.advent_calendar_backend.config;

import de.iks.advent_calendar_backend.security.CustomUserDetailsService;
import de.iks.advent_calendar_backend.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	private final CustomUserDetailsService customUserDetailsService;

	@Bean
	public SecurityFilterChain applicationSecurity(HttpSecurity http) throws Exception {
		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		http
				.csrf(AbstractHttpConfigurer::disable)
				.sessionManagement(configurer -> configurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.formLogin(AbstractHttpConfigurer::disable)
				.securityMatcher("/api/**")
				.authorizeHttpRequests(registry -> registry
						.requestMatchers("/api/auth/login").permitAll()
						.requestMatchers("/api/auth/logout").permitAll()
						.requestMatchers("/api/users/find").permitAll()
						.requestMatchers("/api/users").permitAll()
						.requestMatchers(HttpMethod.POST, "/api/**").hasRole("ADMIN")
						.requestMatchers(HttpMethod.GET, "/api/**").hasAnyRole("CONSUMER", "ADMIN")
						.requestMatchers(HttpMethod.PUT, "/api/**").hasRole("ADMIN")
						.requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("ADMIN")
						.anyRequest().authenticated()
				);

		return http.build();
	}


	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("http://localhost:4200"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/api/**", configuration);

		return source;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		var builder = http.getSharedObject(AuthenticationManagerBuilder.class);
		builder
				.userDetailsService(customUserDetailsService)
				.passwordEncoder(passwordEncoder());
		return builder.build();
	}

	@Bean
	public WebMvcConfigurer corsConfig() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:4200")
						.allowedMethods(
								HttpMethod.GET.name(),
								HttpMethod.PUT.name(),
								HttpMethod.POST.name(),
								HttpMethod.DELETE.name()
						)
						.allowedHeaders(
								HttpHeaders.CONTENT_TYPE,
								HttpHeaders.AUTHORIZATION
						)
						.allowCredentials(true);
			}
		};
	}
}
