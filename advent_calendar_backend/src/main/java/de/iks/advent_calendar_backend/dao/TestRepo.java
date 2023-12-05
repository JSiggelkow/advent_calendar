package de.iks.advent_calendar_backend.dao;

import de.iks.advent_calendar_backend.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepo extends JpaRepository<Test,Integer> {
}