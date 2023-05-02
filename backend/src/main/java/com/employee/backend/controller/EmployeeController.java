package com.employee.backend.controller;

import com.employee.backend.exception.UserNotFoundException;
import com.employee.backend.models.Employee;
import com.employee.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/employee")
    public Employee newEmployee(@RequestBody Employee newEmployee) {

//        String nicNumber = newEmployee.getNic();

//        Boolean isNewCard = false;
//        int len = nicNumber.length();
//        int year = 0;
//        int days = 0;
//        String gender = "Male";
//        int dayArray[] = {31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
//        int month = 0;
//        String BIRTHDAY;
//        long age = 0;
//        String birth = null;
//
//        if (len == 12) {
//            isNewCard = true;
//        }
//
//        if (isNewCard) {
//            year = Integer.parseInt(nicNumber.substring(0, 4));
//            days = Integer.parseInt(nicNumber.substring(4, 7));
//        } else {
//            year = Integer.parseInt(nicNumber.substring(0, 2));
//            days = Integer.parseInt(nicNumber.substring(2, 5));
//        }
//
//        if (days > 500) {
//            days = days - 500;
//            gender = "Female";
//        }
//
//        for (int i = 0; i < dayArray.length; i++) {
//            if (days > dayArray[i]) {
//                days = days - dayArray[i];
//            } else {
//                month = i + 1;
//                break;
//            }
//        }
//
//        if (isNewCard) {
//            BIRTHDAY = (year + "-" + String.format("%02d", month) + "-" + String.format("%02d", days));
//        } else {
//            BIRTHDAY = ((1900 + year) + "-" + String.format("%02d", month) + "-" + String.format("%02d", days));
//        }
//
//        if (BIRTHDAY.matches("((19|2[0-9])[0-9]{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])")) {
//            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
//            simpleDateFormat.setLenient(false);
//            try {
//                Date date = simpleDateFormat.parse(BIRTHDAY);
//                birth = String.valueOf(date);
//                //Get Birthday to Age
//                LocalDate startDate = LocalDate.parse((CharSequence) date);
//                LocalDate endDate = LocalDate.now();
//                //alternative of LocalDate.now() method
//                //calculates the amount of time between two specified temporal objects
//                age = ChronoUnit.YEARS.between(startDate, endDate);
//            } catch (ParseException e) {
//                System.out.println("Invalid birthday");
//            }
//        }
//
//        newEmployee.setAge((int) age);
//        newEmployee.setGender(gender);
//        newEmployee.setBirthday(birth);

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


        // calculate the birth date based on the days code
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

        return employeeRepository.save(newEmployee);
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

//    public static int getValues (String birthday) {
//        if (birthday.matches("((19|2[0-9])[0-9]{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])")) {
//            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
//            simpleDateFormat.setLenient(false);
//            try {
//                Date date = simpleDateFormat.parse(birthday);
//                return 1;
//            } catch (ParseException e) {
//                return 0;
//            }
//        }else {
//            return 0;
//        }
//    }
}
