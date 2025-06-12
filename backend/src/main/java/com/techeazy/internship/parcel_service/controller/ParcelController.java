package com.techeazy.internship.parcel_service.controller;

import com.techeazy.internship.parcel_service.dto.ParcelDTO;
import com.techeazy.internship.parcel_service.entity.Parcel;
import com.techeazy.internship.parcel_service.service.ParcelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ParcelController {

    private final ParcelService parcelService;

    // === ADMIN-ONLY ENDPOINTS (using numeric ID) ===
    @PostMapping("/api/parcels")
    public Parcel createParcel(@RequestBody ParcelDTO parcelDTO) {
        return parcelService.createParcel(parcelDTO);
    }

    @GetMapping("/api/parcels")
    public List<Parcel> getAllParcels() {
        return parcelService.getAllParcels();
    }

    @GetMapping("/api/parcels/{id}")
    public ResponseEntity<Parcel> getParcelById(@PathVariable Long id) {
        return parcelService.getParcelById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/api/parcels/{id}")
    public ResponseEntity<Parcel> updateParcel(@PathVariable Long id, @RequestBody ParcelDTO parcelDetails) {
        return parcelService.updateParcel(id, parcelDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/api/parcels/{id}")
    public ResponseEntity<Void> deleteParcel(@PathVariable Long id) {
        parcelService.deleteParcel(id);
        return ResponseEntity.noContent().build();
    }


    // === PUBLIC ENDPOINT (using String trackingId) ===
    @GetMapping("/api/public/parcels/{trackingId}")
    public ResponseEntity<Parcel> getPublicParcelByTrackingId(@PathVariable String trackingId) {
        return parcelService.getParcelByTrackingNumber(trackingId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}