package com.capfood.elef.controllers;
import java.io.IOException;

import java.util.List;

import javax.persistence.EntityManager;
import javax.validation.Valid;

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

import com.capfood.elef.entities.Category;
import com.capfood.elef.entities.Item;
import com.capfood.elef.entities.SubCategory;
import com.capfood.elef.entities.User;
import com.capfood.elef.services.AdminService;


@CrossOrigin(origins="http://localhost:4200")
//@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {

    Logger logger = LoggerFactory.getLogger(AdminController.class);
	@Autowired
	AdminService admin_service;
	
	@Autowired
	EntityManager entityManager;
	
	/**
	 * Method Description : Get all the user details by taking user name
	 * @param username    : user name of the user
	 * @return
	 */
	@GetMapping("/getUser/{username}")
	public ResponseEntity<User> getUserDetails(@PathVariable String username) {
		logger.trace("Requested to get User Details");
		
		User user = admin_service.getUserDetails(username);
		
		logger.trace("Got the user Details");
		return ResponseEntity.ok(user);
		
	}
	
	
	/**
	 * Method Description :  Admin will be able to get all the categories by giving category id
	 * @param category    :  Category Id
	 * @return
	 */
	@GetMapping("/getItem/{itemId}")
	public ResponseEntity<Item> getItem(@PathVariable int itemId) {
		logger.trace("Requested to get Item Details");
		
		Item item_details = admin_service.getItem(itemId);
		

		logger.trace("Got the Item Details");
		return ResponseEntity.ok(item_details);
	}
	
	
	/**
	 * Method Description :  Admin will be able to get all the categories by giving category id
	 * @param category    :  Category Id
	 * @return
	 */
	@GetMapping("/getCategory/{category}")
	public ResponseEntity<Category> getCategory(@PathVariable int category) {
		logger.trace("Requested to get Category Details");
		Category category_details = admin_service.getCategory(category);
		logger.trace("got the category details");
		return ResponseEntity.ok(category_details);
		
	}
	
	
	
	/**
	 * Method Description	: Admin will be able to get all the sub categories by giving sub category id
	 * @param subCategory   : sub category Id.
	 * @return
	 */
	
	@GetMapping("/getSubCategory/{subCategory}")
	public ResponseEntity<SubCategory> getSubCategory(@PathVariable int subCategory) {
		logger.trace("Requested to get Sub Category Details");
		SubCategory sub_category = admin_service.getSubCategory(subCategory);
		logger.trace(" completed request to get a subcategory Details");
		return ResponseEntity.ok(sub_category);
	}
	
	
	/**
	 * Method Description : Admin will be able to add a new item according to sub category id to which it belongs to.
	 * @param username    : Admin's user name
	 * @param subCategory : Sub category name to which the item belongs to
	 * @param item        : Item object which is to be added
	 * @return 
	 * @return
	 * @throws IOException 
	 */
	@PostMapping("/addItem/{username}/{subCategory}")
	public ResponseEntity<Item> addItem( @PathVariable String username, @PathVariable int subCategory, @Valid  @RequestBody Item item)
	{
		logger.trace("Requested to add a new Item");
		Item item_details  = admin_service.addItem(username, subCategory, item);
		logger.trace(" completed request to add a new item Details");
		return ResponseEntity.ok(item_details);
		
	}
	

	@GetMapping("/getSubCategories/{adminId}")
	public ResponseEntity<List<SubCategory>> getSubCategories(@PathVariable String adminId)
	{
		logger.trace("Requested to add a new Item");
		List<SubCategory> subCategory_details  = admin_service.getSubCategories(adminId);
		logger.trace(" completed request to add a new item Details");
		return ResponseEntity.ok( subCategory_details);
		
	}
	
	@GetMapping("/getItems/{adminId}")
	public ResponseEntity<List<Item>> getItems(@PathVariable String adminId )
	{
		logger.trace("Requested to add a new Item");
		List<Item> items  = admin_service.getItems(adminId);
		logger.trace(" completed request to add a new item Details");
		return ResponseEntity.ok( items);
		
	}
	/**
	 * Method Description : Admin will be able to add a new category according to admin id to which it belongs to.
	 * @param admin       : Admin name to which the category belongs to. 
	 * @param category    : Category object which is to be added
	 * @return
	 */
	@PostMapping("/addCategory/{admin}")
	public ResponseEntity<Category> addCategory(@PathVariable String admin, @Valid @RequestBody Category category)
	{
		logger.trace("Requested to add a new Category");
		Category category_details = admin_service.addCategory(admin, category);
		return ResponseEntity.ok(category_details);
	}

	@GetMapping("/getCategories/{username}")
	public ResponseEntity<List<Category>> getCategories(@PathVariable String username )
	{
		
		
		logger.trace("Requested to add a new Item");
		List<Category> category_details  = admin_service.getCategories(username);
		logger.trace(" completed request to add a new item Details");
		return ResponseEntity.ok( category_details);
		
	}
	
	/**
	 * Method Description : Admin will be able add a new sub category according to category id to which it belongs to.
	 * @param category    : Category name to which the subcategory belongs to.
	 * @param subCategory : Subcategory object which is to be added
	 * @return
	 */
	@PostMapping("/addSubCategory/{category}")
	public ResponseEntity<SubCategory> addSubCategory(@PathVariable int category,@Valid @RequestBody SubCategory subCategory)
	{   
		logger.trace("Requested to add a  Sub Category Details");
		SubCategory subCategory_details = admin_service.addSubCategory(category, subCategory);
		logger.trace(" completed request to add a new subcategory Details");
		return ResponseEntity.ok(subCategory_details);
		
	}
	
	
	
	
	/**
	 * Method Description : Admin will be able to edit the category according to branch Id
	 * @param branchId    : Branch id to which the category belongs to.
	 * @param category    : Category object which is to updated
	 * @return
	 */

	@PutMapping("/editCategory/{adminId}")
	public ResponseEntity<Boolean> editCategory(@PathVariable String adminId,@Valid @RequestBody Category category) {
		logger.trace("Requested to edit a Category Details");
		boolean result = admin_service.editCategory(adminId, category);
		logger.trace("Completed Request to edit category Details");
		return ResponseEntity.ok(result);
	}
	
	/**
	 * Method Description  : Admin will be able to edit the sub-category according to category id.
	 * @param categoryId   : Category id to which the subcategory belongs to.
	 * @param subCategory  : Sub Category object which is to updated
	 * @return
	 */
	@PutMapping("/editSubCategory")
	public ResponseEntity<Boolean> editSubCategory( @Valid @RequestBody SubCategory subCategory) {
		logger.trace("Requested to edit  sub category Details");
		boolean result = admin_service.editSubCategory( subCategory);
		logger.trace("Completed Request to edit sub category Details");
		return ResponseEntity.ok(result);
	}
	
	
	/**
	 * Method Description  : Admin will be able to edit the item.
	 * @param item		   : Sub Category object which is to updated
	 * @return	
	 */
	@PutMapping("/editItem")
	public ResponseEntity<Boolean> editItem(@RequestBody @Valid Item item) {
		logger.trace("Requested to edit item Details");
		boolean result = admin_service.editItem(item);
		logger.trace("Completed Request to edit item Details");
		return ResponseEntity.ok(result);
	}
	
	
	/**
	 * Method Description  : Admin will be able to delete the category by taking category Id.
	 * @param categoryId   : Category id
	 * @return
	 */
	@DeleteMapping("/deleteCategory/{categoryId}")
	public ResponseEntity<Boolean> deleteCategory(@PathVariable int categoryId) {
		logger.trace("Requested to delete Category Details");
		boolean result = admin_service.deleteCategory(categoryId);
		logger.trace("Completed Request to delete Category Details");
		return ResponseEntity.ok(result);
	}
	
	/**
	 * Method Description  : Admin will be able to delete the sub-category by taking sub-category Id.
	 * @param subCategoryId : Sub Category Id
	 * @return
	 */
	@DeleteMapping("/deleteSubCategory/{subCategoryId}")
	public ResponseEntity<Boolean> deleteSubCategory(@PathVariable int subCategoryId) {
		logger.trace("Requested to delete sub Category Details");
		boolean result = admin_service.deleteSubCategory(subCategoryId);
		logger.trace("completed to delete  sub Category Details");
		return ResponseEntity.ok(result);
		
	}
	
	/**
	 * Method Description  : Admin will be able to delete the item by taking item Id.
	 * @param itemId	   : Item Id
	 * @return
	 */
	@DeleteMapping("/deleteItem/{itemId}")
	public ResponseEntity<Boolean> deleteItem(@PathVariable int itemId) {
		logger.trace("Requested to delete Item Details");
		boolean result = admin_service.deleteItem(itemId);
		logger.trace("completed request to delete item Details");
		return ResponseEntity.ok(result);
	}
	
	
	/**
	 * Method Description: Updating an order status
	 * @param orderId    : order Id
	 * @param orderStatus
	 * @return
	 */
	@GetMapping("/updateOrderStatus/{orderId}/{orderStatus}")
	public ResponseEntity<Boolean> updateOrderStatus(@PathVariable int orderId, @PathVariable String orderStatus )
	{
		logger.trace("Requested to update order status");
		admin_service.updateOrderStatus(orderId, orderStatus);
		logger.trace("updated order status");
		return ResponseEntity.ok(true);
	}
	
	/**
	 * Method Description : Get all the search items from the given search text
	 * @param branchId    : branch If from which the items to be retrieved
	 * @param searchText
	 * @return
	 */
	
	@GetMapping("/getSearchItems/{adminId}/{searchText}")
	public ResponseEntity<List<Item>> getAllSearchItems(@PathVariable String adminId, @PathVariable String searchText)
	{
		List<Item> items = admin_service.getAllSearchItems(adminId, searchText);
	    return  ResponseEntity.ok(items); 
	}
	
	
	
   @GetMapping("/sendMail/{emailId}")
   public void sendEmail(@PathVariable String emailId)
   {
	   admin_service.sendEmail(emailId);
   }
	
   
   @GetMapping("/updateActiveStatus/{itemId}/{status}")
   public boolean updateActiveStatus(@PathVariable int itemId, @PathVariable String status) {
	   System.err.println("status");
	    boolean b= admin_service.updateActiveStatus(itemId, status);
	   return b;
   }
}
















