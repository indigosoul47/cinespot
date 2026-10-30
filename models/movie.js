import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    plot: {
        type: String
    },
    images: [
        String
    ],
    genre: {
        type: String,
    },
    runtime: {
        type: String,
    },
    cast: [
        String
    ],
    director: [
        String
    ],
    tags: [
        String
    ],
    release: {
        type: String
    }
}, {
    timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;