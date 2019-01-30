package com.pengli.photo.domain.converter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class StringListConverter implements AttributeConverter<List<String>, String> {

	@Override
	public String convertToDatabaseColumn(List<String> attribute) {
		if(attribute != null) {
			return String.join("," ,attribute);
		}
		else {
			return "";
		}
	}

	@Override
	public List<String> convertToEntityAttribute(String dbData) {
		if(dbData != null) {
			return Arrays.asList(dbData.split(","));
		}
		else {
			return new ArrayList<String>();
		}
		
	}

}
