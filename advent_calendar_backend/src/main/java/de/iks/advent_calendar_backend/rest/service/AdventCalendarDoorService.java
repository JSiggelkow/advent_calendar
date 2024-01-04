package de.iks.advent_calendar_backend.rest.service;

import de.iks.advent_calendar_backend.dao.AdventCalendarDoorRepo;
import de.iks.advent_calendar_backend.entity.AdventCalendarDoor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdventCalendarDoorService {
	@Autowired
	private AdventCalendarDoorRepo adventCalendarDoorRepo;

	public List<AdventCalendarDoor> getAllDoors() {
		List<Integer> orderIndices = List.of(2, 14, 6, 18, 9, 21, 1, 13, 5, 17, 8, 20, 0, 12, 4, 16, 7, 19, 10, 22, 3, 15, 11, 23);

		List<AdventCalendarDoor> allDoors = adventCalendarDoorRepo.findAll();

		List<AdventCalendarDoor> sortedDoors = new ArrayList<>(allDoors.size());
		orderIndices.forEach(index -> sortedDoors.add(allDoors.get(index)));

		return sortedDoors;
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
