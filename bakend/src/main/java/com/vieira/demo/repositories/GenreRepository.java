package com.vieira.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vieira.demo.entities.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {

}
