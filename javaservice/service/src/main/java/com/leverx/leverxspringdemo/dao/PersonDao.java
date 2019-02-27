package com.leverx.leverxspringdemo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leverx.leverxspringdemo.dao.intfce.IPersonDao;
import com.leverx.leverxspringdemo.domain.Person;

@Repository
public class PersonDao implements IPersonDao {

	private static final Logger logger = LoggerFactory.getLogger(PersonDao.class);
	
	private static final String userTable = "test03::User";
	private static final String addressTable = "test03::Address";

	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<Person> getById(String id) {
		Optional<Person> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"SELECT TOP 1 * FROM \"" + userTable + "\" WHERE \"usid\" = ?")) {
			stmnt.setString(1, id);
			ResultSet result = stmnt.executeQuery();
			if (result.next()) {
				Person person = new Person();
				person.setId(id);
				person.setName(result.getString("name"));
				person.setCreationDate(result.getTimestamp("creationDate"));
				person.setUpdateDate(result.getTimestamp("updateDate"));
				entity = Optional.of(person);
			} else {
				entity = Optional.empty();
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get entity by Id: " + e.getMessage());
		}
		return entity;
	}
	
	public List<String> getPersonAddress(String id) {
		List<String> list = new ArrayList<String>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("SELECT * FROM \"" + userTable + "\" INNER JOIN \"" + addressTable + "\" ON \"" + userTable + "\".\"usid\" = \"" + addressTable + "\".\"usid\" WHERE \"" + userTable + "\".\"usid\" = ?")) {
			stmnt.setString(1, id);
			ResultSet result = stmnt.executeQuery();				
			while (result.next()) {
				list.add(result.getString("name"));
				list.add(result.getString("city"));
			}					
		} catch (SQLException e) {
			logger.error("Error while trying to get entity by Id: " + e.getMessage());
		}
		
		return list;
	}

	@Override
	public List<Person> getAll() {
		List<Person> personList = new ArrayList<Person>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement("SELECT * FROM \"" + userTable + "\"")) {
			ResultSet result = stmnt.executeQuery();
			while (result.next()) {
				Person person = new Person();
				person.setId(result.getString("usid"));
				person.setName(result.getString("name"));
				person.setCreationDate(result.getTimestamp("creationDate"));
				person.setUpdateDate(result.getTimestamp("updateDate"));
				personList.add(person);
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get list of entities: " + e.getMessage());
		}
		return personList;
	}

	@Override
	public void save(Person entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"INSERT INTO \"" + userTable + "\"(\"name\") VALUES (?)")) {
			stmnt.setString(1, entity.getName());
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(String id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM \"" + userTable + "\" WHERE \"usid\" = ?")) {
			stmnt.setString(1, id);
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to delete entity: " + e.getMessage());
		}
	}

	@Override
	public void update(Person entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"UPDATE \"" + userTable + "\" SET \"name\" = ? WHERE \"usid\" = ?")) {
			stmnt.setString(1, entity.getName());
			stmnt.setString(2, entity.getId());
			stmnt.executeUpdate();
		} catch (SQLException e) {
			logger.error("Error while trying to update entity: " + e.getMessage());
		}
	}

}
