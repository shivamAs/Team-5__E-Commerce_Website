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
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity
@Table(name="ELEF_CATEGORY")
public class Category 
{


	@Id
	@Column(name="CATEGORYID")
	private int categoryId;
	
	@NotEmpty(message="category Name should not be empty")
	@Column(name="CATEGORYNAME")
	@Length(max=15)
	private String categoryName;
	
	
	@OneToMany(mappedBy="category")
	private List<SubCategory> subCategories;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="branch")
	private Branch branch;
	

	
	public Category() {
		
	}

	public Category(int categoryId, @NotEmpty(message = "category Name should not be empty") String categoryName,
			List<SubCategory> subCategories, Branch branch) {
		super();
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.subCategories = subCategories;
		this.branch = branch;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public List<SubCategory> getSubCategories() {
		return subCategories;
	}

	public void setSubCategories(List<SubCategory> subCategories) {
		this.subCategories = subCategories;
	}

	@JsonIgnore
	public Branch getBranch() {
		return branch;
	}

	public void setBranch(Branch branch) {
		this.branch = branch;
	}


	
}