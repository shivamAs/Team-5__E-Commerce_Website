package com.capfood.elef;

import static org.junit.jupiter.api.Assertions.assertEquals;



import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import com.capfood.elef.entities.Category;
import com.capfood.elef.entities.Item;
import com.capfood.elef.entities.SubCategory;
import com.capfood.elef.services.AdminService;

@SpringBootTest
@Transactional
@Rollback(true)
public class AdminApplicationTests {

	@Autowired
	AdminService adminService;
	
	
	public  Item addItem()
	{

		Item item = new Item();
		item.setItemName("Paneer Butteryy Masala");
		item.setItemDescription("Rich & Creamy");
		item.setItemPrice(180);
		item.setActive(true);
		item.setType("veg");
		Item item_details = adminService.addItem("pravallikakonduru17@gmail.com", 5004, item);
		return item_details;
		
	}

	public Category addCategory()
	{
		Category category = new Category();
		category.setCategoryName("Dessertsy");
		Category category_details = adminService.addCategory("pravallikakonduru17@gmail.com", category);
		return category_details;
		
	}
	
	public SubCategory addSubCategory()
	{
		SubCategory subCategory = new SubCategory();
		subCategory.setSubCategoryName("Ice creamsy");	
		SubCategory subCategory_details = adminService.addSubCategory(7003, subCategory);
		return subCategory_details;
	}
	
	
	/*
	 * check the addItem function
	 */
	
	@Test
	public void test1_addItem() 
	{
		 Item item = addItem();
		 assertEquals("Paneer Butteryy Masala", item.getItemName());
		
	}
	
	/*
	 * check the add category function
	 */
	@Test
	public void test2_addCategory() 
	{
		 Category category = addCategory();
		 assertEquals("Dessertsy", category.getCategoryName());
		
	}
	
	
	/*
	 * check the add sub category function
	 */
	@Test
	public void test3_addSubCategory() 
	{
		 SubCategory subCategory = addSubCategory();
		 assertEquals("Ice creamsy", subCategory.getSubCategoryName());
		
	}
	
	/*
	 * check the get Item function
	 */
	@Test
	public void test4_getItem()
	{
		Item item = addItem();
	    Item item_details = adminService.getItem(item.getItemId());
		assertEquals("Paneer Butteryy Masala",item_details.getItemName());
	}
	
	/*
	 * check the get category function
	 */
	@Test
	public void test5_getCategory()
	{
		Category category = addCategory();
		Category category_details = adminService.getCategory(category.getCategoryId());
		assertEquals("Dessertsy", category_details.getCategoryName());
	}
	
	/*
	 * check the sub category function
	 */
	
	@Test
	public void test6_getSubCategory()
	{
		SubCategory subCategory = addSubCategory();
		SubCategory subCategory_details = adminService.getSubCategory(subCategory.getSubCategoryId());
		assertEquals("Ice creamsy", subCategory_details.getSubCategoryName());
	}
	
	
	/*
	 * check the edit item function
	 */	
	@Test
	public void test7_editItem()
	{
		Item item = addItem();
		item.setItemId(item.getItemId());
		item.setItemDescription("Rich, Creamy & Buttery");
	    boolean result = adminService.editItem(item);
		assertEquals(true, result);
	}
	

	/*
	 * check the edit sub category function
	 */
	@Test
	public void test9_editSubCategory()
	{
		SubCategory subCategory = addSubCategory();
		subCategory.setSubCategoryId(subCategory.getSubCategoryId());
		subCategory.setSubCategoryName("Ice cream");
		boolean result = adminService.editSubCategory(subCategory);
		assertEquals(true, result);
	}
	
	/*
	 * check the delete item function
	 */
	@Test
	public void test10_deleteItem()
	{
		Item item = addItem();
		boolean result = adminService.deleteItem(item.getItemId());
		assertEquals(true, result);
	}

	

	

	   
	
	
	
}
