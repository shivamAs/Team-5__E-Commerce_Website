package com.capfood.elef.controllers;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.capfood.elef.entities.Address;
import com.capfood.elef.entities.Order;
import com.capfood.elef.entities.User;
import com.capfood.elef.exceptions.InvalidLoginCredentialsException;
import com.capfood.elef.services.AuthenticationService;

@CrossOrigin
@RestController
public class AuthenticationController {

	@Autowired
	private AuthenticationService service;
	Logger logger=LoggerFactory.getLogger(AuthenticationController.class);
	
	/* 
	 * When /authenticate is mapped with client request userLogin method is called at service layer
	 * In case of any exception the Controller shall take care of it using ExceptionHandlerControllerAdvice
	 */
	@PostMapping("/authenticate")
	public String userLogin(@RequestBody NewUser user) throws InvalidLoginCredentialsException{
		logger.trace("Login method accessed at controller");
		return service.userLogin(user.emailId, user.password);
	}
	
	/* 
	 * When /signup is mapped with client request userSignUp method is called at service layer
	 * In case of any exception the Controller shall take care of it using ExceptionHandlerControllerAdvice
	 */
	@PostMapping("/signup")
	public String userSignUp(@RequestBody SignUp signup){
		logger.trace("Sign Up method accessed at controller");
			return service.userSignUp(signup.user, signup.address);

	}
	
	/* 
	 * When /forgotPassword is mapped with client request forgotPassword method is called at service layer
	 * In case of any exception the Controller shall take care of it using ExceptionHandlerControllerAdvice
	 */
	@PostMapping("/forgotPassword")
	public String forgotPassword(@RequestBody ForgotPassword1 forgotPassword1 ) {
		logger.trace("Forgot Password method accessed at controller");
		return service.forgotPassword(forgotPassword1.emailId, forgotPassword1.security_question, forgotPassword1.security_answer);
	}
	
	/* 
	 * When /changePassword is mapped with client request changePassword method is called at service layer
	 * In case of any exception the Controller shall take care of it using ExceptionHandlerControllerAdvice
	 */
	@PostMapping("/changePassword")
	public String changePassword(@RequestBody ForgotPassword1 changePassword) {
		logger.trace("Change Password method accessed at controller");
		System.out.println(changePassword.emailId);
		System.out.println(changePassword.newPassword);
		System.out.println(changePassword.reEnterNewPassword);
		return service.changePassword(changePassword.emailId, changePassword.newPassword, changePassword.reEnterNewPassword);
	}
	
	/* 
	 * When /getOrderList/{emailId} is mapped with client request getOrderList method is called at service layer
	 * In case of any exception the Controller shall take care of it using ExceptionHandlerControllerAdvice
	 */
	@GetMapping("/getOrderList/{emailId}")
	public List<List<Order>> getOrderList(@PathVariable String emailId){
		logger.trace("Get order list method is accessed at Controller");
		return service.getOrderList(emailId);
	}
	
	
	/* 
	 * When /getActiveOrderList/{emailId} is mapped with client request getActiveOrderList method is called at service layer
	 * In case of any exception the Controller shall take care of it using ExceptionHandlerControllerAdvice
	 */
	@GetMapping("/getActiveOrderList/{emailId}")
	public  List<List<Order>> getActiveOrderList(@PathVariable String emailId){
		logger.trace("Get active order list method is accessed at Controller");
		return service.getActiveOrderList(emailId);
	}
	
}

	class NewUser{
		public String emailId;
		public String password;
	}
	class SignUp{
		public User user;
		public Address address;
	}
	class ForgotPassword1{
		public String emailId;
		public String security_question;
		public String security_answer;
		public String newPassword;
		public String reEnterNewPassword;
	}

