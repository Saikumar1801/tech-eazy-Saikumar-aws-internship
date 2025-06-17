package com.techeazy.internship.parcel_service.controller;

import com.techeazy.internship.parcel_service.entity.DeliveryOrder;
import com.techeazy.internship.parcel_service.entity.Vendor;
import com.techeazy.internship.parcel_service.service.DeliveryOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/api/delivery-orders")
@RequiredArgsConstructor
public class DeliveryOrderController {

    private final DeliveryOrderService deliveryOrderService;

    @PostMapping("/upload")
    public ResponseEntity<DeliveryOrder> uploadOrderFile(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal Vendor vendor
    ) {
        if (vendor == null) {
            return ResponseEntity.status(401).build();
        }
        DeliveryOrder deliveryOrder = deliveryOrderService.storeFileAndCreateOrder(file, vendor);
        return ResponseEntity.ok(deliveryOrder);
    }

    @GetMapping
    public ResponseEntity<Page<DeliveryOrder>> getDeliveryOrders(
            @RequestParam Optional<Long> vendorId,
            @RequestParam Optional<LocalDate> date,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<DeliveryOrder> deliveryOrders = deliveryOrderService.getDeliveryOrders(
                vendorId.orElse(null),
                date.orElse(null),
                pageable
        );
        return ResponseEntity.ok(deliveryOrders);
    }
}