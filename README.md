# React-App

## ℹ️ General Info

This is the repository responsible for React-App app with list of tasks.

## 🏭 Applications

-   [Backend](./backend) — React-App application backend.

_To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

-   [Frontend](./frontend) — React-App application frontend.

  _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

  -   [Shared](./shared) — React-App application common modules for reuse.

  
## 🖍 Requirements

-   [NodeJS](https://nodejs.org/en/) (18.x.x);
-   [NPM](https://www.npmjs.com/) (9.x.x);
-   [PostgreSQL](https://www.postgresql.org/) (15.2)

## Start

Clone project`s [repo](https://github.com/ValentinaTenus/React-App):

### Shared
1.  In the command line (terminal) go to the folder shared:

    ```
    cd /* path to shared folder */

2.  in shared folder run 
     ```
    npm run build
    ```

### Backend

1.  In the command line (terminal) go to the folder backend:

    ```
    cd /* path to backend folder */

2.  In the backend folder create a file **.env** and copy the contents of the file **.env.example** into it.
 Replace in file **.env** key values to real.

3. Create database (for example tasks) 

4.  Run [migrations] and seeds to populate the database with demo data. To do this, in the command line (terminal) in the server folder, run:

    ```
    npm run migrate:dev
    npm run seed:run
    ```

    Check the database for demo data.

5.  To start the server in the command line (terminal) in the server folder, run:

    ```
    npm run start:dev

### Frontend

1.  In the command line (terminal) go to the `frontend` folder:

    ```
    cd /* path to frontend folder */
    ```
    ```
2.  In the `frontend` folder create a file **.env** and copy the contents of the file into it **.env.example**.

    Replace in file **.env** key values to real.

3.  To run the frontend from the command line (terminal) in the frontend folder, run:

    ```
    npm run start:dev
    ```
