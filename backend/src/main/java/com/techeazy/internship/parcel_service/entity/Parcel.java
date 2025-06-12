package com.techeazy.internship.parcel_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*; // --- MAKE SURE THIS IMPORT IS PRESENT ---
import lombok.Data;

@Entity // <-- THIS IS THE PRIMARY FIX
@Data
public class Parcel {

    @Id // <-- EVERY ENTITY NEEDS A PRIMARY KEY
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String trackingNumber;
    private String customerName;
    private String deliveryAddress;
    private String contactNumber;
    private String parcelSize;
    private double parcelWeight;

    // This relationship is optional for now, but good to have
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_order_id")
    @JsonIgnore
    private DeliveryOrder deliveryOrder;
}