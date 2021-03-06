# Loan App Engine POC

Built using [Spring Boot](https://spring.io/projects/spring-boot) and [Angular](https://angular.io/). For simplicity the Angular app has been deployed to the Spring Boot static folder, allowing it to host it along with the backend.

Minimum Requirements:

    Install a JVM.

1. The Spring Boot app can be built using:

    mvnw clean install

2. Run the service:

    mvnw spring-boot:run

    Open http://localhost:8080/

Alternatively the Angular frontend can be started separately (requires NPM and Angular CLI (_npm install -g @angular/cli_):

    cd src/main/js/application/angularclient

    npm install (to initialize the project)

    ng serve --open (to start the frontend app)

    This will launch your browser at http://localhost:4200/