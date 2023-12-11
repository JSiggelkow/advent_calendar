package de.iks.advent_calendar_backend.rest.controller;

import de.iks.advent_calendar_backend.entity.AdventCalendarDoor;
import de.iks.advent_calendar_backend.rest.service.AdventCalendarDoorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendar-doors")
public class AdventCalendarDoorController {
	@Autowired
	private AdventCalendarDoorService adventCalendarDoorService;

	@GetMapping
	public List<AdventCalendarDoor> getAllDoors() {
		return adventCalendarDoorService.getAllDoors();
	}

	@GetMapping("/{id}")
	public ResponseEntity<AdventCalendarDoor> getDoorById(@PathVariable int id) {
		AdventCalendarDoor door = adventCalendarDoorService.getDoorById(id);
		return ResponseEntity.ok(door);
	}

	@PostMapping
	public ResponseEntity<AdventCalendarDoor> createDoor(@RequestBody AdventCalendarDoor door) {
		AdventCalendarDoor createdDoor = adventCalendarDoorService.createDoor(door);
		return new ResponseEntity<>(createdDoor, HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteDoor(@PathVariable int id) {
		adventCalendarDoorService.deleteDoor(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}

