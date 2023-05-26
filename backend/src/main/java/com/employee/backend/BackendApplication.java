package com.employee.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.SpringVersion;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		System.out.println("Spring Core Version:- " + SpringVersion.getVersion());
		SpringApplication.run(BackendApplication.class, args);
	}

}
