package com.capfood.elef.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capfood.elef.entities.Order;


public interface OrderRepository extends JpaRepository<Order, Integer>{

//	To check if the order table is empty
	@Query("SELECT count(o) from Order o")
	public Long getCountOfOrder();
	
//  To find the max orderId in the order table to add a new order with the orderId next to the max id
	@Query("SELECT max(o.orderId) from Order o")
	public int getMaxOfOrderId();

	
	
	@Query("SELECT o from Order o where o.orderId=:orderId")
	public List<Order> trackAnOrder(@Param("orderId") int orderId);
	
	@Query("select order from Order order where order.orderId=:orderId")
	public List<Order> getOrders(@Param("orderId") int orderId);
	
	@Query("SELECT max(o.id) from Order o")
	public int getMaxOfPrimaryOrderId();
	
}
