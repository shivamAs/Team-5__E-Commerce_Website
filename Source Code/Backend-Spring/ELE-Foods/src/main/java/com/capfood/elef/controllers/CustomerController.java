package com.capfood.elef.controllers;

import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
import com.capfood.elef.services.CustomerService;

@CrossOrigin
@RestController
@RequestMapping("/customer")
public class CustomerController {

    Logger logger = LoggerFactory.getLogger(CustomerController.class);
    
	@Autowired
	CustomerService service;
	
	
	
	/* Method:getABranchItems
	 * Type: GetMapping
	 * Description: Called from customer home page to view all the existing items in his location
	 * @param int: branchId
	 * @return List<Item>: a List of all the existing items in the given branch
	 * @throws ResourceNotFoundException : It is raised when no data is found with the given request
	*/
	@GetMapping("/getABranchItems/{branchId}")
	public ResponseEntity<List<Item>> getABranchItems(@PathVariable int branchId) throws ResourceNotFoundException
	{
		logger.trace("Requested to get all the items in a branch");
		List<Item> items= service.getABranchItems(branchId);
		logger.trace("Completed Request to get all the items in a branch");	
		return ResponseEntity.ok(items);
	}
	
	
	
	/* Method:getABranchCategories
	 * Type: GetMapping
	 * Description: Called from customer home page to view all the existing categories of items in his location
	 * @param int: branchId
	 * @return List<Category>: a List of all the existing categories of items in the given branch
	 * @throws ResourceNotFoundException : It is raised when no data is found with the given request
	*/
	@GetMapping("/getABranchCategories/{branchId}")
	public ResponseEntity<List<Category>> getABranchCategories(@PathVariable int branchId) throws ResourceNotFoundException
	{
		logger.trace("Requested to get all the categories in a branch");
		List<Category> categories = service.getABranchCategories(branchId);
		logger.trace("Completed request to get all the categories in a branch");
		return ResponseEntity.ok(categories);	
	}
	
	
	
	/* Method:getABranchSubCategories
	 * Type: GetMapping
	 * Description: Called from customer home page to view all the existing sub-categories of items in his location
	 * @param int: branchId
	 * @return List<SubCategory>: a List of all the existing sub-categories of items in the given branch
	*/
	@GetMapping("/getABranchSubCategories/{branchId}")
	public ResponseEntity<List<SubCategory>> getABranchSubCategories(@PathVariable int branchId)
	{
		logger.trace("Requested to get all the sub-categories in a branch");
		List<SubCategory> subCategories= service.getABranchSubCategories(branchId);
		logger.trace("Completed request to get all the sub-categories in a branch");
		return ResponseEntity.ok(subCategories);
	}
	
	
	
	/* Method:getACarryBoxDetails
	 * Type: GetMapping
	 * Description: Called from customer carry box page to get a list of items present in one's carrybox and related info
	 * @param int: carryBoxId
	 * @return CarryBox: a object of a CarryBox of given Carry Box id
	*/
	@GetMapping("/getACarryBoxDetails/{emailId}")
	public ResponseEntity<CarryBox> getACarryBoxDetails(@PathVariable String emailId)
	{
		logger.trace("Requested to get a carry box details");
		CarryBox carryBox= service.getACarryBoxDetails(emailId);
		logger.trace("Completed request to get a carry box details");
		return ResponseEntity.ok(carryBox);
	}
	
	
	
	/* Method:getAnUserAddresses
	 * Type: GetMapping
	 * Description: Called from customer account page and place order page to get a list of addresses saved
	 * @param String: emailId
	 * @return List<Address>: a list of Address objects saved to a user account
	 * @throws ResourceNotFoundException : It is raised when no data is found with the given request	
	*/
	@GetMapping("/getAnUserAddresses/{emailId}") 
	public ResponseEntity<List<Address>> getAnUserAddresses(@PathVariable String emailId) throws ResourceNotFoundException
	{
		logger.trace("Requested to get all the addresses of a user");
		List<Address> addressList= service.getAnUserAdresses(emailId);
		logger.trace("Completed request to get all the addresses of a user");
		return ResponseEntity.ok(addressList);
	}
	
	
	
