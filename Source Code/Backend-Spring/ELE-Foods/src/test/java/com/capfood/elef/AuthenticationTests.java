package com.capfood.elef;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.capfood.elef.controllers.AuthenticationController;
import com.capfood.elef.entities.Address;
import com.capfood.elef.entities.User;
import com.capfood.elef.services.AuthenticationService;


@Transactional
@SpringBootTest
@Rollback(true)
public class AuthenticationTests {
	@Autowired
	private AuthenticationService service;
	@Autowired
	private EntityManager entityManager;
	Logger logger=LoggerFactory.getLogger(AuthenticationController.class);

	@Test
	@Rollback(true)
	public void userLoginTest()throws Exception {
		logger.trace("userLoginTest Accessed");
		User account=new User();
		account.setEmailId("swati07@gmail.com");
		account.setPassword("Sw@ti124");
		account.setMobileNumber("9874489008");
		account.setSecurity_question("Your Hobby");
		account.setRole("Customer");
		account.setSecurity_answer("Drawing");
		account.setCustomerName("Swati Gupta");
		Address address=new Address();
		address.setLine1("Natural City");
		address.setCity("New Delhi");
		address.setMobileNumber("8420410490");
		address.setName("Archana Agarwal");
		service.userSignUp(account, address);
		logger.info("Sample account created");
		String check=null;
		String message1=null;
		try {
			check=service.userLogin(account.getEmailId(),account.getPassword());
		}
		catch(Exception e) {
			message1=e.getMessage();
		}
		assertThat("Customer").isEqualTo(check);
		//------------------------------------------------//
		try {
			check=service.userLogin(account.getEmailId(),"Sw@ti1245");
		}
		catch(Exception e) {
			message1=e.getMessage();
		}
		assertThat("Invalid username or password").isEqualTo(message1);
		
	}


	@Test
	@Rollback(true)
	public void userSignUpTest()throws Exception{
		logger.trace("userSignUpTest accessed");
		User account=new User();
		account.setEmailId("swati07@gmail.com");
		account.setPassword("Sw@ti124");
		account.setMobileNumber("9874489008");
		account.setSecurity_question("Your Hobby");
		account.setRole("Customer");
		account.setSecurity_answer("Drawing");
		account.setCustomerName("Swati Gupta");
		Address address=new Address();
		address.setLine1("Natural City");
		address.setCity("New Delhi");
		address.setMobileNumber("8420410490");
		address.setName("Archana Agarwal");
		service.userSignUp(account, address);
		logger.info("Sample account created");
		User sample_account=entityManager.find(User.class, account.getEmailId());
		assertThat(account.getSecurity_question()).isEqualTo(sample_account.getSecurity_question());
		assertThat(account.getRole()).isEqualTo(sample_account.getRole());
		assertThat(account.getSecurity_answer()).isEqualTo(sample_account.getSecurity_answer());
		assertThat(account.getMobileNumber()).isEqualTo(sample_account.getMobileNumber());

		//----------------------------------------------//

		String messages=null;
		User account1=new User();
		account1.setEmailId("swati071@gmail.com");
		account1.setPassword("Sw@ti124");
		account1.setMobileNumber("9874489008");
		account1.setSecurity_question("Your Hobby");
		account1.setRole("Customer");
		account1.setSecurity_answer("Drawing");
		account1.setCustomerName("Swati Gupta");
		Address address1=new Address();
		address1.setLine1("Natural City");
		address1.setCity("New Delhi");
		address1.setMobileNumber("8420410490");
		address1.setName("Archana Agarwal");
		logger.info("Another Sample account created");
		try {
			service.userSignUp(account1, address1);
		}
		catch(Exception e) {
			messages=e.getMessage();
		}
		assertThat("You already have an account!Please kindly login!!").isEqualTo(messages);

	}

	@Test
	@Rollback(true)
	public void forgotPasswordTest()throws Exception{
		logger.trace("forgotPasswordTest accessed");
		User account=new User();
		account.setEmailId("swati07@gmail.com");
		account.setPassword("Sw@ti124");
		account.setMobileNumber("9874489008");
		account.setSecurity_question("Your Hobby");
		account.setRole("Customer");
		account.setSecurity_answer("Drawing");
		account.setCustomerName("Swati Gupta");
		Address address=new Address();
		address.setLine1("Natural City");
		address.setCity("New Delhi");
		address.setMobileNumber("8420410490");
		address.setName("Archana Agarwal");
		service.userSignUp(account, address);
		logger.info("Sample account created");
		String check=null;
		String message1=null;
		try {
			check=service.forgotPassword(account.getEmailId(), account.getSecurity_question(), account.getSecurity_answer());
		}
		catch(Exception e){
			message1=e.getMessage();
		}
		assertThat("User").isEqualTo(check);

		//********************************************//

		try {
			check=service.forgotPassword(account.getEmailId(), account.getSecurity_question(), "Reading");
		}
		catch(Exception e){
			message1=e.getMessage();
		}
		assertThat("Invalid Details!Please try again").isEqualTo(message1);


		//********************************************//

		try {
			check=service.forgotPassword("swati07@gamil.com", account.getSecurity_question(), account.getSecurity_answer());
		}
		catch(Exception e){
			message1=e.getMessage();
		}
		assertThat("User does not exist").isEqualTo(message1);

	}

	@Test
	@Rollback(true)
	public void changePasswordTest() {
		logger.trace("changePasswordTest accessed");
		User account=new User();
		account.setEmailId("swati07@gmail.com");
		account.setPassword("Sw@ti124");
		account.setMobileNumber("9874489008");
		account.setSecurity_question("Your Hobby");
		account.setRole("Customer");
		account.setSecurity_answer("Drawing");
		account.setCustomerName("Swati Gupta");
		Address address=new Address();
		address.setLine1("Natural City");
		address.setCity("New Delhi");
		address.setMobileNumber("8420410490");
		address.setName("Archana Agarwal");
		service.userSignUp(account, address);
		logger.info("Sample account created");
		String check=service.changePassword(account.getEmailId(),account.getPassword(), "Sw@ti124");
		assertThat("Password successfully changed").isEqualTo(check);

		//***************************************//

		check=service.changePassword(account.getEmailId(),account.getPassword(), "Sw1@ti124");
		assertThat("Passwords do not match!Please try again").isEqualTo(check);

	}
	
//	@Test
//	@Rollback(true)
//	public void updateOrderStatus() {
//		logger.trace("updateOrderStatus accessed");
//		Order order=new Order();
//		order.setOrderId(8005);
//		order.setOrderStatus("Placed");
//		String message=service.updateOrderStatus(order.getOrderId(), order.getOrderStatus());
//		assertThat("Status Updated Successfully").isEqualTo(message);
//	}



}

