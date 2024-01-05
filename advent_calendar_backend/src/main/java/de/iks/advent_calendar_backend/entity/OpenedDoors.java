package de.iks.advent_calendar_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "opened_doors")
@NoArgsConstructor
@Getter
@Setter
public class OpenedDoors {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "opened_doors_id")
	private int openedDoorsId;

	@Column(name = "user_id")
	private int userId;

	@ElementCollection
	@CollectionTable(name = "door_ids", joinColumns = @JoinColumn(name = "opened_doors_id"))
	@Column(name = "door_id")
	private List<Integer> doorIds;

}
