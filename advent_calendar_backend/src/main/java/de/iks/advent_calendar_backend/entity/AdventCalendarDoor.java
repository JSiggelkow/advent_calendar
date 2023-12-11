package de.iks.advent_calendar_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;

@Entity
@Table(name = "advent_calendar_door")
@NoArgsConstructor
@Getter
@Setter
public class AdventCalendarDoor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int door_id;
	@Column
	private int door_number;
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date opening_date;

}
