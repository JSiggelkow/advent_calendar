package de.iks.advent_calendar_backend.rest.controller;


import de.iks.advent_calendar_backend.entity.OpenedDoors;
import de.iks.advent_calendar_backend.rest.service.JwtUserIssuerService;
import de.iks.advent_calendar_backend.rest.service.OpenedDoorsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/opened-doors")
public class OpenedDoorsController {

	@Autowired
	private OpenedDoorsService openedDoorsService;

	@Autowired
	private JwtUserIssuerService jwtUserIssuerService;

	@GetMapping
	public List<OpenedDoors> getAllOpenedDoors() {
		return openedDoorsService.getAllOpenedDoors();
	}

	@GetMapping("/{id}")
	public ResponseEntity<OpenedDoors> getOpenedDoorsById(@PathVariable int id) {
		OpenedDoors openedDoors = openedDoorsService.getOpenedDoorsById(id);
		return ResponseEntity.ok(openedDoors);
	}

	@PostMapping
	public ResponseEntity<OpenedDoors> createOpenedDoors(@RequestBody OpenedDoors openedDoors) {
		OpenedDoors createdOpenedDoors = openedDoorsService.createOpenedDoors(openedDoors);
		return new ResponseEntity<>(createdOpenedDoors, HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteOpenedDoors(@PathVariable int id) {
		openedDoorsService.deleteOpenedDoors(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PostMapping("/add-doors")
	public ResponseEntity<Void> addOpenedDoorsForUser(HttpServletRequest request, @RequestParam("newDoors") List<Integer> newDoors) {
		var userID =jwtUserIssuerService.test(request);
		openedDoorsService.addOpenedDoorsForUser(userID, newDoors);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
