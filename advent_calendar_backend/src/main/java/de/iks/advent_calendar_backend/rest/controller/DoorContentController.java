package de.iks.advent_calendar_backend.rest.controller;

import de.iks.advent_calendar_backend.entity.AdventCalendarDoor;
import de.iks.advent_calendar_backend.entity.DoorContent;
import de.iks.advent_calendar_backend.rest.service.AdventCalendarDoorService;
import de.iks.advent_calendar_backend.rest.service.DoorContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/door-contents")
public class DoorContentController {

	@Autowired
	private DoorContentService doorContentService;

	@Autowired
	private AdventCalendarDoorService doorService;

	@GetMapping
	public List<DoorContent> getAllDoorContents() {
		return doorContentService.getAllDoorContents();
	}

	@GetMapping("/{id}")
	public ResponseEntity<DoorContent> getDoorContentById(@PathVariable int id) {
		DoorContent doorContent = doorContentService.getDoorContentById(id);
		return ResponseEntity.ok(doorContent);
	}

	@GetMapping("/validate/{id}")
	public ResponseEntity<?> validateOpenDoorContent(@PathVariable int id) {
		DoorContent doorContent = doorContentService.getDoorContentById(id);
		int doorId = doorContent.getDoorId();
		AdventCalendarDoor door = doorService.getDoorById(doorId);
		Date currentDate = new Date();
		if (door.getOpening_date().getTime() <= currentDate.getTime()) {
			return ResponseEntity.ok(doorContent);
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Door cannot get opened " + currentDate.toString() + " | " + door.getOpening_date().toString());
		}
	}

	@PostMapping
	public ResponseEntity<DoorContent> createDoorContent(@RequestBody DoorContent doorContent) {
		DoorContent createdDoorContent = doorContentService.createDoorContent(doorContent);
		return new ResponseEntity<>(createdDoorContent, HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteDoorContent(@PathVariable int id) {
		doorContentService.deleteDoorContent(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}