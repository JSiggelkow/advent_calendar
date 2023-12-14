package de.iks.advent_calendar_backend.security;

import de.iks.advent_calendar_backend.rest.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
	private final UserService userService;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		var user = userService.findByUsername(username).orElseThrow();
		return UserPrincipal.builder()
				.userId(user.getUser_id())
				.username(user.getUsername())
				.authorities(List.of(new SimpleGrantedAuthority(user.getRole())))
				.password(user.getPassword())
				.build();
	}
}
