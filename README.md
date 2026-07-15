# ETL Demo (Node.js + MongoDB)

This project demonstrates a simple ETL (Extract, Transform, Load) process using Node.js and MongoDB.

## ETL Flow

- **Extract**: Read data from `contacts.csv` and `jobs.csv`.
- **Transform**:
  - Combine `f_name` + `l_name` into `name`.
  - Combine `address1` + `address2` into `address`.
  - Filter and map the CSV data into the required MongoDB structure.
- **Load**: Insert the transformed data into MongoDB.

> **Note:** This project does **not** create any API. It simply reads the CSV files, transforms the data in one function, and loads it into MongoDB.

## Project Structure

```
etl-demo/
│── data/
│   ├── contacts.csv
│   └── jobs.csv
│
│── models/
│   ├── Contact.js
│   └── Job.js
│
│── import.js
│── .env
│── package.json
```

## Setup

### 1. Create `.env`

```env
MONGO_URI=mongodb://localhost:27017/etl_demo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the ETL script

```bash
node import.js
```

After running the command, the script will:

- Read both CSV files.
- Transform the data.
- Insert contacts into the **contacts** collection.
- Insert jobs into the **jobs** collection.

## Technologies Used

- Node.js
- MongoDB
- Mongoose
- csv-parser
- dotenv
