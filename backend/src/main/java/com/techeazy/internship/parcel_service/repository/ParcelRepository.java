package com.techeazy.internship.parcel_service.repository;

import com.techeazy.internship.parcel_service.entity.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ParcelRepository extends JpaRepository<Parcel, Long> {

    Optional<Parcel> findByTrackingNumber(String trackingNumber);
}