package de.iks.advent_calendar_backend.rest.service;


import de.iks.advent_calendar_backend.dao.OpenedDoorsRepo;
import de.iks.advent_calendar_backend.entity.OpenedDoors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OpenedDoorsService {

	@Autowired
	private OpenedDoorsRepo openedDoorsRepo;

	public List<OpenedDoors> getAllOpenedDoors() {
		return openedDoorsRepo.findAll();
	}

	public OpenedDoors getOpenedDoorsById(int id) {
		return openedDoorsRepo.findById(id).orElse(null);
	}

	public OpenedDoors createOpenedDoors(OpenedDoors openedDoors) {
		return openedDoorsRepo.save(openedDoors);
	}

	public void deleteOpenedDoors(int id) {
		openedDoorsRepo.deleteById(id);
	}

	public void addOpenedDoorsForUser(int userId, List<Integer> newDoors) {
		openedDoorsRepo.addOpenedDoorsForUser(userId, newDoors);
	}

	public boolean existsByUserId(int userId) {
		return openedDoorsRepo.existsByUserId(userId);
	}

	public OpenedDoors createNewOpenedDoorsByUserId(int userId) {
		var openedDoors = new OpenedDoors();
		openedDoors.setUserId(userId);
		return openedDoors;
	}

	public List<Integer> findDoorIdsByUserId(int userId) {
		return openedDoorsRepo.findDoorIdsByUserId(userId);
	}
}
