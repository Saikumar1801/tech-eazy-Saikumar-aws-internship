package com.techeazy.internship.parcel_service;

import com.techeazy.internship.parcel_service.dto.LoginRequestDto;
import com.techeazy.internship.parcel_service.dto.LoginResponseDto;
import com.techeazy.internship.parcel_service.entity.Vendor;
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

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final VendorRepository vendorRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    // Optional: A simple registration endpoint to create vendors for testing
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody LoginRequestDto request) {
        if (vendorRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }
        Vendor vendor = new Vendor();
        vendor.setUsername(request.getUsername());
        vendor.setPassword(passwordEncoder.encode(request.getPassword()));
        vendor.setVendorName(request.getUsername()); // Simple default
        vendorRepository.save(vendor);
        return ResponseEntity.ok("Vendor registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        var vendor = vendorRepository.findByUsername(request.getUsername())
                .orElseThrow(); // Should not happen if authenticate passes
        var jwtToken = jwtService.generateToken(vendor);
        return ResponseEntity.ok(new LoginResponseDto(jwtToken));
    }
}