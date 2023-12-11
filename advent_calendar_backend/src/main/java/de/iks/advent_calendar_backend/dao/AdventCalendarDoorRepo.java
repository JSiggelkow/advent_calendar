package de.iks.advent_calendar_backend.dao;

import de.iks.advent_calendar_backend.entity.AdventCalendarDoor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdventCalendarDoorRepo extends JpaRepository<AdventCalendarDoor, Integer> {
}
