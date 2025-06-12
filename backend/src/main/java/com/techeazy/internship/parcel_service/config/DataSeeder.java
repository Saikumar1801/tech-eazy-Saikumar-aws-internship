package com.techeazy.internship.parcel_service.config;

import com.techeazy.internship.parcel_service.entity.Role;
import com.techeazy.internship.parcel_service.entity.Vendor;
import com.techeazy.internship.parcel_service.repository.RoleRepository;
import com.techeazy.internship.parcel_service.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final VendorRepository vendorRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create roles if they don't exist
        Role adminRole = roleRepository.findByName("ADMIN").orElseGet(() -> roleRepository.save(createRole("ADMIN")));
        Role vendorRole = roleRepository.findByName("VENDOR").orElseGet(() -> roleRepository.save(createRole("VENDOR")));

        // Create a default admin user if it doesn't exist
        if (vendorRepository.findByUsername("admin").isEmpty()) {
            Vendor admin = new Vendor();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("adminpass"));
            admin.setVendorName("Site Administrator");
            admin.setRoles(Set.of(adminRole));
            vendorRepository.save(admin);
        }
    }

    private Role createRole(String name) {
        Role role = new Role();
        role.setName(name);
        return role;
    }
}