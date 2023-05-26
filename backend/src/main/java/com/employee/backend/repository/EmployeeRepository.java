package com.employee.backend.repository;

import com.employee.backend.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

//    @Query(value = "SELECT * FROM employee WHERE " +
//            "(:name IS NULL OR name = :name) AND "+
//            "(:address IS NULL OR address = :address) AND "+
//            "(:nationality IS NULL OR nationality = :nationality) AND "+
//            "(:nic IS NULL OR nic = :nic) AND "+
//            "(:phone IS NULL OR phone = :phone) AND "+
//            "(:birthday IS NULL OR birthday = :birthday) "+
//            "(:age IS NULL OR ge = :age) "+
//            "(:gender IS NULL OR gender = :gender)", nativeQuery = true)
//    List<Employee> employeeMainSearch(@Param("name") String name, @Param("address") String address,
//                                      @Param("nationality") String nationality, @Param("nic") String nic,
//                                      @Param("phone") String phone, @Param("birthday") String birthday,
//                                      @Param("age") Integer age, @Param("gender") String gender);



//    @Query(value = "SELECT * FROM employee WHERE " +
//            "(:name IS NULL OR name = :name))", nativeQuery = true)
//    List<Employee> employeeMainSearch(@Param("name") String name);



    //Native Queries
    @Query(value = "SELECT * FROM employee WHERE " + "(:name IS NULL OR name = :name) AND "
            + "(:address IS NULL OR address = :address) AND " + "(:phone IS NULL OR phone = :phone) AND "
            + "(:nic IS NULL OR nic = :nic) AND " + "(:nationality IS NULL OR nationality = :nationality) AND "
            + "(:birthday IS NULL OR birthday = :birthday) AND " + "(:age IS NULL OR age = :age) AND "
            + "(:gender IS NULL OR gender = :gender)", nativeQuery = true)
    List<Employee> searchUsers(@Param("name") String userName, @Param("address") String userAddress,
                           @Param("phone") String userMobile, @Param("nic") String userNic,
                           @Param("nationality") String userNationality, @Param("birthday") String userBirthday,
                           @Param("age") Integer userAge, @Param("gender") String userGender);

}
//    @Query ("SELECT e FROM Employee e")
//    List<Employee> employeeMainSearch();


//    //NIC New or Old Count
//    @Query(value = "SELECT \n"
//            + "  CASE \n"
//            + "    WHEN nic >= '2020-01-01' THEN 'New NIC Range' \n"
//            + "    ELSE 'Old NIC Range' \n"
//            + "  END AS `NIC Range`, \n"
//            + "  COUNT(*) AS `NIC Count` \n"
//            + "FROM \n"
//            + "   `employee_db`.employee\n"
//            + "GROUP BY \n"
//            + "  `NIC Range`",nativeQuery = true)
//    List<Object> getCountNIC();
//
//    //Mobile Numbers Category Count
//    @Query(value = "SELECT \n"
//            + "    CASE\n"
//            + "        WHEN phone LIKE '078%' THEN 'Hutch'\n"
//            + "        WHEN phone LIKE '071%' THEN 'Mobitel'\n"
//            + "        WHEN phone LIKE '070%' THEN 'Mobitel'\n"
//            + "        WHEN phone LIKE '076%' THEN 'Dialog'\n"
//            + "        WHEN phone LIKE '077%' THEN 'Dialog'\n"
//            + "        WHEN phone LIKE '072%' THEN 'Hutch'\n"
//            + "        WHEN phone LIKE '075%' THEN 'Airtel'\n"
//            + "        ELSE 'Unknown'\n"
//            + "    END AS category, \n"
//            + "    COUNT(*) AS count\n"
//            + "FROM `employee_db`.employee\n"
//            + "GROUP BY category",nativeQuery = true)
//    List<Object> getCountMobile();
//
//
//    //Gender Category Count
//    @Query(value = "SELECT gender, COUNT(*) as count\n"
//            + "FROM `employee_db`.employee\n"
//            + "GROUP BY gender",nativeQuery = true)
//    List<Object> getCountGender();
//
//    //Age Category Count
//    @Query(value = "SELECT \n"
//            + "  CASE\n"
//            + "    WHEN age BETWEEN 0 AND 18 THEN '0-18'\n"
//            + "    WHEN age BETWEEN 19 AND 30 THEN '19-30'\n"
//            + "    WHEN age BETWEEN 31 AND 50 THEN '31-50'\n"
//            + "    WHEN age > 50 THEN '51+'\n"
//            + "  END AS age_category,\n"
//            + "  COUNT(*) AS count\n"
//            + "FROM  `employee_db`.employee\n"
//            + "GROUP BY age_category",nativeQuery = true)
//    List<Object> getCountAge();
//
//
//    //BirthYear Category Count
//    @Query(value = "SELECT \n"
//            + "    CONCAT(\n"
//            + "        FLOOR(EXTRACT(YEAR FROM birthday) / 10) * 10, \n"
//            + "        '-', \n"
//            + "        FLOOR(EXTRACT(YEAR FROM birthday) / 10) * 10 + 9\n"
//            + "    ) AS age_range, \n"
//            + "    COUNT(*) AS count\n"
//            + "FROM `employee_db`.employee\n"
//            + "GROUP BY age_range\n"
//            + "ORDER BY age_range ASC",nativeQuery = true)
//    List<Object> getCountBirthYear();

