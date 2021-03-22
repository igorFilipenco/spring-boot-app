# spring-boot-react

Simple Spring-Boot project with ReactJs on frontend side;

Description:

*Backend tech-stack:

- Java 8
- Maven
- Spring-Boot
- Spring-Security
- Hibernate
- PostgreSQL
- Junit

*Frontend tech-stack:

- Webpack
- Babel
- ReactJS
- Redux
- React-Router
- Semantic-UI-React

How to install and start project you'll need to configure project:

- Install Java8, Maven
- Install PostgreSQL and add connection params to src/main/resources/application.properties
  in database params section
- run npm install in root directory to download frontend dependencies
- run npm start in root directory to build frontend module
- run mvn spring-boot:run in root project directory
- after this hibernate will create tables 'users' and 'role' in database. 
  You should execute some SQL query in your database to add roles(later will connect liquibase in will automate this operation):
      INSERT INTO role(name) VALUES('ROLE_TECHNICIAN'),('ROLE_ADMIN');
      
- in browser access http://localhost:8080/ 