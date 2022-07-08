package com.capfood.elef.services;

import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.capfood.elef.dao.AuthenticationDao;
import com.capfood.elef.entities.Address;
import com.capfood.elef.entities.Order;
import com.capfood.elef.entities.User;
import com.capfood.elef.exceptions.InvalidLoginCredentialsException;

@Service
@Transactional
public class AuthenticationServiceImpl implements AuthenticationService {

	@Autowired
	private AuthenticationDao dao;
	Logger logger=LoggerFactory.getLogger(AuthenticationServiceImpl.class);
	@Override
	public String userLogin(String emailId, String password) throws InvalidLoginCredentialsException {
		logger.trace("Login method accessed at service layer");
		return dao.userLogin(emailId, password);
	}

	@Override
	public String userSignUp(User user, Address address) {
		logger.trace("Sign Up method accessed at service layer");
		return dao.userSignUp(user, address);
	}

	@Override
	public String forgotPassword(String emailId, String security_question, String security_answer) {
		logger.trace("Forgot Password method accessed at service layer");
		return dao.forgotPassword(emailId, security_question, security_answer);
	}

	@Override
	public String changePassword(String emailId, String newPassword, String reEnterNewPassword) {
		logger.trace("Change Password method accessed at service layer");
		return dao.changePassword(emailId, newPassword, reEnterNewPassword);
	}

	@Override
	public List<List<Order>> getOrderList(String emailId) {
		logger.trace("Get Order List method is accessed at service layer");
		return dao.getOrderList(emailId);
	}

	@Override
	public  List<List<Order>> getActiveOrderList(String emailId) {
		logger.trace(" Get Active Order List method is accessed at service layer");
		return dao.getActiveOrderList(emailId);
	}
	
}
