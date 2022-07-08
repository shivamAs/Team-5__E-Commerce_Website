package com.capfood.elef.services;





import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


import com.capfood.elef.dao.AdminDao;

import com.capfood.elef.entities.Category;
import com.capfood.elef.entities.Item;
import com.capfood.elef.entities.Order;
import com.capfood.elef.entities.SubCategory;
import com.capfood.elef.entities.User;
import com.capfood.elef.exceptions.CategoryNameAlreadyExistsException;
import com.capfood.elef.exceptions.ItemNameAlreadyExistsException;
import com.capfood.elef.exceptions.NotAnAdminException;
import com.capfood.elef.exceptions.SubCategoryNameAlreadyExistsException;


@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	AdminDao admin_dao;
	
	SimpleMailMessage mail = new SimpleMailMessage();
	private JavaMailSender javaMailSender;

	@Autowired
	public AdminServiceImpl(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}
	
	@Override
	public Item addItem(String user_name, int subCategory, Item item) {
		User user = admin_dao.getUserDetails(user_name);
		List<Item> items= user.getBranch().getItems();
		
		for(Item i:items) {
			if(i.getItemName().equals(item.getItemName())) {
					throw new ItemNameAlreadyExistsException("Item name already exists exception");
			}
		}
		if(user.getRole().equals("Admin")) {
				
				SubCategory sub_category = admin_dao.getSubCategory(subCategory);
				item.setSubCategory(sub_category);
				item.setPicture(String.valueOf(admin_dao.generateItemId()));
				if(item.isActive()!=true || item.isActive()!=false)
					item.setActive(true);
				if(item.getItemDescription().equals(""))
					item.setItemDescription("tasty");
			    item.setBranch(user.getBranch());
			    item.setItemId(admin_dao.generateItemId());
			    admin_dao.addItem(user_name, item);
			    	   
		}
		else {
			throw new NotAnAdminException("Sorry..You are not allowed for adding item");
		}
			
	
		 return item;
	
	}

	@Override
	public User getUserDetails(String username) {
		return admin_dao.getUserDetails(username);
	}

	@Override
	public Category getCategory(int category) {
		return admin_dao.getCategory(category);
	}
	
	@Override
	public Item getItem(int itemId) {
		return admin_dao.getItem(itemId);
	}

	
	@Override
	public SubCategory getSubCategory(int subCategory) {
		System.err.println("service"+subCategory);
		return admin_dao.getSubCategory(subCategory);
	}

	
	@Override
	public Category addCategory(String userId, Category category) {
		
		User user = admin_dao.getUserDetails(userId);
		List<Category> categories = user.getBranch().getCategory();
		System.err.println(categories.get(0));
		for(Category c: categories) {
			if(c.getCategoryName().equals(category.getCategoryName())) {
				throw new CategoryNameAlreadyExistsException("Category Name Already Exists");
			}
			
		}
		if(user.getRole().equals("Admin")) {	
				category.setCategoryId(admin_dao.generateCategoryId());
				category.setBranch(user.getBranch());
				admin_dao.addCategory(category);
		
		}
		else {
			throw new NotAnAdminException("Sorry..You are not allowed for adding an item");
		}
		return category;
		
		
		
	}

	@Override
	public SubCategory addSubCategory(int category, SubCategory subCategory) {
		Category category_details = admin_dao.getCategory(category);
		List<SubCategory> subCategories = category_details.getSubCategories();
		System.err.println(subCategories.get(0));
		for(SubCategory c: subCategories) {
			if(c.getSubCategoryName().equals(subCategory.getSubCategoryName())) {
				throw new SubCategoryNameAlreadyExistsException("Sub-Category Name Already Exists");
			}
			
		}
		
		
		if(category_details.getBranch().getAdmin().getRole().equals("Admin")) {
			
			    subCategory.setSubCategoryId(admin_dao.generateSubCategoryId());
				subCategory.setCategory(category_details);
			admin_dao.addSubCategory(subCategory);
		}
		else {
			throw new NotAnAdminException("Sorry..You are not allowed for adding subcategory");
		}
		return subCategory;
		
	}

	@Override
	public boolean editCategory(String emailId, Category category) {
		admin_dao.editCategory(emailId, category);
		return true;
		
	}
	@Override
	public boolean editSubCategory( SubCategory subCategory) {
		
		admin_dao.editSubCategory( subCategory);
		return true;
	}

	@Override
	public boolean editItem(Item item) {
		item.setPicture(String.valueOf(item.getItemId()));
		admin_dao.editItem(item);
		return true;
	}
	
	@Override
	public boolean deleteCategory(int categoryId) {
	    admin_dao.deleteCategory(categoryId);
		return true;
		
	}

	@Override
	public boolean deleteSubCategory(int subCategoryId) {
		admin_dao.deleteSubCategory(subCategoryId);
		return true;
		
	}

	@Override
	public boolean deleteItem(int itemId) {
		admin_dao.deleteItem(itemId);
		return true;
		
	}

	
	
	

	@Override
	public void updateOrderStatus(int orderId, String orderStatus) {
		List<Order> orders = admin_dao.getOrders(orderId);
		for(int i=0;i<orders.size();i++) {
			Order order=orders.get(i);
			if(orderStatus.equals("Accepted")) {
				
				order.setOrderStatus("Accepted");
				order.setStatusDescription("Your order has been accepted by the store and is being processed");
			}
			else if(orderStatus.equals("Rejected")) {
				order.setOrderStatus("Rejected");
				order.setStatusDescription("Sorry for the inconvenience but we have to cancel your order due to some technical issue");
			}
			else if(orderStatus.equals("Delivered")) {
				order.setOrderStatus("Delivered");
				order.setStatusDescription("Your order has been delivered!Enjoy your meal");
			}
		
		 admin_dao.updateOrderStatus(order);
	}

	


	}

	@Override
	public List<Item> getAllSearchItems(String emailId, String searchText) {
		User user = admin_dao.getUserDetails(emailId);
		   List<Item> items = user.getBranch().getItems();
		    List<Item> new_items= new ArrayList<>();
		    for(Item i : items) {
		    	String words[] = i.getItemName().split(" ");
		    	if(i.getItemName().substring(0, Math.min(searchText.length(), i.getItemName().length())).toLowerCase().equals(searchText.substring(0, Math.min(searchText.length(), i.getItemName().length())).toLowerCase() )){
		    		new_items.add(i);
		    	}
		    	else
		    	{
		    		for(String word: words) {
		    			if(word.substring(0, Math.min(searchText.length(), word.length())).toLowerCase().equals
		    					(searchText.substring(0, Math.min(searchText.length(), word.length())).toLowerCase())) {
		    				new_items.add(i);
		    			}
		    		}
		    	}
		    }
		    return new_items;
		    
	
	}

	@Override
	public void sendEmail(String emailId) {
		 mail.setTo(emailId);
			mail.setSubject("Enjoy excited taste and food");
			mail.setText("Dear Customer,"
						+"\n\n	Thanks for being our valuable customer and for your continuous support "
						+"\n There are many exciting offers to satisfy your hunger"
						+" \n come and check it on our website"
						+"\n\n Thanks for choosing ELEFoods....Have a Nice Day!!");
			
			javaMailSender.send(mail);
		
	}

	@Override
	public List<SubCategory> getSubCategories(String adminId) {
		List<Category> categories=getCategories(adminId);
		List<SubCategory> subCategories=new ArrayList<>();
		for(int i=0;i<categories.size();i++) {
			subCategories.addAll(categories.get(i).getSubCategories());
		}
		return subCategories;
	}

	

	@Override
	public List<Category> getCategories(String adminId) {
		return admin_dao.getUserDetails(adminId).getBranch().getCategory();
	}

	@Override
	public List<Item> getItems(String adminId) {
		return admin_dao.getUserDetails(adminId).getBranch().getItems();
//		return admin_dao.getItems(adminId);
	}

	@Override
	public boolean updateActiveStatus(int itemId, String status) {
		System.err.println("got input as "+status);
		Item item = admin_dao.getItem(itemId);
		if(status.equals("active")){
			
			item.setActive(false);
		}
		else if(status.equals("not-active")) {
			item.setActive(true);
		}
		System.err.println("updated as "+item.isActive());
		admin_dao.updateActiveStatus(item);
		return item.isActive();
	}
	
	
	
}






























