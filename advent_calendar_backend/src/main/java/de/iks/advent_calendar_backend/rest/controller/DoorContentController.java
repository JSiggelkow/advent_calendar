package de.iks.advent_calendar_backend.rest.controller;

import de.iks.advent_calendar_backend.entity.DoorContent;
import de.iks.advent_calendar_backend.rest.service.DoorContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/door-contents")
public class DoorContentController {

	@Autowired
	private DoorContentService doorContentService;

	@GetMapping
	public List<DoorContent> getAllDoorContents() {
		return doorContentService.getAllDoorContents();
	}

	@GetMapping("/{id}")
	public ResponseEntity<DoorContent> getDoorContentById(@PathVariable int id) {
		DoorContent doorContent = doorContentService.getDoorContentById(id);
		return ResponseEntity.ok(doorContent);
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