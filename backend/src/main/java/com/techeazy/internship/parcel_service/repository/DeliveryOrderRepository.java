package com.techeazy.internship.parcel_service.repository;

import com.techeazy.internship.parcel_service.entity.DeliveryOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface DeliveryOrderRepository extends JpaRepository<DeliveryOrder, Long> {

    @Query("SELECT do FROM DeliveryOrder do WHERE " +
           "(:vendorId IS NULL OR do.vendor.id = :vendorId) AND " +
           "(:date IS NULL OR do.orderDeliveryDate = :date)")
    Page<DeliveryOrder> findByFilters(
        @Param("vendorId") Long vendorId,
        @Param("date") LocalDate date,
        Pageable pageable
    );
}