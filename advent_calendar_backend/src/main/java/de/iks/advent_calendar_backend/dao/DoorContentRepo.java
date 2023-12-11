package de.iks.advent_calendar_backend.dao;

import de.iks.advent_calendar_backend.entity.DoorContent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoorContentRepo extends JpaRepository<DoorContent,Integer> {
}
