package com.capfood.elef.entities;



import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table (name="ELEF_ITEM")
public class Item  {

	@Id
	@Column(name="ITEMID")
	private int itemId;
	
	@Length(max=25)
	@NotEmpty(message="iten name cannot be empty")
	@Column(name="ITEMNAME")
	private String itemName;
	
	@Length(max=50)
	@Column(name="ITEMDESCRIPTION")
	private String itemDescription;
	
	@Min(value=0)
	@Column(name="ITEMPRICE")
	private double itemPrice;
	
	
	@Column(name="SPECIALITY")
	@Length(max=10)
	private String speciality;
	

	@Column(name="ACTIVE")
	private boolean active;
		
	@Column
	@Pattern(regexp="veg|non-veg")
	@Length(max=10)
    private String type;
	
	@Column(name="quantity")
	private int quantity;
	
	@Length(max=11)
	private String picture;
	
	@Column(name="PICBYTE",length=2227)
	private byte[] picByte;
	
	@Column(name="PIC_TYPE")
	private String pic_type;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="branch")
	private Branch branch;
	   
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="carryBox")
	private CarryBox carryBox;

	@OneToMany(mappedBy="item")
	private List<Order> orders;

	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="SUBCATEGORY")
	private SubCategory subCategory;


	public Item() {
		
	}




	public Item(int itemId, @Length(max = 25) @NotEmpty(message = "iten name cannot be empty") String itemName,
			@Length(max = 50) String itemDescription, @Min(0) double itemPrice, @Length(max = 10) String speciality,
			boolean active, @Pattern(regexp = "veg|non-veg") @Length(max = 10) String type, int quantity,
			@Length(max = 11) String picture, byte[] picByte, String pic_type, Branch branch, CarryBox carryBox,
			List<Order> orders, SubCategory subCategory) {
		super();
		this.itemId = itemId;
		this.itemName = itemName;
		this.itemDescription = itemDescription;
		this.itemPrice = itemPrice;
		this.speciality = speciality;
		this.active = active;
		this.type = type;
		this.quantity = quantity;
		this.picture = picture;
		this.picByte = picByte;
		this.pic_type = pic_type;
		this.branch = branch;
		this.carryBox = carryBox;
		this.orders = orders;
		this.subCategory = subCategory;
	}




	public int getItemId() {
		return itemId;
	}


	public void setItemId(int itemId) {
		this.itemId = itemId;
	}


	public String getItemName() {
		return itemName;
	}


	public void setItemName(String itemName) {
		this.itemName = itemName;
	}


	public String getItemDescription() {
		return itemDescription;
	}


	public void setItemDescription(String itemDescription) {
		this.itemDescription = itemDescription;
	}


	public double getItemPrice() {
		return itemPrice;
	}


	public void setItemPrice(double itemPrice) {
		this.itemPrice = itemPrice;
	}


	public String getSpeciality() {
		return speciality;
	}


	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}


	public boolean isActive() {
		return active;
	}


	public void setActive(boolean active) {
		this.active = active;
	}

	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getPicture() {
		return picture;
	}


	public void setPicture(String picture) {
		this.picture = picture;
	}


	public byte[] getPicByte() {
		return picByte;
	}


	public void setPicByte(byte[] picByte) {
		this.picByte = picByte;
	}


	public String getPic_type() {
		return pic_type;
	}


	public void setPic_type(String pic_type) {
		this.pic_type = pic_type;
	}

	@JsonIgnore
	public Branch getBranch() {
		return branch;
	}

	public void setBranch(Branch branch) {
		this.branch = branch;
	}
	
	@JsonIgnore
	public SubCategory getSubCategory() {
		return subCategory;
	}

	public void setSubCategory(SubCategory subCategory) {
		this.subCategory = subCategory;
	}

	@JsonIgnore
	public CarryBox getCarryBox() {
		return carryBox;
	}


	public void setCarryBox(CarryBox carryBox) {
		this.carryBox = carryBox;
	}

	@JsonIgnore
	public List<Order> getOrders() {
		return orders;
	}


	public void setOrdered(List<Order> orders) {
		this.orders = orders;
	}


}