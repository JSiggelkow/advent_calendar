package de.iks.advent_calendar_backend.rest.service;

import de.iks.advent_calendar_backend.dao.UserRepo;
import de.iks.advent_calendar_backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepo userRepo;
//	private final PasswordEncoder passwordEncoder;

	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	public User getUserById(Long id) {
		return userRepo.findById(id).orElse(null);
	}

	public User createUser(User user) {
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
//		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepo.save(user);
	}

	public void deleteUser(Long id) {
		userRepo.deleteById(id);
	}

	public Optional<User> findByUsername(String username) {
		return userRepo.findByUsername(username);
	}
}
