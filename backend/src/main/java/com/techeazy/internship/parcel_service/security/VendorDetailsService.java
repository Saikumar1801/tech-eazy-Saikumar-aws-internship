package com.techeazy.internship.parcel_service.security;

import com.techeazy.internship.parcel_service.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VendorDetailsService implements UserDetailsService {
    private final VendorRepository vendorRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return vendorRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Vendor not found with username: " + username));
    }
}