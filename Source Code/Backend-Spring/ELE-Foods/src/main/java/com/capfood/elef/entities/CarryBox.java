package com.capfood.elef.entities;



import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;



@Entity
@Table(name="ELEF_CARRYBOX")
public class CarryBox{
	
	

	@Id
	@Column(name="BOXID")
	private int boxId;
	

	@Column(name="totalCost")
	@Min(value=0)
	private double totalCost;
	
	@OneToMany(mappedBy="carryBox")
	private List<Item> itemlist;
	
	
	@OneToOne(mappedBy="carryBox")
	@JoinColumn(name="CUSTOMER")
	private User customer;
	
	public CarryBox() {
		
	}

	public CarryBox(int boxId, double totalCost, List<Item> itemlist, User customer) {
		super();
		this.boxId = boxId;
		this.itemlist = itemlist;
		this.customer = customer;
		this.totalCost = totalCost;
	}

	public int getBoxId() {
		return boxId;
	}

	public void setBoxId(int boxId) {
		this.boxId = boxId;
	}

	public List<Item> getItemlist() {
		return itemlist;
	}

	public void setItemlist(List<Item> itemlist) {
		this.itemlist = itemlist;
	}

	
	public User getCustomer() {
		return customer;
	}

	public void setCustomer(User customer) {
		this.customer = customer;
	}

	public double getTotal_cost() {
		return totalCost;
	}

	public void setTotal_cost(double total_cost) {
		this.totalCost = total_cost;
	}

	public void addItem(Item item) {
		item.setCarryBox(this);
		this.getItemlist().add(item);
	}
	
	public void removeItem(Item item) {
		item.setCarryBox(null);
		this.getItemlist().remove(item);
	}
	


		
	
	
}