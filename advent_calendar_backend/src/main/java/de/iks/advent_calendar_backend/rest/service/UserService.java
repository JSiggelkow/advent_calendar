package de.iks.advent_calendar_backend.rest.service;

import de.iks.advent_calendar_backend.dao.UserRepo;
import de.iks.advent_calendar_backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
	@Autowired
	private UserRepo userRepo;

	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	public User getUserById(int id) {
		return userRepo.findById(id).orElse(null);
	}

	public User createUser(User user) {
		return userRepo.save(user);
	}

	public void deleteUser(int id) {
		userRepo.deleteById(id);
	}
}
