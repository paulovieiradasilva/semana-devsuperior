package com.vieira.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vieira.demo.entities.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

}
