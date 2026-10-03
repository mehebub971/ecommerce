#  E-Commerce Management System

A full-stack E-Commerce Management System built using **Java Spring Boot, React.js, and MySQL**.

The project provides product management, customer management, shopping cart, order processing, authentication, inventory management, and an admin dashboard.

---

##  Technologies Used

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Spring Security
- JWT Authentication
- Maven
- RESTful APIs
- Bean Validation
- Lombok

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Bootstrap
- Axios
- React Router

### Database

- MySQL

### Development Tools

- IntelliJ IDEA
- Git
- GitHub
- Postman



#  Project Architecture

                    E-Commerce System
                           │
              ┌────────────┴────────────┐
              │                         │
        React Frontend             Spring Boot
              │                         │
              │       REST APIs          │
              └────────────►─────────────┘
                                        │
                                  Spring Data JPA
                                        │
                                        ▼
                                      MySQL
