package com.techeazy.internship.parcel_service.repository;

import com.techeazy.internship.parcel_service.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VendorRepository extends JpaRepository<Vendor, Long> {
    Optional<Vendor> findByUsername(String username);
}