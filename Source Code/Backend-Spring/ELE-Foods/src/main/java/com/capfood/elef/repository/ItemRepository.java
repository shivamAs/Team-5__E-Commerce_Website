package com.capfood.elef.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.capfood.elef.entities.Item;

public interface ItemRepository extends JpaRepository<Item, Integer>{

	@Query("SELECT count(item) from Item item")
	public Long getCountOfItem();
	
	@Query("SELECT max(item.itemId) from Item item ")
	public int getMaxOfItemId();
	
	

}
