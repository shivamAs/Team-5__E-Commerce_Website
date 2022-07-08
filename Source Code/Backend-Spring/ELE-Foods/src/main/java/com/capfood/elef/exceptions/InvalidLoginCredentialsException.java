package com.capfood.elef.exceptions;

public class InvalidLoginCredentialsException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = -9079454849611061074L;

	public InvalidLoginCredentialsException() {
		super();
	}

	public InvalidLoginCredentialsException( String message) {
		super(message);

	}
}
