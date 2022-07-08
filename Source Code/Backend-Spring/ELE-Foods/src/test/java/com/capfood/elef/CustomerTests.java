package com.capfood.elef;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import com.capfood.elef.dao.CustomerDao;
import com.capfood.elef.entities.Address;
import com.capfood.elef.entities.CarryBox;
import com.capfood.elef.entities.Category;
import com.capfood.elef.entities.Item;
import com.capfood.elef.exceptions.OrderContainsInactiveItemsException;
import com.capfood.elef.exceptions.OutOfLocationRangeException;
import com.capfood.elef.exceptions.ResourceNotFoundException;
import com.capfood.elef.services.CustomerService;

@SpringBootTest
@Transactional
@Rollback(true)
public class CustomerTests {
	
	@Autowired
	public CustomerService service;
	public CustomerDao dao;

	
	
	/* Method: test1
	 * Description: Testing getAllCategories function to check whether all the available categories are retrievable or not in a particular branch
	 * Expected Output: ResourceNotFoundException
	 * Status:Success
	 */
	@Test
	public void test1() throws Exception{
	
	//Checking the function with a wrong branch id
		assertThrows(ResourceNotFoundException.class, ()->{
			service.getABranchCategories(1999);		//No branch exists with id=1999, so it return exception
		});
		
		
		List<Category> categoryList=service.getABranchCategories(2001);
		
	//Checking whether any Categories available or not in this branch
		assertEquals(true, categoryList.size()>0);
				
	}
	
	
	
	/* Method: test2
	 * Description: Testing getAllItems function to check whether all the available items are retrievable or not in a particular branch
	 * Expected Output: The itemId of last element in the list should be 2001
	 * Status:Success
	 */
	@Test
	public void test2() {

	//Checking the function with a wrong branch id
		assertThrows(ResourceNotFoundException.class, ()->{
			service.getABranchItems(1999);		//No branch exists with id=1999, so it return exception
		});
		
		
		List<Item> itemList=service.getABranchItems(2001);
		
	//Checking whether any items available or not in this branch
		assertEquals(true, itemList.size()>0);
		
	}
	
	
	
	/* Method: test3
	 * Description: Testing various operations on address of a user like add,delete and retrieve
	 * Expected Output: Add & Delete operations should return true and get function should not return an empty list
	 * Status:Success
	 */
	@Test
	public void test3() {
		Address address=new Address();
		address.setCity("Tirupati");
		address.setLandmark("Opp. to Srinivasam");
		address.setLine1("7-098A");
		address.setLine2("Gandhi Street");
		address.setMobileNumber("9807654321");
		address.setName("Damu");
	
		
	//Adding a new address
		assertEquals(true, service.addANewAddress("sriharsha.p158@gmail.com", address));
		
	//Checking whether the address is added and list of addresses is not empty
		assertEquals(true, service.getAnUserAdresses("sriharsha.p158@gmail.com").size()>0);
		
	//Deleting an existing address
		assertEquals(true,service.deleteAnAddress(3003));
		
	}
	
	
	
	/* Method: test4
	 * Description: Testing various operations on Carry Box of a user like add,remove,update and retrieve
	 * Expected Output: Add,Remove & Update operations should return true and get function should not return an empty list
	 * Status:Success
	 */
	@Test
	public void test4() throws Exception{
		CarryBox carryBox=service.getACarryBoxDetails("aar@gmail.com");
		
	//Initially checking the list of items in the carry box
		assertEquals(0, carryBox.getItemlist().size());
		
	
	//Adding a new item to Carry Box and checking the list of items in the carry box
		assertEquals(true, service.addItemToCarryBox("aar@gmail.com", 2001));
		carryBox=service.getACarryBoxDetails("aar@gmail.com");
		assertEquals(1, carryBox.getItemlist().size());
		
		
	//Updating the quantity of an item in the Carry Box
		assertEquals(true, service.updateACarryBoxItem("aar@gmail.com", 2001,2));
		carryBox=service.getACarryBoxDetails("aar@gmail.com");
		assertEquals(2, carryBox.getItemlist().get(0).getQuantity());
		
	
	//Removing an item in the Carry Box
		assertEquals(true, service.deleteACarryBoxItem("aar@gmail.com", 2001));
		carryBox=service.getACarryBoxDetails("aar@gmail.com");
		assertEquals(0, carryBox.getItemlist().size());
			
	}
	
	
	
	/* Method: test5
	 * Description: Testing placeAnOrder function
	 * Expected Output: Should return True when all the conditions are satisfied else should return Exceptions
	 * Status:Success
	 */
	@Test
	public void test5() throws Exception{
		CarryBox carryBox=service.getACarryBoxDetails("aar@gmail.com");
		
		
	//Initially checking the list of Items in the Carry Box
		assertEquals(0, carryBox.getItemlist().size());

	
	//Throws exception as there are no items in the Carry Box
		assertThrows(ResourceNotFoundException.class, ()->{
			service.placeANewOrder("aar@gmail.com", 2001, 3007);
		});
		
		
	//Adding items to the Carry Box
		assertEquals(true, service.addItemToCarryBox("aar@gmail.com", 2001));
		assertEquals(true, service.addItemToCarryBox("aar@gmail.com", 2004));	//Inactive Item
		
		
		
	//deleting the inactive item
		service.deleteACarryBoxItem("aar@gmail.com", 2004);
		
		
	//Throws exception when an order is placed to another city away from the branch
		assertThrows(OutOfLocationRangeException.class, ()->{
			service.placeANewOrder("aar@gmail.com", 2001, 3006);
		});
		
		
		service.addItemToCarryBox("sriharsha.p158@gmail.com", 2052);
		service.placeANewOrder("sriharsha.p158@gmail.com", 2004, 3008);
			
	}
	
	
	
	/* Method: test6
	 * Description: Testing searchItems function to search for the desired items and categories
	 * Expected Output: a set of items related to the search text
	 * Status:Success
	 */
	@Test
	public void test6(){
	
		Set<Item> items= new HashSet<>();
		items=service.searchItems(2001, "Chicken");		

	//Checking whether the set contains items related to the search text or not
		for(Item i:items) {
			assertEquals(true, i.getItemName().contains("Chicken"));
		}
				
	}

}







