package com.techeazy.internship.parcel_service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Lombok: Generates getters, setters, equals, hashCode, and toString
@AllArgsConstructor // Lombok: Generates a constructor with all fields
@NoArgsConstructor // Lombok: Generates a no-argument constructor
public class Parcel {

    private String trackingNumber;
    private String customerName;
    private String deliveryAddress;
    private String contactNumber;
    private String parcelSize;
    private double parcelWeight;

}