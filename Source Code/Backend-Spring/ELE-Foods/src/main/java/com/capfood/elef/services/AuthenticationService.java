/*
 This is the Service Layer which acts as a connection between the controller and the dao layer.s
 */

package com.capfood.elef.services;
import java.util.List;

import com.capfood.elef.entities.Address;
import com.capfood.elef.entities.Order;
import com.capfood.elef.entities.User;
import com.capfood.elef.exceptions.InvalidLoginCredentialsException;
public interface AuthenticationService {
	/**
	 * This service method is used for validation of emailId and password
	 * @param emailId This is the first parameter to userLogin method 
	 * @param password This is the second parameter to userLogin method
	 * @return String This returns the role of the User 
	 */
	public String userLogin(String emailId,String password) throws InvalidLoginCredentialsException;
	
	/**
	 * This service method is used for sign up 
	 * @param user This is the first parameter to userSignUp method 
	 * @param address This is the second parameter to userSignUp method
	 * @return String This returns the SignUp Successful message  
	 */
	public String userSignUp(User user,Address address);
	
	/**
	 * This service method is used for the case of forgot password 
	 * @param emailId This is the first parameter to forgotPassword method 
	 * @param security_question This is the second parameter to forgotPassword method
	 * @param security_answer This is the third parameter to forgotPassword method
	 * @return String This returns User message if the user is verified
	 */
	public String forgotPassword(String emailId,String security_question,String security_answer);
	
	/**
	 * This service method is used for the case of change password 
	 * @param emailId This is the first parameter to changePassword method 
	 * @param newPassword This is the second parameter to changePassword method
	 * @param reEnterNewPassword This is the third parameter to changePassword method
	 * @return String This returns a  message if the user password is changed or not
	 */
	public String changePassword(String emailId,String newPassword,String reEnterNewPassword);
	
	/**
	 * This method is used for getting the order list of placed orders 
	 * @param emailId This is the first parameter to getOrderList method 
	 * @return List<List<Order>> This returns a list of order lists containing orders placed
	 */
	public List<List<Order>> getOrderList(String emailId);
	
	/**
	 * This method is used for getting the order list of accepted orders 
	 * @param emailId This is the first parameter to getActiveOrderList method 
	 * @return List<Order> This returns a list of order lists contatining orders accepted
	 */
	public  List<List<Order>> getActiveOrderList(String emailId);

}
