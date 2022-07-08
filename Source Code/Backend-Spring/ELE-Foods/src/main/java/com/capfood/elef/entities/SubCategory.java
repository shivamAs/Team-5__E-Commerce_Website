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

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="ELEF_SUBCATEGORY")
public class SubCategory{

	@Id
	@Column(name="SUBCATEGORYID")
	private int subCategoryId;
	
	@Column(name="SUBCATEGORYNAME")
	@Length(max=15)
	private String subCategoryName;
	
	@OneToMany(mappedBy="subCategory")
	private List<Item> items;
	

	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="category")
	private Category category;
	

	
	public SubCategory() {
		
	}

	public SubCategory(int subCategoryId, @Length(max = 15) String subCategoryName, List<Item> items,
			Category category) {
		super();
		this.subCategoryId = subCategoryId;
		this.subCategoryName = subCategoryName;
		this.items = items;
		this.category = category;
	}

	public int getSubCategoryId() {
		return subCategoryId;
	}

	public void setSubCategoryId(int subCategoryId) {
		this.subCategoryId = subCategoryId;
	}

	public String getSubCategoryName() {
		return subCategoryName;
	}

	public void setSubCategoryName(String subCategoryName) {
		this.subCategoryName = subCategoryName;
	}

	@JsonIgnore
	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}


	
    
}