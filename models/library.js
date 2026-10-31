import mongoose from "mongoose";

const librarySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Movie'
    },
    rating: {
        type: Number,
    },
    comment: {
        type: String
    },
    added: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Library = mongoose.model('Library', librarySchema);

export default Library;