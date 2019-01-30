package com.pengli.photo.service;

import com.pengli.photo.domain.Photos;

public interface PhotoService {
	public Iterable<Photos> list(String filter, String range, String sort);
	
	public Photos get(Integer id);
	
	public void update(Photos photo);
	
	public void delete(Integer id);
	
	public int count();
}
