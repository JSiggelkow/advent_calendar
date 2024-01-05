package de.iks.advent_calendar_backend.dao;

import de.iks.advent_calendar_backend.entity.OpenedDoors;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface OpenedDoorsRepo extends JpaRepository<OpenedDoors, Integer> {

	@Transactional
	@Modifying
	@Query(value = "UPDATE opened_doors SET door_ids = array_append(door_ids, :newDoors) WHERE user_id = :userId", nativeQuery = true)
	void addOpenedDoorsForUser(@Param("userId") int userId, @Param("newDoors") List<Integer> newDoors);

	boolean existsByUserId(long userId);

	@Query(value = "SELECT unnest(door_ids) FROM opened_doors WHERE user_id = :userId", nativeQuery = true)
	List<Integer> findDoorIdsByUserId(@Param("userId") int userId);
}

