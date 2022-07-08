package com.capfood.elef.dao;

import java.util.List;

import com.capfood.elef.entities.Branch;
import com.capfood.elef.entities.Category;
import com.capfood.elef.entities.Item;
import com.capfood.elef.entities.Order;
import com.capfood.elef.entities.SubCategory;
import com.capfood.elef.entities.User;

public interface AdminDao {

	void addItem(String user_name, Item item);

	int generateItemId();

	int generateCategoryId();

	int generateSubCategoryId();

	SubCategory getSubCategory(int subCategory);

	void addCategory(Category category);

	void addSubCategory(SubCategory subCategory);

	void editCategory(String adminId, Category category);

	void editSubCategory( SubCategory Subcategory);

	void deleteCategory(int subCategoryId);

	void deleteSubCategory(int subCategoryId);

	void editItem(Item item);

	void deleteItem(int itemId);
	
	User getUserDetails(String userName);

	Category getCategory(int category);

	Item getItem(int itemId);

	void updateOrderStatus(Order order);

	List<Order> getOrders(int orderId);

	Branch getBranch(int branchId);

	List<SubCategory> getSubCategories();

	List<Category> getCategories(String username);

	List<Item> getItems(String adminId);

	void updateActiveStatus(Item item);



}


//void uploadImage(Item img);

//
//byte[] compressBytes(byte[] data);
//
//byte[] decompressBytes(byte[] data);
//
//Item getImageDetails(String imageName);

//int getRecentItemId();