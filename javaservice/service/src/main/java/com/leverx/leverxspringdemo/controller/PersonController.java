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

import com.leverx.leverxspringdemo.domain.Person;
import com.leverx.leverxspringdemo.domain.Products;
import com.leverx.leverxspringdemo.service.PersonService;
import com.leverx.leverxspringdemo.service.ProductsODataService;

@RestController
public class PersonController {
	
	@Autowired
	private PersonService personService;
	
	@Autowired
	private ProductsODataService productsODataService;
	
	@GetMapping(value="/products")
	public List<Products> getAllProducts() {
		return productsODataService.getProductsAll();
	}
	
	@GetMapping(value="/person")
	public List<Person> getAllPerson() {
		return personService.getPersonAll();
	}
	
	@GetMapping(value="/personAddress/{id}")
	public List<String> getPersonAddress(@PathVariable String id) {
		return personService.getPersonAddress(id);
	}
	
	@GetMapping(value="/person/{id}")
	public Person getPerson(@PathVariable String id) {
		return personService.getPerson(id);
	}
	
	@PostMapping(value="/person")
	public void createPerson(@RequestBody Person person) {
		personService.createPerson(person);
	}
	
	@DeleteMapping(value="/person/{id}")
	public void deletePerson(@PathVariable String id) {
		personService.deletePerson(id);
	}
	
	@PutMapping(value="/person")
	public void updatePerson(@RequestBody Person person) {
		personService.updatePerson(person);
	}	
}