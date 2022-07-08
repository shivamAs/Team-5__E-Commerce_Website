/*
 This is the Dao Layer where all the database changes are made. This layer has access to the database 
 and it acts as a source of interaction between service layer and database.
 */
package com.capfood.elef.dao;

import java.util.List;

import com.capfood.elef.entities.Address;
import com.capfood.elef.entities.Order;
import com.capfood.elef.entities.User;
import com.capfood.elef.exceptions.InvalidDetailsForPasswordChangeException;
import com.capfood.elef.exceptions.InvalidLoginCredentialsException;
import com.capfood.elef.exceptions.UserExistsException;

public interface AuthenticationDao {
	
	/**
	 * This method is used for validation of emailId and password
	 * @param emailId This is the first parameter to userLogin method 
	 * @param password This is the second parameter to userLogin method
	 * @return String This returns the role of the User if the user details exist in the database
	 * @throws InvalidLoginCredentialsException This exception is thrown if the emailId or password is/are invalid
	 */
	public String userLogin(String emailId,String password)throws InvalidLoginCredentialsException;
	
	/**
	 * This method is used for sign up 
	 * @param user This is the first parameter to userSignUp method 
	 * @param address This is the second parameter to userSignUp method
	 * @return String This returns the SignUp Successful message if the user is able to successfully Sign Up
	 * @throws UserExistsException This exception is thrown if the email id or phone number already exist in the database
	 */
	public String userSignUp(User user,Address address)throws UserExistsException;
	
	/**
	 * This method is used for checking the database before allowing the user to sign up 
	 * @param user This is the first parameter to checkDatabaseBeforeSignUp method 
	 * @throws UserExistsException This exception is thrown if the email id or phone number already exist in the database
	 */
	public void checkDatabaseBeforeSignUp(User user)throws UserExistsException;
	
	/**
	 * This method is used for the case of forgot password 
	 * @param emailId This is the first parameter to forgotPassword method 
	 * @param security_question This is the second parameter to forgotPassword method
	 * @param security_answer This is the third parameter to forgotPassword method
	 * @return String This returns User message if the user is verified
	 * @throws InvalidDetailsForPasswordChangeException This exception is thrown if the user is no verified
	 */
	public String forgotPassword(String emailId,String security_question,String security_answer)throws InvalidDetailsForPasswordChangeException;
	
	/**
	 * This method is used for the case of change password 
	 * @param emailId This is the first parameter to changePassword method 
	 * @param newPassword This is the second parameter to changePassword method
	 * @param reEnterNewPassword This is the third parameter to changePassword method
	 * @return String This returns a  message if the user password is changed or not
	 */
	public String changePassword(String emailId,String newPassword,String reEnterNewPassword);
	
	/**
	 * This method is used for getting the order list of placed orders 
	 * @param emailId This is the first parameter to getOrderList method 
	 * @return  List<List<Order>> This returns a list of order lists placed from the database
	 */
	public List<List<Order>> getOrderList(String emailId);

	/**
	 * This method is used for getting the order list of accepted orders 
	 * @param emailId This is the first parameter to getActiveOrderList method 
	 * @return  List<List<Order>> This returns a list of order lists accepted from the database
	 */
	public  List<List<Order>> getActiveOrderList(String emailId);
}
