package com.capfood.elef.exceptions;

public class NotAnAdminException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public NotAnAdminException() {
		super();
	}

	public NotAnAdminException(final String message) {
		super(message);

	}
}
