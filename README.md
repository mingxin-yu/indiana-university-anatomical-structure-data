# Indiana University Anatomical Structure Data App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Additional Library Used

Angular Material (mat-icon, mat-dialog)

FlexBox

## Components

### Anatomical Structures Component

  * This component make service call to the herokuapp server, parse the data into array of structures and display them.
  
  * This component handle situation when service is loading or failed and display proper messages.
  
  * A user can click on the name of the structure, and it opens a dialog with injected data of name and id.

### Structure Detail Popup

  * This component is an Angular material dialog with data of a structure's name and id.

  * This component make service call to the ebi service, parse the data into structure detail, and display them.

  * This component handle situation when service is loading or failed and display proper messages.

  * A user can click on the iri link and direct to this page.

## Service

### Anatomical Structures Service

  * getAnatomicalStructures

  * getStructureDetailByID
