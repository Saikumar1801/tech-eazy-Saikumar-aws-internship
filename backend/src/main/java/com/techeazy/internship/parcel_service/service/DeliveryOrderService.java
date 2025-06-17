package com.techeazy.internship.parcel_service.service;

import com.techeazy.internship.parcel_service.entity.DeliveryOrder;
import com.techeazy.internship.parcel_service.entity.SubscriptionType;
import com.techeazy.internship.parcel_service.entity.Vendor;
import com.techeazy.internship.parcel_service.repository.DeliveryOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;

@Service
public class DeliveryOrderService {

    private final DeliveryOrderRepository deliveryOrderRepository;
    private final Path fileStorageLocation;

    // Constructor to initialize the repository and create the uploads directory
    public DeliveryOrderService(DeliveryOrderRepository deliveryOrderRepository) {
        this.deliveryOrderRepository = deliveryOrderRepository;
        this.fileStorageLocation = Paths.get("./uploads").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory for uploads.", ex);
        }
    }

    public DeliveryOrder storeFileAndCreateOrder(MultipartFile file, Vendor vendor) {
        // 1. Sanitize and store the file
        String fileName = vendor.getUsername() + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path targetLocation = this.fileStorageLocation.resolve(fileName);
        try {
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName, ex);
        }

        // 2. Count lines for totalOrders (simple implementation)
        long totalOrders;
        try {
            totalOrders = Files.lines(targetLocation).count();
        } catch (IOException e) {
            throw new RuntimeException("Could not read file to count orders.", e);
        }

        // 3. Create and save the DeliveryOrder entity
        DeliveryOrder deliveryOrder = new DeliveryOrder();
        deliveryOrder.setVendor(vendor);
        deliveryOrder.setOrderDeliveryDate(LocalDate.now());
        deliveryOrder.setFileLink(targetLocation.toString()); // Store the server path
        deliveryOrder.setTotalOrders((int) totalOrders);
        deliveryOrder.setVendorSubscriptionType(SubscriptionType.NORMAL);

        return deliveryOrderRepository.save(deliveryOrder);
    }

    public Page<DeliveryOrder> getDeliveryOrders(Long vendorId, LocalDate date, Pageable pageable) {
        return deliveryOrderRepository.findByFilters(vendorId, date, pageable);
    }
}