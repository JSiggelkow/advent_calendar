package de.iks.advent_calendar_backend.dao;

import de.iks.advent_calendar_backend.entity.OpenedDoors;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpenedDoorsRepo extends JpaRepository<OpenedDoors,Integer> {
}
