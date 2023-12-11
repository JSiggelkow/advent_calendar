package de.iks.advent_calendar_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

	@Column(name = "door_ids")
	private int[] doorIds;

}
