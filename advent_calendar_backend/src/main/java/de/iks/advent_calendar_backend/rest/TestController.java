package de.iks.advent_calendar_backend.rest;

import de.iks.advent_calendar_backend.dao.TestRepo;

import de.iks.advent_calendar_backend.entity.Test;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class TestController {

	private final TestRepo testRepository;

	@GetMapping("/test")
	public Iterable<Test> findAllTestEntity() {
		return this.testRepository.findAll();
	}

	@GetMapping("/test/{testId}")
	public Test findByIdTestEntity(@PathVariable int testId) {
		return testRepository.findById(testId).orElseThrow(RuntimeException::new);
	}

	@PostMapping("/test")
	public Test addOneTestEntity(@RequestBody Test testEntity) {
		return this.testRepository.save(testEntity);
	}

	@PutMapping("/test")
	public Test updateTestEntity(@RequestBody Test testEntity) {
		return testRepository.save(testEntity);
	}

	@DeleteMapping("/test/{testId}")
	public void deleteTestEntity(@PathVariable int testId) {

		testRepository.deleteById(testId);

	}

}