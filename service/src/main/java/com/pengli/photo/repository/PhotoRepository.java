package com.pengli.photo.repository;

import com.pengli.photo.domain.Filter;
import com.pengli.photo.domain.Photos;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


public interface PhotoRepository extends CrudRepository<Photos, Integer>{
	
	@Query(value = "select p from Photos p where (:#{#filter.q} is null or p.describtion like %:#{#filter.q}%) and (:#{#filter.date} is null or p.date = :#{#filter.date}) and (:#{#filter.place} is null or p.place = :#{#filter.place}) and (:#{#filter.person} is null or :#{#filter.person} member of p.person)")
	Slice<Photos> findbyFilter(@Param("filter") Filter filter, Pageable pageable);

}
