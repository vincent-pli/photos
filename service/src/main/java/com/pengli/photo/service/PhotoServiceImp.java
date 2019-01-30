package com.pengli.photo.service;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pengli.photo.domain.Filter;
import com.pengli.photo.domain.Photos;
import com.pengli.photo.repository.PhotoRepository;

@Component
public class PhotoServiceImp implements PhotoService{
	@Autowired
	private PhotoRepository photoRepository;
	
	@Override
	public Iterable<Photos> list(String filter, String range, String sort) {
		System.out.println("xxxxx");
		System.out.println(range);
		System.out.println(sort);
		System.out.println(filter);
		ObjectMapper mapper = new ObjectMapper();
		Filter filterObj = null;
		List<Integer> rangeList = null;
		List<String> sortList = null;
		try {
			filterObj = mapper.readValue(filter, Filter.class);
			rangeList = mapper.readValue(range, List.class);
			sortList = mapper.readValue(sort, List.class);
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println(filterObj);
		System.out.println(filterObj.getPerson());
		System.out.println(filterObj.getQ());
		System.out.println(rangeList);
		System.out.println(sortList);
		
		int start  = Integer.valueOf(rangeList.get(0));
		int end = Integer.valueOf(rangeList.get(1));
		int sizePerPage = end - start + 1;
		int page = (end + 1)/sizePerPage - 1;
		Pageable pageable = null;
		if(sortList.get(1).equals("DESC")) {
			pageable = PageRequest.of(page, sizePerPage, Sort.by(sortList.get(0)).descending());
		}
		else {
			pageable = PageRequest.of(page, sizePerPage, Sort.by(sortList.get(0)).ascending());
		}
		return photoRepository.findbyFilter(filterObj, pageable).getContent();
	}

	@Override
	public Photos get(Integer id) {
	
		return (Photos) photoRepository.findById(id).get();
	}

	@Override
	public void update(Photos photo) {
		photoRepository.save(photo);
		
	}

	@Override
	public void delete(Integer id) {
		photoRepository.deleteById(id);
		
	}

	@Override
	public int count() {
		return (int) photoRepository.count();

	}

}
