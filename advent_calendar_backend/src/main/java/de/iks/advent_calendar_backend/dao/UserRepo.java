package de.iks.advent_calendar_backend.dao;

import de.iks.advent_calendar_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {
}
