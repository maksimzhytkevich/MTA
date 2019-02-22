package com.leverx.leverxspringdemo.domain;

public class Address {
	
	private int id;
	
	private String userId;
	
	private String city;
	
	private String street;
	
	private int humanNumber;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public int getHumanNumber() {
		return humanNumber;
	}

	public void setHumanNumber(int humanNumber) {
		this.humanNumber = humanNumber;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}	

}
