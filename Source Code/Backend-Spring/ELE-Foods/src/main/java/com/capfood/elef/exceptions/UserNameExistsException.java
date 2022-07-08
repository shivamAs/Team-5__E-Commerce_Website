package com.capfood.elef.exceptions;

public class UserNameExistsException  extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserNameExistsException() {
		super();
	}

	public UserNameExistsException(final String message) {
		super(message);

	}
}
