package com.pengli.photo.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import com.pengli.photo.domain.converter.StringListConverter;

@Entity
@Table(name = "PHOTOS")
public class Photos {
	@Id
	private Integer id;
	
	private String name;
	
	private String thumbnail;
	
	private String describtion;
	
	private String date;
	
	@ElementCollection
//	@Convert(converter = StringListConverter.class)
    @CollectionTable(
            name = "PERSONS",
            joinColumns=@JoinColumn(name = "id")
        )
    @Column(name="person")
	private List<String> person = new ArrayList<String>();
	
	private String place;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public String getDescribtion() {
		return describtion;
	}

	public void setDescribtion(String describtion) {
		this.describtion = describtion;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public List<String> getPerson() {
		return person;
	}

	public void setPerson(List<String> person) {
		this.person = person;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}
	
}
