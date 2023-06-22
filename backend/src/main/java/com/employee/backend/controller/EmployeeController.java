package com.employee.backend.controller;

import com.employee.backend.exception.UserNotFoundException;
import com.employee.backend.models.Employee;
import com.employee.backend.repository.EmployeeRepository;
import com.employee.backend.response.ResponseHandler;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/employee")
    public Employee newEmployee(@RequestBody Employee newEmployee) {

        String nicNumber = newEmployee.getNic();

        // extract the birth year, days, and gender code from the NIC number
        int birthYear = 0;
        int days = 0;
        int genderCode = 0;

        var oldnic= Integer.parseInt( nicNumber.substring(2, 5));
        var newnic = Integer.parseInt( nicNumber.substring(4, 7));

        if (nicNumber.length() == 10 && (oldnic <= 366 || (oldnic >= 501 && oldnic <= 866))) {
            birthYear = 1900 + Integer.parseInt(nicNumber.substring(0, 2));
            days = Integer.parseInt(nicNumber.substring(2, 5));
            genderCode = Integer.parseInt(nicNumber.substring(2, 5));
        } else if (nicNumber.length() == 12 && (newnic <= 366 || (newnic >= 501 && newnic <= 866))) {
            birthYear = Integer.parseInt(nicNumber.substring(0, 4));
            days = Integer.parseInt(nicNumber.substring(4, 7));
            genderCode = Integer.parseInt(nicNumber.substring(4, 7));
        } else {
            throw new IllegalArgumentException("Invalid NIC number: " + nicNumber);
        }

        // adjust the day value based on the birth year and the type of NIC number
        if (days > 500 && days < 1000) {
            days -= 500;
        }


        // calculate the birthday based on the days code
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyDDD");
        LocalDate birthDate = LocalDate.parse(String.format("%04d%03d", birthYear, days), formatter);

        // calculate the age
        int age = Period.between(birthDate, LocalDate.now()).getYears();

        // determine the gender
        String gender = genderCode > 500 ? "Female" : "Male";

        // set the birthday, age, and gender on the NIC object
        newEmployee.setBirthday(birthDate);
        newEmployee.setAge(age);
        newEmployee.setGender(gender);

//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        String hashedPassword = passwordEncoder.encode(newEmployee.getPassword());
//        newEmployee.setPassword(hashedPassword);

        return employeeRepository.save(newEmployee);

    }

    private boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("admin"))) {
            return true;
        }
        return false;
    }

    @GetMapping("/employees")
    public List<Employee> getAllEmployee(){
        return employeeRepository.findAll();
    }

    @GetMapping("/employee/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
            return employeeRepository.findById(id)
                    .orElseThrow(()-> new UserNotFoundException(id));
    }

    @PutMapping("/employee/{id}")
    public Employee updateEmployee(@RequestBody Employee newEmployee, @PathVariable Long id){
        return  employeeRepository.findById(id)
            .map(employee -> {

                employee.setName(newEmployee.getName());
                employee.setEmail(newEmployee.getEmail());
                employee.setPassword(newEmployee.getPassword());
                employee.setAddress(newEmployee.getAddress());
                employee.setNationality(newEmployee.getNationality());
                employee.setNic(newEmployee.getNic());
                employee.setPhone(newEmployee.getPhone());
                return employeeRepository.save(employee);
            }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/employee/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        if(!employeeRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        employeeRepository.deleteById(id);
        return "Employee with id : " + id + " has been deleted successfully..!";
    }

    @GetMapping("/mainSearch")
    public ResponseEntity<List<Employee>> searchUsers(
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "address", required = false) String address,
            @RequestParam(name = "phone", required = false) String phone,
            @RequestParam(name = "nic", required = false) String nic,
            @RequestParam(name = "nationality", required = false) String nationality,
            @RequestParam(name = "birthday", required = false) String birthday,
            @RequestParam(name = "age", required = false) Integer age,
            @RequestParam(name = "gender", required = false) String gender){

        List<Employee> filteredUsers = employeeRepository.searchUsers(name, address, phone, nic, nationality, birthday, age, gender);

        if (filteredUsers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(filteredUsers, HttpStatus.OK);
        }
    }

    public Employee authenticateEmployee(String email, String password) {
        return employeeRepository.findByEmailAndPassword(email, password);
    }

//    @PostMapping("/login")
//    public ResponseEntity<Object> login(@RequestBody Employee loginForm){
//        String email = loginForm.getEmail();
//        String password = loginForm.getPassword();
//
//        Employee employee = authenticateEmployee(email, password);
//        if (employee != null){
//            return ResponseHandler.responseBuilder("Employee Login Successfully.", HttpStatus.OK, authenticateEmployee(email, password));
//        } else {
//            Map<String, String> errorResponse = new HashMap<>();
//            errorResponse.put("message", "Request User Not Found");
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
//        }
//    }

    @PostMapping("/login")
    public ResponseEntity<Object> handleLogin(@RequestBody Employee loginRequest) {
        // Perform authentication logic here
        // Assuming you have a UserService to handle user authentication
        boolean isAuthenticated = loginRequest.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        if (isAuthenticated) {
            // Authentication succeeded
            String role = loginRequest.getUserRole(loginRequest.getEmail());
            if (role.equals("admin")) {
                // Return admin role in the response
                return ResponseEntity.ok().body(new Employee("admin"));
            } else {
                // Return user role in the response
                return ResponseEntity.ok().body(new Employee("user"));
            }
        } else {
            // Authentication failed
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed"));
        }
    }
}
