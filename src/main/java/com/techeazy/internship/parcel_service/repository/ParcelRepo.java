package com.techeazy.internship.parcel_service.repository;

import com.techeazy.internship.parcel_service.entity.Parcel;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class ParcelRepo {

    private final Map<String, Parcel> inMemoryStore = new ConcurrentHashMap<>();

    public Parcel save(Parcel parcel) {
        if (parcel.getTrackingNumber() == null || parcel.getTrackingNumber().isBlank()) {
            throw new IllegalArgumentException("Parcel must have a tracking number to be saved.");
        }
        inMemoryStore.put(parcel.getTrackingNumber(), parcel);
        return parcel;
    }

    public Optional<Parcel> findByTrackingNumber(String trackingNumber) {
        return Optional.ofNullable(inMemoryStore.get(trackingNumber));
    }

    public List<Parcel> findAll() {
        return new ArrayList<>(inMemoryStore.values());
    }

    public void deleteByTrackingNumber(String trackingNumber) {
        inMemoryStore.remove(trackingNumber);
    }
}