package com.techeazy.internship.parcel_service.service;

import com.techeazy.internship.parcel_service.dto.ParcelDTO;
import com.techeazy.internship.parcel_service.entity.Parcel;
import com.techeazy.internship.parcel_service.repository.ParcelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ParcelService {

    private final ParcelRepository parcelRepository;

    public Parcel createParcel(ParcelDTO parcelDTO) {
        Parcel parcel = new Parcel();
        parcel.setCustomerName(parcelDTO.getCustomerName());
        parcel.setDeliveryAddress(parcelDTO.getDeliveryAddress());
        parcel.setContactNumber(parcelDTO.getContactNumber());
        parcel.setTrackingNumber("TE-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        parcel.setParcelSize("Medium");
        parcel.setParcelWeight(5.0);
        return parcelRepository.save(parcel);
    }

    public List<Parcel> getAllParcels() {
        return parcelRepository.findAll();
    }

    // Admin uses the primary key 'Long id' for specific lookup
    public Optional<Parcel> getParcelById(Long id) {
        return parcelRepository.findById(id);
    }

    // Public users use the 'String trackingNumber'
    public Optional<Parcel> getParcelByTrackingNumber(String trackingNumber) {
        return parcelRepository.findByTrackingNumber(trackingNumber);
    }

    public Optional<Parcel> updateParcel(Long id, ParcelDTO parcelDetails) {
        return parcelRepository.findById(id).map(existingParcel -> {
            existingParcel.setCustomerName(parcelDetails.getCustomerName());
            existingParcel.setDeliveryAddress(parcelDetails.getDeliveryAddress());
            existingParcel.setContactNumber(parcelDetails.getContactNumber());
            return parcelRepository.save(existingParcel);
        });
    }

    public void deleteParcel(Long id) {
        parcelRepository.deleteById(id);
    }
}