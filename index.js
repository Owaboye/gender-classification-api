const express = require('express')
const axios = require('axios')
require('dotenv').config()
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors({
  origin: '*'
}))

app.get('/api/classify', async (req, res) => {
   

    try {
        const { name } = req.query

        if (!name) {
            return res.status(400).json({
                status: "error",
                message: "Name parameter is required"
            });
        }

       if (typeof name !== 'string' || name.trim() === '') {
            return res.status(422).json({
                status: "error",
                message: "Name must be a string"
            });
        }

        const cleanedName = name.trim().toLowerCase();

        const response = await axios.get(`https://api.genderize.io?name=${cleanedName}`);
        const data = response.data;

        const { gender, probability, count } = data;

        if (!gender || count === 0) {
            return res.status(422).json({
                status: "error",
                message: "No prediction available for the provided name"
            });
        }

        const sample_size = count;

        const is_confident = probability >= 0.7 && sample_size >= 100;

        const processed_at = new Date().toISOString();

        return res.status(200).json({
            status: "success",
            data: {
                name,
                gender,
                probability,
                sample_size,
                is_confident,
                processed_at
            }
        });
     } catch (error) {
        return res.status(502).json({
            status: "error",
            message: "Failed to fetch data from external API"
        });
    }

})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
