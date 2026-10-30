import mongoose from "mongoose";
import dotenv from "dotenv";
import movies from "../data/movies.js";
import users from "../data/users.js";
import Movie from "../models/movie.js";
import User from "../models/user.js";
import connectDB from "../config/db.js";

dotenv.config();

await connectDB();

const importData = async () => {
    try {
        await destroyData(false);

        const userSeed = await User.insertMany(users);

        const movieSeed = movies.map(movie => ({
            images: [movie.images],
            name: movie.name,
            cast: [movie['Star1'], movie['Star2'], movie['Star3'], movie['Star4']],
            release: movie['Release'],
            runtime:  movie['Rumtime'],
            plot: movie.plot,
            director: [movie['Director']],
            genre: movie['Genre']
        }));

        //console.log('Data Seed', movieSeed)

        await Movie.insertMany(movieSeed);

        console.log('[Data] Completed Successfully');
        process.exit();
    } catch (error) {
        console.error(`[Error] ${error}`);
        process.exit(1);
    }
}

const destroyData = async (exit = true) => {
    try {
        await Movie.deleteMany();
        await User.deleteMany();

        console.log('[Data] Destroyed Successfully');
        exit && process.exit();
    } catch (error) {
        console.error(`[Error] ${error}`);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}