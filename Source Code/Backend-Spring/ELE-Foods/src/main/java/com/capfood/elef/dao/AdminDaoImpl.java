package com.capfood.elef.dao;


import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties.Admin;
import org.springframework.stereotype.Repository;
import com.capfood.elef.entities.Branch;
import com.capfood.elef.entities.Category;
import com.capfood.elef.entities.Item;
import com.capfood.elef.entities.Order;
import com.capfood.elef.entities.SubCategory;
import com.capfood.elef.entities.User;
import com.capfood.elef.exceptions.ChildRecordsFoundException;
import com.capfood.elef.repository.BranchRepository;
import com.capfood.elef.repository.CategoryRepository;
import com.capfood.elef.repository.ItemRepository;
import com.capfood.elef.repository.OrderRepository;
import com.capfood.elef.repository.SubCategoryRepository;
import com.capfood.elef.repository.UserRepository;

@Repository
@Transactional
public class AdminDaoImpl implements AdminDao {

	@Autowired
	private BranchRepository branchRepository;
	

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired 
	private CategoryRepository categoryRepository;
	
	@Autowired 
	private SubCategoryRepository subCategoryRepository;
	
	@Autowired
	private ItemRepository itemRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	
	@Override
	public int generateItemId() {
		int tempId = 1000;
		long count = itemRepository.getCountOfItem();
		if (count > 0) {
			int temp = itemRepository.getMaxOfItemId();
			tempId = temp+1;
		}
		return tempId;
	}

	@Override
	public int generateCategoryId() {
		int tempId = 1000;
		long count = categoryRepository.getCountOfCategory();
		if (count > 0) {
			int temp = categoryRepository.getMaxOfCategoryId();
			tempId = temp + 1;
		}
		return tempId;
	}

	@Override
	public int generateSubCategoryId() {
		int tempId = 1000;
		long count = subCategoryRepository.countOfSubCategory();
		if (count > 0) {
			int temp = subCategoryRepository.getMaxOfSubCategoryId();
			tempId = temp + 1;
		}
		return tempId;
	}
	

	@Override
	public void updateOrderStatus(Order order) 
	{
		orderRepository.save(order);
	}
	
	@Override
	public User getUserDetails(String userName) {
		return userRepository.getOne(userName);
	
	}
	@Override
	public SubCategory getSubCategory(int subCategory) {
		return subCategoryRepository.getOne(subCategory);
	
	}
	@Override
	public Category getCategory(int category) {
		return categoryRepository.getOne(category);
	}
	@Override
	public Item getItem(int itemId) {
		return itemRepository.getOne(itemId);
	}
	@Override
	public Branch getBranch(int branchId) {
		return branchRepository.getOne(branchId);
	}
	@Override
	public void addItem(String user_name, Item item) {
		itemRepository.save(item);
		
	}
	@Override
	public List<Order> getOrders(int orderId)
	{
		List<Order> orders = orderRepository.getOrders(orderId);
		return orders;
	}

	@Override
	public void addCategory(Category category) {
		categoryRepository.save(category);
		
	}

	@Override
	public void addSubCategory(SubCategory subCategory) {
		subCategoryRepository.save(subCategory);
		
	}

	@Override
	public void editCategory(String adminId, Category category) {
		User user = userRepository.getOne(adminId) ;
		category.setBranch(user.getBranch());
		categoryRepository.save(category);
		
	}

	@Override
	public void editSubCategory( SubCategory subCategory) {
		subCategoryRepository.save(subCategory);
		
	}

	@Override
	public void editItem(Item item) {
		 itemRepository.save(item);
	}
	
	@Override
	public void deleteCategory(int categoryId) {
		System.err.println("dao");
		Category category = categoryRepository.getOne(categoryId);
		if(category.getSubCategories().size()==0) {
		    categoryRepository.delete(category);
			
		}
		else {
			throw new ChildRecordsFoundException("child records found");
		}

		
	}

	@Override
	public void deleteSubCategory(int subCategoryId ) {
		SubCategory subCategory = subCategoryRepository.getOne(subCategoryId);
		if( subCategory.getItems().size()==0) {
			subCategoryRepository.delete(subCategory);
		}
		else {
			 throw new ChildRecordsFoundException("child records found");
		}
						
	}
	
	@Override
	public void deleteItem(int itemId ) {
		Item item = itemRepository.getOne(itemId);

		itemRepository.delete(item);
	
	}

	@Override
	public List<SubCategory> getSubCategories() {
	
		List<SubCategory> sub_categories = subCategoryRepository.findAll();
		
		return sub_categories;
	
	}

    
	@Override
	public List<Category> getCategories(String username) {
		
		List<Category> categories = categoryRepository.findAll();
		
		return categories;
	}

	@Override
	public List<Item> getItems(String adminId) {
	    List<Item> items = itemRepository.findAll();
		return items;
	}

	@Override
	public void updateActiveStatus(Item item) {
		itemRepository.save(item);
		System.err.println(item.isActive());
	
	}
	



}





























//
//
//@Override
//public void uploadImage(Item img) {
//	//entityManager.persist(img);
//	
//}
//
//@Override
//public Item getImageDetails(String imageName) {
////	String qStr = "SELECT item from Item item where item.picture=:imageName";
////	TypedQuery<Item> query = entityManager.createQuery(qStr, Item.class);
////	query.setParameter("imageName", imageName);
////	Item img=query.getResultList().get(0);
////	return img;
//	return null;
//}
//
//
//@Override
//public  byte[] compressBytes(byte[] data) {
//	Deflater deflater = new Deflater();
//	deflater.setInput(data);
//	deflater.finish();
//
//	ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
//	byte[] buffer = new byte[1024];
//	while (!deflater.finished()) {
//		int count = deflater.deflate(buffer);
//		outputStream.write(buffer, 0, count);
//	}
//	try {
//		outputStream.close();
//	} catch (IOException e) {
//	}
//	System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
//	System.out.println(outputStream.toByteArray().toString());
//	return outputStream.toByteArray();
//}
//
//// uncompress the image bytes before returning it to the angular application
//@Override
//public byte[] decompressBytes(byte[] data) {
//	Inflater inflater = new Inflater();
//	inflater.setInput(data);
//	ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
//	byte[] buffer = new byte[1024];
//	try {
//		while (!inflater.finished()) {
//			int count = inflater.inflate(buffer);
//			outputStream.write(buffer, 0, count);
//		}
//		outputStream.close();
//	} catch (IOException ioe) {
//	} catch (DataFormatException e) {
//	}
//	return outputStream.toByteArray();
//}
//


