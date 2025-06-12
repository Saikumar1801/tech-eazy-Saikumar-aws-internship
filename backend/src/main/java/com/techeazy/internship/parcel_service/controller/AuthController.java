package com.techeazy.internship.parcel_service.controller;

import com.techeazy.internship.parcel_service.dto.LoginRequestDto;
import com.techeazy.internship.parcel_service.dto.LoginResponseDto;
import com.techeazy.internship.parcel_service.entity.Role;
import com.techeazy.internship.parcel_service.entity.Vendor;
import com.techeazy.internship.parcel_service.repository.RoleRepository;
import com.techeazy.internship.parcel_service.repository.VendorRepository;
import com.techeazy.internship.parcel_service.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final VendorRepository vendorRepository;
    private final RoleRepository roleRepository; // Injected to find roles
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody LoginRequestDto request) {
        if (vendorRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }

        // Find the VENDOR role from the database.
        Role vendorRole = roleRepository.findByName("VENDOR")
                .orElseThrow(() -> new RuntimeException("Error: VENDOR role not found. Please run the DataSeeder."));

        Vendor vendor = new Vendor();
        vendor.setUsername(request.getUsername());
        vendor.setVendorName(request.getUsername());
        vendor.setPassword(passwordEncoder.encode(request.getPassword()));
        vendor.setRoles(Set.of(vendorRole)); // Assign the VENDOR role
        vendorRepository.save(vendor);
        return ResponseEntity.ok("Vendor registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        var vendor = vendorRepository.findByUsername(request.getUsername()).orElseThrow();
        var jwtToken = jwtService.generateToken(vendor);
        return ResponseEntity.ok(new LoginResponseDto(jwtToken));
    }
}