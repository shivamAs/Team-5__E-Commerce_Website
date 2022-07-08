package com.capfood.elef.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.capfood.elef.entities.Address;
import com.capfood.elef.entities.Branch;
import com.capfood.elef.entities.CarryBox;
import com.capfood.elef.entities.Category;
import com.capfood.elef.entities.Item;
import com.capfood.elef.entities.Order;
import com.capfood.elef.entities.User;
import com.capfood.elef.repository.AddressRepository;
import com.capfood.elef.repository.BranchRepository;
import com.capfood.elef.repository.CarryBoxRepository;
import com.capfood.elef.repository.CategoryRepository;
import com.capfood.elef.repository.ItemRepository;
import com.capfood.elef.repository.OrderRepository;
import com.capfood.elef.repository.UserRepository;

@Repository
@Transactional
public class CustomerDaoImpl implements CustomerDao {

	@Autowired
	private BranchRepository branchRepository;

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired 
	private CategoryRepository categoryRepository;
	
	@Autowired
	private ItemRepository itemRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private CarryBoxRepository carryBoxRepository;
	
	
	@Override
	public int generateAddressId() {
		int tempId = 1000;
		long count = addressRepository.getCountOfAddress();
		if (count > 0) {
			int temp = addressRepository.getMaxOfAddressId();
			tempId = temp+1;
		}
		return tempId;
	}

	@Override
	public int generatePrimaryIdForOrder() {
		int tempId = 100;
		long count = orderRepository.getCountOfOrder();
		if (count > 0) {
			int temp = orderRepository.getMaxOfPrimaryOrderId();
			tempId = temp+1;
		}
		return tempId;
	}
	
	@Override
	public int generateOrderId() {
		int tempId = 8000;
		long count = orderRepository.getCountOfOrder();
		if (count > 0) {
			int temp = orderRepository.getMaxOfOrderId();
			tempId = temp+1;
		}
		return tempId;
	}		
	
	@Override
    public Branch getABranchDetails(int branchId){
		return branchRepository.getOne(branchId);
	}

	@Override
	public Category getACategoryDetails(int categoryId) {
		return categoryRepository.getOne(categoryId);
	}
	
	@Override
	public CarryBox getACarryBoxDetails(int carryBoxId) {
		return carryBoxRepository.getOne(carryBoxId);
	}

	@Override
	public User getAnUserDetails(String emailId) {
		return userRepository.getOne(emailId);
	}

	@Override
	public Address getAnAddressDetails(int addressId) {
		return addressRepository.getOne(addressId);
	}
	
	@Override
	public boolean addANewAddress(Address address) {
		try {
		     addressRepository.save(address);
		     return true;
		}
		catch(Exception ex) {
			return false;
		}
	}

	@Override
	public boolean deleteAnAddress(int addressId) {
		try {
		addressRepository.deleteById(addressId);
		return true;
		}
		catch(Exception ex) {
			return false;
		}
	}
	
	@Override
	public void placeAnOrder(Order order) {
		orderRepository.save(order);
	}
	
	@Override
	public List<Order> getAnOrderDetails(int orderId) {
		return orderRepository.getOrders(orderId);
	}
	
	@Override
	public Item getAnItemDetails(int itemId) {
		return itemRepository.getOne(itemId);
	}
	
	@Override
	public void updateCarryBox(CarryBox carryBox) {
		carryBoxRepository.save(carryBox);
	}

	@Override
	public boolean updateAnAddress(Address address) {
		addressRepository.save(address);
		return false;
	}

	@Override
	public List<Branch> getAllBranches() {
		return branchRepository.findAll();
	}
}
