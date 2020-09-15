package com.vieira.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vieira.demo.entities.Game;

public interface GameRepository extends JpaRepository<Game, Long> {

}
