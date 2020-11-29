package com.zakaria.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {
	
	
	@GetMapping("/")
	public String home() { 
		return "index.html";
	}

	
	@GetMapping("/signup")
	public String signup() { 
		return "signup.html";
	}
	

	@GetMapping("/user")
	public String getUser() { 
		return "user.html";
	}
}

