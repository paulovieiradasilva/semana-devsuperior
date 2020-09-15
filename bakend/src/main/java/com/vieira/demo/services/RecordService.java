package com.vieira.demo.services;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vieira.demo.dto.RecordDTO;
import com.vieira.demo.dto.RecordInsertDTO;
import com.vieira.demo.entities.Game;
import com.vieira.demo.entities.Record;
import com.vieira.demo.repositories.GameRepository;
import com.vieira.demo.repositories.RecordRepository;

@Service
public class RecordService {

	@Autowired
	private RecordRepository recordRepository;
	
	@Autowired
	private GameRepository gameRepository;

	/**/
	@Transactional
	public RecordDTO inset(RecordInsertDTO objDTO) {
		Record entity = new Record();
		entity.setName(objDTO.getName());
		entity.setAge(objDTO.getAge());
		entity.setMoment(Instant.now());
		
		Game game = gameRepository.getOne(objDTO.getGameId());
		entity.setGame(game);
		entity = recordRepository.save(entity);
		
		return new RecordDTO(entity);
	}

}
