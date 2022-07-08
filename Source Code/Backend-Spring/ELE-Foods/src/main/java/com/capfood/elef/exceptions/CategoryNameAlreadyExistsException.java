package com.capfood.elef.exceptions;

public class CategoryNameAlreadyExistsException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public CategoryNameAlreadyExistsException() {
		super();
	}

	public CategoryNameAlreadyExistsException(final String message) {
		super(message);
	}
	}
