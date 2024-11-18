const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = 'your_jwt_secret'; // Change this to a secure secret in production

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movieDB')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

    
// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User ', userSchema);

// Movie Schema
const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    releaseDate: Date,
});

const Movie = mongoose.model('Movie', movieSchema);

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.sendStatus(201);
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.sendStatus(401);
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Create Movie Route
app.post('/movies', authenticateJWT, async (req, res) => {
    const { title, description, releaseDate } = req.body;
    const movie = new Movie({ title, description, releaseDate });
    await movie.save();
    res.sendStatus(201);
});

// Get Movies Route
app.get('/movies', authenticateJWT, async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

// Update Movie Route
app.put('/movies/:id', authenticateJWT, async (req, res) => {
    const { title, description, releaseDate } = req.body;
    await Movie.findByIdAndUpdate(req.params.id, { title, description, releaseDate });
    res.sendStatus(204);
});

// Delete Movie Route
app.delete('/movies/:id', authenticateJWT, async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});