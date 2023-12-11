package de.iks.advent_calendar_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "door_content")
@NoArgsConstructor
@Getter
@Setter
public class DoorContent {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "door_content_id")
	private int doorContentId;

	@Column(name = "door_id")
	private int doorId;

	@Column(name = "photo_link")
	private String photoLink;

	@Column(name = "text", columnDefinition = "TEXT")
	private String text;

	@Column(name = "video_link")
	private String videoLink;
}
