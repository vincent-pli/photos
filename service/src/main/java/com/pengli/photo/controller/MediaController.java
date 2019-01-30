package com.pengli.photo.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.pengli.photo.domain.Photos;
import com.pengli.photo.service.PhotoService;




@RestController
public class MediaController {
	@Autowired
	private PhotoService service;
	
	@RequestMapping(value = "/photos", method = RequestMethod.GET)
    public @ResponseBody Iterable<Photos> list(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(name = "filter", required = false) String filter,
			@RequestParam(name ="range", required = false) String range,
			@RequestParam(name ="sort", required = false) String sort) {
		
		Iterable<Photos> list = service.list(filter, range, sort);
		
		response.setHeader("Content-Range", String.valueOf(service.count()));
		return list;
    }
	
	@RequestMapping(path = "/photos/{id}", method = RequestMethod.GET)
	public @ResponseBody Photos get(@PathVariable(name = "id") Integer id){
		
		return service.get(id);
	}
	
	@RequestMapping(path = "/photos/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable(name = "id") String id, @RequestBody(required = false) Photos paylod){
		service.update(paylod);
	}
	
	@RequestMapping(path = "/photos/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable(name = "id") String id){
		service.delete(Integer.valueOf(id));

	}
}
