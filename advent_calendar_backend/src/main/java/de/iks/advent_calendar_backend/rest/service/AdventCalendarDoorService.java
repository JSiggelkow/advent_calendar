package de.iks.advent_calendar_backend.rest.service;

import de.iks.advent_calendar_backend.dao.AdventCalendarDoorRepo;
import de.iks.advent_calendar_backend.entity.AdventCalendarDoor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdventCalendarDoorService {
	@Autowired
	private AdventCalendarDoorRepo adventCalendarDoorRepo;

	public List<AdventCalendarDoor> getAllDoors() {
		return adventCalendarDoorRepo.findAll();
	}

	public AdventCalendarDoor getDoorById(int id) {
		return adventCalendarDoorRepo.findById(id).orElse(null);
	}

	public AdventCalendarDoor createDoor(AdventCalendarDoor door) {
		return adventCalendarDoorRepo.save(door);
	}

	public void deleteDoor(int id) {
		adventCalendarDoorRepo.deleteById(id);
	}
}
