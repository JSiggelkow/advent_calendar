package de.iks.advent_calendar_backend.rest.service;

import de.iks.advent_calendar_backend.dao.DoorContentRepo;
import de.iks.advent_calendar_backend.entity.DoorContent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoorContentService {

	@Autowired
	private DoorContentRepo doorContentRepo;

	public List<DoorContent> getAllDoorContents() {
		return doorContentRepo.findAll();
	}

	public DoorContent getDoorContentById(int id) {
		return doorContentRepo.findById(id).orElse(null);
	}

	public DoorContent createDoorContent(DoorContent doorContent) {
		return doorContentRepo.save(doorContent);
	}

	public void deleteDoorContent(int id) {
		doorContentRepo.deleteById(id);
	}
}
