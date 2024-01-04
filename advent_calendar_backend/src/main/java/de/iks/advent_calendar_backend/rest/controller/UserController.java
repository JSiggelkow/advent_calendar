package de.iks.advent_calendar_backend.rest.controller;

import de.iks.advent_calendar_backend.entity.User;
import de.iks.advent_calendar_backend.rest.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		User user = userService.getUserById(id);
		return ResponseEntity.ok(user);
	}

	@GetMapping("/find")
	public ResponseEntity<Boolean> findByUsername(@RequestParam String username) {
		Optional<User> user = userService.findByUsername(username);
		return ResponseEntity.ok(user.isPresent());
	}

	@PostMapping
	public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
		userService.createUser(user);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable(name = "id") Long id) {
		userService.deleteUser(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}