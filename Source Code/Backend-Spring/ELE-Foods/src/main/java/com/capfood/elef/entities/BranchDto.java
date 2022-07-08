package com.capfood.elef.entities;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

public class BranchDto {
	
	@Id
	@Column(name="BRANCHID")
	private int branchId;
	
	@NotEmpty(message=" Branch Name should not be empty")
	@Length(max=25)
	@Column(name="BRANCHREGION")
	private String branchRegion;
	
	@NotEmpty(message=" Branch City should not be empty")
	@Length(max=25)
	@Column(name="BRANCHCITY")
	private String branchCity;

	
	public BranchDto() {
		super();
		// TODO Auto-generated constructor stub
	}


	public BranchDto(int branchId,
			@NotEmpty(message = " Branch Name should not be empty") @Length(max = 25) String branchRegion,
			@NotEmpty(message = " Branch City should not be empty") @Length(max = 25) String branchCity) {
		super();
		this.branchId = branchId;
		this.branchRegion = branchRegion;
		this.branchCity = branchCity;
	}


	public int getBranchId() {
		return branchId;
	}


	public void setBranchId(int branchId) {
		this.branchId = branchId;
	}


	public String getBranchRegion() {
		return branchRegion;
	}


	public void setBranchRegion(String branchRegion) {
		this.branchRegion = branchRegion;
	}


	public String getBranchCity() {
		return branchCity;
	}


	public void setBranchCity(String branchCity) {
		this.branchCity = branchCity;
	}


	@Override
	public String toString() {
		return "BranchDto [branchId=" + branchId + ", branchRegion=" + branchRegion + ", branchCity=" + branchCity + "]";
	}

	
	
}
