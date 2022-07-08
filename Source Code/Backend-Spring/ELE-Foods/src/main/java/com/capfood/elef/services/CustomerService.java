package com.capfood.elef.services;

import java.util.List;
import java.util.Set;

import com.capfood.elef.entities.Address;
import com.capfood.elef.entities.BranchDto;
import com.capfood.elef.entities.CarryBox;
import com.capfood.elef.entities.Category;
import com.capfood.elef.entities.Item;
import com.capfood.elef.entities.Order;
import com.capfood.elef.entities.SubCategory;
import com.capfood.elef.entities.User;
import com.capfood.elef.exceptions.OrderContainsInactiveItemsException;
import com.capfood.elef.exceptions.OutOfLocationRangeException;
import com.capfood.elef.exceptions.ResourceNotFoundException;

public interface CustomerService {

	public List<Item> getABranchItems(int branchId) throws ResourceNotFoundException;
	public List<Category> getABranchCategories(int branchId) throws ResourceNotFoundException;
	public List<SubCategory> getABranchSubCategories(int branchId);
	public CarryBox getACarryBoxDetails(String emailId) throws ResourceNotFoundException;
	public List<Address> getAnUserAdresses(String emailId) throws ResourceNotFoundException;
	public boolean addANewAddress(String emailId,Address address);
	public boolean deleteAnAddress(int addressId);
	public List<Order> getAnUserOrders(String emailId) throws ResourceNotFoundException;
	public int placeANewOrder(String emailId,int branchId,int addressId) throws ResourceNotFoundException,OutOfLocationRangeException,OrderContainsInactiveItemsException;
	public List<Order> trackAnOrder(int orderId)throws ResourceNotFoundException;
	public boolean addItemToCarryBox(String emailId, int itemId);
	public boolean deleteACarryBoxItem(String emailId,int itemId);
	public boolean updateACarryBoxItem(String emailId,int itemId,int quantity);
	public Set<Item> searchItems(int branchId,String searchText);
	public boolean clearACarryBox(String emailId);
	public User getAnUserDetails(String emailId);
	boolean UpdateAnAddress(String emailId, Address address) throws ResourceNotFoundException;
	public List<BranchDto> getAllBranches();
	
}
