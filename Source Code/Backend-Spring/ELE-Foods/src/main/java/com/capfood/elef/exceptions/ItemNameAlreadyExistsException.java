package com.capfood.elef.exceptions;

public class ItemNameAlreadyExistsException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public ItemNameAlreadyExistsException() {
		super();
	}

	public ItemNameAlreadyExistsException(final String message) {
		super(message);
	}
}
