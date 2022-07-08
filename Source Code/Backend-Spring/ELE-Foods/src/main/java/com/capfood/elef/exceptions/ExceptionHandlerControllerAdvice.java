package com.capfood.elef.exceptions;


import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@ControllerAdvice
public class ExceptionHandlerControllerAdvice extends ResponseEntityExceptionHandler{

	@ExceptionHandler(UserNameExistsException.class)
	@ResponseStatus(value = HttpStatus.FOUND)
	public @ResponseBody ExceptionResponse handleUserNameExistsException(final UserNameExistsException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse(exception.getLocalizedMessage());
		return error;
	}

	@ExceptionHandler(InvalidLoginCredentialsException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public @ResponseBody ExceptionResponse handleInvalidLoginCredentials(final InvalidLoginCredentialsException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse(exception.getLocalizedMessage());
		return error;
	}
	
	@ExceptionHandler(OutOfLocationRangeException.class)
	@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
	public @ResponseBody ExceptionResponse handleOutofLocationRange(final OutOfLocationRangeException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse(exception.getLocalizedMessage());
		return error;
	}

	@ExceptionHandler(OrderContainsInactiveItemsException.class)
	@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
	public @ResponseBody ExceptionResponse handleOrderContainsInactiveItems(final OrderContainsInactiveItemsException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse(exception.getLocalizedMessage());
		return error;
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public @ResponseBody ExceptionResponse handleResourceNotFoundException(final ResourceNotFoundException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse(exception.getLocalizedMessage());
		return error;
	}
	
	@ExceptionHandler(CarryBoxEmptyException.class)
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public @ResponseBody ExceptionResponse handleCarryBoxEmptyException(final CarryBoxEmptyException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse(exception.getLocalizedMessage());
		return error;
	}
	
	@ExceptionHandler(NotAnAdminException.class)
	@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
	public @ResponseBody ExceptionResponse NotAnAdminException(final NotAnAdminException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse(exception.getMessage());
		return error;
	}
	
	@ExceptionHandler(ChildRecordsFoundException.class)
	@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
	public @ResponseBody ExceptionResponse ChildRecordsFoundException(final ChildRecordsFoundException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse(exception.getMessage());
		return error;
	}
	
	@ExceptionHandler(ItemNameAlreadyExistsException.class)
	@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
	public @ResponseBody ExceptionResponse ItemNameAlreadyExistsException(final ItemNameAlreadyExistsException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse(exception.getMessage());
		return error;
	}
	
	@ExceptionHandler(CategoryNameAlreadyExistsException.class)
	@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
	public @ResponseBody ExceptionResponse CategoryNameAlreadyExistsException(final CategoryNameAlreadyExistsException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse(exception.getMessage());
		return error;
	}
	
	@ExceptionHandler(SubCategoryNameAlreadyExistsException.class)
	@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
	public @ResponseBody ExceptionResponse SubCategoryNameAlreadyExistsException(final SubCategoryNameAlreadyExistsException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse(exception.getMessage());
		return error;
	}
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,HttpHeaders headers,HttpStatus status,WebRequest request){

		List<String> list=new ArrayList<String>();
		for(ObjectError error1:ex.getBindingResult().getAllErrors()) {
			list.add(error1.getDefaultMessage());
		}
		ValidExceptionHandler error = new ValidExceptionHandler("Validation Failed",list);
		return new ResponseEntity<Object>(error,HttpStatus.BAD_REQUEST);
	
	}
	
	@ExceptionHandler(InvalidDetailsForPasswordChangeException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public @ResponseBody ExceptionResponse handleInvalidDetailsForPasswordChangeException(final InvalidDetailsForPasswordChangeException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse(exception.getLocalizedMessage());
		return error;
	}
	
	@ExceptionHandler(UserExistsException.class)
	@ResponseStatus(value = HttpStatus.FOUND)
	public @ResponseBody ExceptionResponse handleUserExistsException(final UserExistsException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse(exception.getLocalizedMessage());
		return error;
	}
}