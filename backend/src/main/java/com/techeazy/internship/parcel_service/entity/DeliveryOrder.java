package com.techeazy.internship.parcel_service.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class DeliveryOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate orderDeliveryDate;
    private Integer totalOrders;
    private String fileLink; // Path to the uploaded file of parcels

    @Enumerated(EnumType.STRING)
    private SubscriptionType vendorSubscriptionType;

    // This defines the relationship: Many orders can belong to one vendor.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;
}