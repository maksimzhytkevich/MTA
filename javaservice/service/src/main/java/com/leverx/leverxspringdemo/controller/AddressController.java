package com.leverx.leverxspringdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.leverxspringdemo.service.AddressService;
import com.leverx.leverxspringdemo.domain.Address;

@RestController
public class AddressController {
	
	@Autowired
	private AddressService addressService;
	
	@GetMapping(value="/address")
	public List<Address> getAllAddress() {
		return addressService.getAddressAll();
	}
	
	@GetMapping(value="/address/{id}")
	public Address getAddress(@PathVariable Integer id) {
		return addressService.getAddress(id);
	}
	
	@PostMapping(value="/address")
	public void createAddress(@RequestBody Address address) {
		addressService.createAddress(address);
	}
	
	@DeleteMapping(value="/address/{id}")
	public void deleteAddress(@PathVariable Integer id) {
		addressService.deleteAddress(id);
	}
	
	@PutMapping(value="/address")
	public void updateAddress(@RequestBody Address address) {
		addressService.updateAddress(address);
	}

}
