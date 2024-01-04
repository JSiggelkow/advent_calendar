package de.iks.advent_calendar_backend.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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
	@Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Username must contain only letters, numbers, and underscores")
	@Size(min = 3, max = 20, message = "Username must be between 3 and 30 characters")
	private String username;

	@Column
	@NotEmpty(message = "Password must not be empty")
	@NotNull(message = "Password must not be null")
	@Pattern(regexp = "^\\S+$", message = "Password must not contain spaces")
	@Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()_+{}\\[\\]:;<>,.?/~\\\\-]*$", message = "Password may only consist of letters, numbers or the following special characters: !@#$%^&*()_+{}[]:;<>,.?/~\\-")
	@Size(min = 4, message = "Password must be at least 4 characters long")
	private String password;

	@Column
	private String role;

}
