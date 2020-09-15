package com.vieira.demo.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vieira.demo.dto.RecordDTO;
import com.vieira.demo.dto.RecordInsertDTO;
import com.vieira.demo.services.RecordService;

@RestController
@RequestMapping(value = "/records")
public class RecordResource {
	
	@Autowired
	private RecordService recordService;
	
	@PostMapping
	public ResponseEntity<RecordDTO> insert(@RequestBody RecordInsertDTO objDTO) {
		RecordDTO newDTO = recordService.inset(objDTO);		
		return ResponseEntity.ok().body(newDTO);
	}

}