	/* Method:addANewAddress
	 * Type: PostMapping
	 * Description: Called from customer account page and place order page to add a new address to the list of addresses saved
	 * @param Address: address 
	 * @return boolean: a boolean is returned to notify whether the new address is added or not
	 * @throws ResourceNotFoundException : It is raised when no data is found with the given request
	*/
	@PostMapping("/addANewAddress/{emailId}")
	public ResponseEntity<Boolean> addANewAddress(@PathVariable String emailId, @RequestBody Address address) throws ResourceNotFoundException
	{
		logger.trace("Requested to add a new address to a user");	
		boolean returnedValue=service.addANewAddress(emailId,address);
		logger.trace("Completed request to add a new address to a user");	
		return ResponseEntity.ok(returnedValue);
	}
	
	
	
	
	/* Method:updateAnAddress
	 * Type: PutMapping
	 * Description: Called from customer account page to update an existing address in the list of addresses saved
	 * @param Address: address 
	 * @return boolean: a boolean is returned to notify whether the address is updated or not
	 * @throws ResourceNotFoundException : It is raised when no data is found with the given request
	*/
	@PutMapping("/updateAnAddress/{emailId}")
	public ResponseEntity<Boolean> updateAnAddress(@PathVariable String emailId, @RequestBody Address address) throws ResourceNotFoundException
	{
		logger.trace("Requested to update an existing address");	
		boolean returnedValue=service.UpdateAnAddress(emailId,address);
		logger.trace("Completed request to update an existing address");	
		return ResponseEntity.ok(returnedValue);
	}
	
	
	
	/* Method:deleteAnAddress
	 * Type: DeleteMapping
	 * Description: Called from customer account page to delete an address from the list of addresses saved
	 * @param Address: address 
	 * @return boolean: a boolean is returned to notify whether the address is deleted or not
	*/	
	@DeleteMapping("/deleteAnAddress/{addressId}")
	public ResponseEntity<Boolean> deleteAnAddress(@PathVariable int addressId)
	{
		logger.trace("Requested to delete an existing address");
		boolean returnedValue= service.deleteAnAddress(addressId);
		logger.trace("Completed request to delete an existing address");
		return ResponseEntity.ok(returnedValue);
	}
	
	
	/* Method:getAnUserOrders
	 * Type: GetMapping
	 * Description: Called from customer account page to get a list of orders placed
	 * @param String: emailId
	 * @return List<Order>: a list of Order objects placed from the user account
	 * @throws ResourceNotFoundException : It is raised when no data is found with the given request
	*/
	@GetMapping("/getAnUserOrders/{emailId}") 
	public ResponseEntity<List<Order>> getAnUserOrders(@PathVariable String emailId) throws ResourceNotFoundException
	{
		logger.trace("Requested to get all the orders of a user");
		List<Order> orders=service.getAnUserOrders(emailId);
		logger.trace("Completed request to get all the orders of a user");
		return ResponseEntity.ok(orders);
	}
	
	
	
	/* Method:placeANewOrder
	 * Type: PostMapping
	 * Description: Called from customer placeOrder page to place a new order
	 * @param String: emailId
	 * @param int:branchId
	 * @param int:addressId
	 * @return int: orderId is returned
	*/
	@PostMapping("/placeANewOrder/{emailId}/{branchId}/{addressId}")
	public ResponseEntity<Integer> placeANewOrder(@PathVariable String emailId,@PathVariable int branchId,@PathVariable int addressId) throws ResourceNotFoundException,OutOfLocationRangeException,OrderContainsInactiveItemsException
	{
		logger.trace("Requested to place a new order");
		int returnedValue= service.placeANewOrder(emailId, branchId, addressId);
		logger.trace("Completed request to place a new order");
		return ResponseEntity.ok(returnedValue);
	}
	

	
	/* Method: trackAnOrder
	 * Type: GetMapping
	 * Description: Called from customer account page to get the status of an order placed
	 * @param int: orderId
	 * @return List<Order>: a list Order object with that order Id from the user account
	 * @throws ResourceNotFoundException : It is raised when no data is found with the given request
	*/
	@GetMapping("/trackAnOrder/{orderId}")
	public ResponseEntity<List<Order>> trackAnOrder(@PathVariable int orderId) throws ResourceNotFoundException
	{
		logger.trace("Requested to get the status of an order");
		List<Order> returnedValue= service.trackAnOrder(orderId);
		logger.trace("Completed request to get the status of an order");
		return ResponseEntity.ok(returnedValue);
	}
	
	
	
