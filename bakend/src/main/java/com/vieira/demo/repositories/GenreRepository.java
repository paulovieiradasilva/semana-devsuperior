package com.vieira.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vieira.demo.entities.Genre;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {

}
