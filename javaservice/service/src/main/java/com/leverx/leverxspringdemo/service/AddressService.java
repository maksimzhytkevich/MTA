package com.leverx.leverxspringdemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.leverxspringdemo.dao.AddressDao;
import com.leverx.leverxspringdemo.domain.Address;

@Service
public class AddressService {
	
	@Autowired
	private AddressDao addressDao;
	
	public List<Address> getAddressAll() {
		return addressDao.getAll();
	}
	
	public Address getAddress(Integer id) {
		Optional<Address> addressOptional = this.addressDao.getById(id);
		Address address = null;
		if (addressOptional.isPresent()) {
			address = addressOptional.get();
		}
		return address;
	}
	
	public void createAddress(Address address) {
		this.addressDao.save(address);
	}
	
	public void updateAddress(Address address) {
		this.addressDao.update(address);
	}
	
	public void deleteAddress(Integer id) {
		this.addressDao.delete(id);
	}
}
