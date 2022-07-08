package com.capfood.elef.dao;


import java.util.List;

import com.capfood.elef.entities.Address;
import com.capfood.elef.entities.Branch;
import com.capfood.elef.entities.CarryBox;
import com.capfood.elef.entities.Category;
import com.capfood.elef.entities.Item;
import com.capfood.elef.entities.Order;
import com.capfood.elef.entities.User;

public interface CustomerDao {

	public int generateAddressId();
	public int generateOrderId();
	public int generatePrimaryIdForOrder();
	public Branch getABranchDetails(int branchId);
	public Category getACategoryDetails(int categoryId);
	public CarryBox getACarryBoxDetails(int carryBoxId);
	public User getAnUserDetails(String emailId);
	public Address getAnAddressDetails(int addressId);
	public boolean addANewAddress(Address address);
	public boolean updateAnAddress(Address address);
	public boolean deleteAnAddress(int addressId);
	public void placeAnOrder(Order order);
	public List<Order> getAnOrderDetails(int orderId);
	public Item getAnItemDetails(int itemId);
	public void updateCarryBox(CarryBox carryBox);
	public List<Branch> getAllBranches();
	
}
