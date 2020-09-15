package com.vieira.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vieira.demo.entities.Record;

public interface RecordRepository extends JpaRepository<Record, Long> {

}
