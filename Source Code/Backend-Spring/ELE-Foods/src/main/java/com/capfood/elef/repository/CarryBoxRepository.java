package com.capfood.elef.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.capfood.elef.entities.CarryBox;

public interface CarryBoxRepository extends JpaRepository<CarryBox, Integer> {
	
	@Query("select count(carryBox) from CarryBox carryBox")
	public Long getCarryBoxCount();
	
	@Query("select max(carryBox.boxId) from CarryBox carryBox")
	public int getMaxBoxId();

}
