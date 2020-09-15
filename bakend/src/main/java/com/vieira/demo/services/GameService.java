package com.vieira.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vieira.demo.dto.GameDTO;
import com.vieira.demo.entities.Game;
import com.vieira.demo.repositories.GameRepository;

@Service
public class GameService {

	@Autowired
	private GameRepository gameRepository;

	/**/
	@Transactional(readOnly = true)
	public List<GameDTO> findAll() {
		List<Game> list = gameRepository.findAll();
		return list.stream().map(x -> new GameDTO(x)).collect(Collectors.toList());
	}

}
