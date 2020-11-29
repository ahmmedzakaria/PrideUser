package com.zakaria.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResourceController {
	
//	@RequestMapping("/user")
//	public ResponseEntity<Map<String, Object>>  getUser()
//	{
//		Map<String,Object> data = new HashMap<>();	
//		data.put("role","user");
//		System.out.println("user=========================");
//		return new ResponseEntity<Map<String,Object>>(data, HttpStatus.OK);
//	}
//	
	@RequestMapping("/admin")
	public String getAdmin()
	{
		return "Admin";
	}

}
