package de.iks.advent_calendar_backend.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "advent_calendar_user")
@NoArgsConstructor
@Getter
@Setter
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Long user_id;
	@Column
	@NotEmpty(message = "Username must not be empty")
	@NotNull(message = "Username must not be null")
	private String username;
	@Column
	@NotEmpty(message = "Password must not be empty")
	@NotNull(message = "Password must not be null")
	@Size(min = 4, message = "Password must be at least 4 characters long")
	private String password;
	@Column
	private String role;

}
