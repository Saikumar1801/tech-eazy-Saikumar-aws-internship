package com.techeazy.internship.parcel_service.controller;

import com.techeazy.internship.parcel_service.dto.ParcelDTO;
import com.techeazy.internship.parcel_service.entity.Parcel;
import com.techeazy.internship.parcel_service.service.ParcelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parcels")
@CrossOrigin(origins = "http://localhost:3000")
public class ParcelController {

    private final ParcelService parcelService;

    public ParcelController(ParcelService parcelService) {
        this.parcelService = parcelService;
    }

    @PostMapping
    public Parcel createParcel(@RequestBody ParcelDTO parcelDTO) {
        return parcelService.createParcel(parcelDTO);
    }

    @GetMapping
    public List<Parcel> getAllParcels() {
        return parcelService.getAllParcels();
    }

    @GetMapping("/{Id}")
    public ResponseEntity<Parcel> getParcelById(@PathVariable String Id) {
        return parcelService.getParcelById(Id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{Id}")
    public ResponseEntity<Parcel> updateParcel(@PathVariable String Id, @RequestBody ParcelDTO parcelDTO) {
        return parcelService.updateParcel(Id, parcelDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{Id}")
    public ResponseEntity<Void> deleteParcel(@PathVariable String Id) {
        parcelService.deleteParcel(Id);
        return ResponseEntity.noContent().build();
    }
}