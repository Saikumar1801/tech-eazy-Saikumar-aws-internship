package com.techeazy.internship.parcel_service.service;

import com.techeazy.internship.parcel_service.dto.ParcelDTO;
import com.techeazy.internship.parcel_service.entity.Parcel;
import com.techeazy.internship.parcel_service.repository.ParcelRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ParcelService {

    private final ParcelRepo parcelRepo;

    public ParcelService(ParcelRepo parcelRepo) {
        this.parcelRepo = parcelRepo;
    }

    public Parcel createParcel(ParcelDTO parcelDTO) {
        String trackingNumber = "TE-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Parcel newParcel = new Parcel(
                trackingNumber,
                parcelDTO.getCustomerName(),
                parcelDTO.getDeliveryAddress(),
                parcelDTO.getContactNumber(),
                "Medium",
                5.0
        );

        return parcelRepo.save(newParcel);
    }

    public List<Parcel> getAllParcels() {
        return parcelRepo.findAll();
    }

    public Optional<Parcel> getParcelById(String Id) {
        return parcelRepo.findByTrackingNumber(Id);
    }


    public void deleteParcel(String Id) {
        parcelRepo.deleteByTrackingNumber(Id);
    }


    public Optional<Parcel> updateParcel(String Id, ParcelDTO updateData) {
        return parcelRepo.findByTrackingNumber(Id)
                .map(existingParcel -> {
                    existingParcel.setCustomerName(updateData.getCustomerName());
                    existingParcel.setDeliveryAddress(updateData.getDeliveryAddress());
                    existingParcel.setContactNumber(updateData.getContactNumber());
                    return parcelRepo.save(existingParcel);
                });
    }
}