	/* Method:addAnItemToCarryBox
	 * Type: PostMapping
	 * Description: Called from items page to add a desired item to carry box before buying
	 * @param String:emailId
	 * @param int: itemId
	 * @return boolean: a boolean is returned to notify whether the item is added to carry box or not
	*/
	@PostMapping("addAnItemToCarryBox/{emailId}")
	public ResponseEntity<Boolean> addItemToCarryBox(@PathVariable String emailId,@RequestBody int itemId)
	{
		logger.trace("Requested to add an item to carry box");
		boolean returnedValue= service.addItemToCarryBox(emailId, itemId);
		logger.trace("Completed request to add an item to carry box");
		return ResponseEntity.ok(returnedValue);
	}

	
	
	/* Method:deleteACarryBoxItem
	 * Type: DeleteMapping
	 * Description: Called from Carry Box page to delete a item from carry box when not needed
	 * @param String:emailId
	 * @param int: itemId
	 * @return boolean: a boolean is returned to notify whether the item is deleted from carry box or not
	*/	
	@DeleteMapping("/deleteACarryBoxItem/{emailId}/{itemId}")
	public ResponseEntity<Boolean> deleteACarryBoxItem(@PathVariable String emailId,@PathVariable int itemId)
	{
		logger.trace("Requested to delete an item from carry box");
		boolean returnedValue= service.deleteACarryBoxItem(emailId,itemId);
		logger.trace("Completed request to delete an item from carry box");
		return ResponseEntity.ok(returnedValue);

	}

	
	
	/* Method:clearCarryBox
	 * Type: DeleteMapping
	 * Description: Called from Carry Box page to delete all the items in carry box when not needed
	 * @param String:emailId
	 * @return boolean: a boolean is returned to notify whether the items are deleted from carry box or not
	*/	
	@DeleteMapping("/clearACarryBox/{emailId}")
	public ResponseEntity<Boolean> clearACarryBox(@PathVariable String emailId)
	{
		logger.trace("Requested to clear the carry box");
		boolean returnedValue= service.clearACarryBox(emailId);
		logger.trace("Completed request to delete clear the carry box");
		return ResponseEntity.ok(returnedValue);

	}
	
	
	
	/* Method:updateACarryBoxItem
	 * Type: PutMapping
	 * Description: Called from Carry Box page to update the quantity of an item in carry box
	 * @param String:emailId
	 * @param int: itemId
	 * @param int: quantity
	 * @return boolean: a boolean is returned to notify whether an item in the carry box is updated or not
	*/
	@PutMapping("/updateACarryBoxItem/{emailId}/{itemId}")
	public ResponseEntity<Boolean> updateACarryBoxItem(@PathVariable String emailId,@PathVariable int itemId,@RequestBody int quantity)
	{
		logger.trace("Requested to get update an item in carry box");
		boolean returnedValue= service.updateACarryBoxItem(emailId,itemId,quantity);
		logger.trace("Completed request to get update an item in carry box");
		return ResponseEntity.ok(returnedValue);
	}
	
	
	
	/* Method:searchItems
	 * Type: GetMapping
	 * Description: Called from home page to search for desired items or categories
	 * @param int: branchId
	 * @param String: searchText
	 * @return Set<Item>: a set of items related to the search text is returned
	*/
	@GetMapping("/searchItems/{branchId}/{searchText}")
	public ResponseEntity<Set<Item>> searchItems(@PathVariable int branchId, @PathVariable String searchText)
	{
		logger.trace("Requested to search items,categories with names containing the searchtext");
		Set<Item> items= service.searchItems(branchId,searchText);
		logger.trace("Completed request to search items,categories with names containing the searchtext");
		return ResponseEntity.ok(items);
	}
	
	
	/* Method:getAnUSerDetails
	 * Type: GetMapping
	 * Description: Called from my account page to retrieve all the details of an user
	 * @param String: emailId
	 * @return User: a user object will be returned with all details
	*/
	@GetMapping("/getAnUserDetails/{emailId}")
	public ResponseEntity<User> getAnUserDetails(@PathVariable String emailId)
	{
		logger.trace("Requested to get user details");
		User user= service.getAnUserDetails(emailId);
		logger.trace("Completed request to get user details");
		return ResponseEntity.ok(user);
	}
	
	
	/* Method:getAllBranches
	 * Type: GetMapping
	 * Description: Called from home page to retrieve the list of branches
	 * @return List<BranchDto>: a list of branch dto objects will be returned with all details
	*/
	@GetMapping("/getAllBranches")
	public ResponseEntity<List<BranchDto>> getAllBranches(){
		logger.trace("Requested to get all branches");
		List<BranchDto> branches= service.getAllBranches();
		logger.trace("Completed request to get all branches");
		return ResponseEntity.ok(branches);
	}
	
}
