package com.employee.backend.repository;

import com.employee.backend.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {


    //NIC New or Old Count
    @Query(value = "SELECT \n"
            + "  CASE \n"
            + "    WHEN nic >= '2020-01-01' THEN 'New NIC Range' \n"
            + "    ELSE 'Old NIC Range' \n"
            + "  END AS `NIC Range`, \n"
            + "  COUNT(*) AS `NIC Count` \n"
            + "FROM \n"
            + "   `employee_db`.employee\n"
            + "GROUP BY \n"
            + "  `NIC Range`",nativeQuery = true)
    List<Object> getCountNIC();

    //Mobile Numbers Category Count
    @Query(value = "SELECT \n"
            + "    CASE\n"
            + "        WHEN phone LIKE '078%' THEN 'Hutch'\n"
            + "        WHEN phone LIKE '071%' THEN 'Mobitel'\n"
            + "        WHEN phone LIKE '070%' THEN 'Mobitel'\n"
            + "        WHEN phone LIKE '076%' THEN 'Dialog'\n"
            + "        WHEN phone LIKE '077%' THEN 'Dialog'\n"
            + "        WHEN phone LIKE '072%' THEN 'Hutch'\n"
            + "        WHEN phone LIKE '075%' THEN 'Airtel'\n"
            + "        ELSE 'Unknown'\n"
            + "    END AS category, \n"
            + "    COUNT(*) AS count\n"
            + "FROM `employee_db`.employee\n"
            + "GROUP BY category",nativeQuery = true)
    List<Object> getCountMobile();


    //Gender Category Count
    @Query(value = "SELECT gender, COUNT(*) as count\n"
            + "FROM `employee_db`.employee\n"
            + "GROUP BY gender",nativeQuery = true)
    List<Object> getCountGender();

    //Age Category Count
    @Query(value = "SELECT \n"
            + "  CASE\n"
            + "    WHEN age BETWEEN 0 AND 18 THEN '0-18'\n"
            + "    WHEN age BETWEEN 19 AND 30 THEN '19-30'\n"
            + "    WHEN age BETWEEN 31 AND 50 THEN '31-50'\n"
            + "    WHEN age > 50 THEN '51+'\n"
            + "  END AS age_category,\n"
            + "  COUNT(*) AS count\n"
            + "FROM  `employee_db`.employee\n"
            + "GROUP BY age_category",nativeQuery = true)
    List<Object> getCountAge();


    //BirthYear Category Count
    @Query(value = "SELECT \n"
            + "    CONCAT(\n"
            + "        FLOOR(EXTRACT(YEAR FROM birthday) / 10) * 10, \n"
            + "        '-', \n"
            + "        FLOOR(EXTRACT(YEAR FROM birthday) / 10) * 10 + 9\n"
            + "    ) AS age_range, \n"
            + "    COUNT(*) AS count\n"
            + "FROM `employee_db`.employee\n"
            + "GROUP BY age_range\n"
            + "ORDER BY age_range ASC",nativeQuery = true)
    List<Object> getCountBirthYear();

}