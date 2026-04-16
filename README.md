# Gender Classification API

A simple REST API that classifies a given name by gender using the Genderize API, processes the response, and returns a structured result with confidence evaluation.

---

## Live API

Base URL:

```
https://your-app-url.com
```

---

##  Endpoint

### GET `/api/classify`

Classifies a name and returns gender prediction data.

### 🔹 Query Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| name      | string | Yes      | Name to classify |

---

##  Success Response (200)

```json
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-01T12:00:00Z"
  }
}
```

---

## Error Responses

### 400 Bad Request

Missing name parameter

```json
{
  "status": "error",
  "message": "Name parameter is required"
}
```

---

### 422 Unprocessable Entity

Invalid name or no prediction available

```json
{
  "status": "error",
  "message": "Name must be a string"
}
```

OR

```json
{
  "status": "error",
  "message": "No prediction available for the provided name"
}
```

---

### 502 Bad Gateway

External API failure

```json
{
  "status": "error",
  "message": "Failed to fetch data from external API"
}
```

---

## How It Works

1. Accepts a `name` query parameter
2. Sends request to Genderize API
3. Extracts:

   * gender
   * probability
   * count → renamed to `sample_size`
4. Computes confidence:

   * `is_confident = true` if:

     * probability ≥ 0.7
     * sample_size ≥ 100
5. Adds timestamp (`processed_at`)
6. Returns structured response

---

## Confidence Logic

```
is_confident = (probability >= 0.7) AND (sample_size >= 100)
```

---

## Tech Stack

* Node.js
* Express.js
* Axios
* CORS
* dotenv

---

## Installation

```bash
git clone https://github.com/Owaboye/gender-classification-api.git
cd gender-api
npm install
```

##  Run Locally

```bash
npm start
```

Server runs on:

```
http://localhost:3000
```

---

## est Example

```bash
curl "http://localhost:4000/api/classify?name=john"
```

---

##  Deployment

This API can be deployed on:

* Vercel
* Railway
* Heroku
* AWS

---

## Performance

* Lightweight processing
* Non-blocking async requests
* Handles multiple concurrent requests

---

## 📁 Project Structure

```
.
├── index.js
├── package.json
├── .env
└── README.md
```

---

## 📌 Notes

* CORS is enabled for all origins (`*`)
* Timestamp is generated dynamically per request (UTC, ISO 8601)
* Designed to meet sub-500ms processing time (excluding API latency)

---

## 👨‍💻 Author

Your Name

---

## 📄 License

MIT License
