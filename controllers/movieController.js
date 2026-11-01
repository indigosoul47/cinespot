import asyncHandler from 'express-async-handler';
import Movie from '../models/movie.js';
import Library from '../models/library.js';
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const getRandTags = asyncHandler(async (req, res) => {
    const movies = await Movie.aggregate([{
        $sample: {
            size: 10
        }
    }]);

    const tags = movies.map(movie => movie.tags).flat()
    
    let filtered = tags.filter((tag, index) => tags.indexOf(tag) === index);

    let count = 0;

    while((filtered.length <= 6) && (count < 10)){
        const moreMovies = await Movie.aggregate([{
            $sample: {
                size: 10
            }
        }]);

        const moreTags = moreMovies.map(movie => movie.tags).flat();

        const moreFilt = moreTags.filter((tag, index) => moreTags.indexOf(tag) === index);
    
        filtered = filtered.concat(moreFilt);

        filtered = filtered.filter((tag, index) => filtered.indexOf(tag) === index);
    
        count++;
    }

    res.json({
        tags: filtered
        //.map(category => ({ ...category._doc, user: category.user.name }))
    });
})

const getMovies = asyncHandler(async (req, res) => {
    const pageSize = req.query.pSize && req.query.pSize > 0 ? req.query.pSize : 6;
    const page = Number(req.query.page) || 1;

    const  keyword  = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }: {};

    if(req.query.tags){
        keyword.tags = {
            $all: req.query.tags.split(',').map(tag => {
                return tag[0] === '#' ? tag.slice(1) : tag;
            })
        }
    }

    const movies = await Movie.aggregate([ 
        {
            $match: { ...keyword}
        },
        {
            $lookup: {
                from: 'libraries',
                localField: '_id',
                foreignField: 'movie',
                as: 'libraries'
            }
        },
        {
            $addFields: {
                added: {
                    $reduce: {
                    input: '$libraries',
                    initialValue: false,
                    in: {
                        $cond: [{
                                $and: [ 
                                    {$eq: [ "$$this.user", req.user && req.user._id ? ObjectId(req.user._id) : '' ]}, 
                                    {$eq: [ "$$this.added", true ]} 
                                ]  
                            },
                            true,
                            '$$value'
                        ]
                    }
                    }
                }
            }
        },
        // {
        //     $project: {
        //         libraries: 0
        //     }
        // },
        {
            $skip: +pageSize * (page - 1)
        },{
            $limit: parseInt(pageSize)
        }
    ])

    // console.log('Moovies', movies, req.user);
    
    res.json({
        page,
        total: movies.length,
        pages: Math.ceil(movies.length/ pageSize),
        movies: movies.map(movie => ({ ...movie }))
    });
});

const searchMovies = asyncHandler(async (req, res) => {
    const pageSize = req.query.pSize && req.query.pSize > 0 ? req.query.pSize : 6;
    const page = Number(req.query.page) || 1;

    const  keyword  = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }: {};

    if(req.query.tags){
        keyword.tags = {
            $all: req.query.tags.split(',').map(tag => {
                return tag[0] === '#' ? tag.slice(1) : tag;
            })
        }
    }

    const movies = await Movie.aggregate([ 
        {
            $vectorSearch: {
                query:{
                    text: req.query.keyword ? req.query.keyword : 'defaults'
                },
                path: "plot",
                numCandidates: 100,
                index: "vector_index",
                limit: 10,
            },
        },
        {
            $lookup: {
                from: 'libraries',
                localField: '_id',
                foreignField: 'movie',
                as: 'libraries'
            }
        },
        {
            $addFields: {
                added: {
                    $reduce: {
                    input: '$libraries',
                    initialValue: false,
                    in: {
                        $cond: [{
                                $and: [ 
                                    {$eq: [ "$$this.user", req.user && req.user._id ? ObjectId(req.user._id) : '' ]}, 
                                    {$eq: [ "$$this.added", true ]} 
                                ]  
                            },
                            true,
                            '$$value'
                        ]
                    }
                    }
                }
            }
        },
        // {
        //     $project: {
        //         libraries: 0
        //     }
        // },
        {
            $skip: +pageSize * (page - 1)
        },{
            $limit: parseInt(pageSize)
        }
    ])
    
    res.json({
        page,
        total: movies.length,
        pages: Math.ceil(movies.length/ pageSize),
        movies: movies.map(movie => ({ ...movie }))
    });
});

const getMovieById = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    const reviews = await Library.aggregate([{
        $match : {
            movie: ObjectId(req.params.id),
            $or: [ {rating: { $exists: true }}, {comment: { $exists: true }} ]
        }
    }, {
        $lookup:{
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
        }
    }, {
        $unwind: '$user'
    }, {
        $project: {
            'added': 0
        }
    }]);

    if(movie){
        res.json({
            ...movie._doc,
            reviews
        });
    }else{
        res.status(404);
        throw new Error('Movie not found');
    }
});

const createMovie = asyncHandler(async (req, res) => {
    const {
        name,
        plot,
        image,
        genre,
        cast,
        director,
        tags,
    } = req.body;

    const movie = new Movie({
        name,
        plot,
        images: [image],
        genre,
        director,
        tags: tags.map(tag => tag.startsWith('#') ? tag.slice(1) : tag),
        cast,
    });

    const created = await movie.save();
    res.status(201).json({ movie: created });
});

const updateMovie = asyncHandler(async (req, res) => {
    const {
        name,
        plot,
        image,
        genre,
        cast,
        director,
        tags
    } = req.body;

    const movie = await Movie.findById(req.params.id);

    if(movie){
        movie.name = name;
        movie.plot = plot;

        if(image.trim() !== ''){
            movie.images = [image];
        }

        movie.genre = genre,
        movie.tags = tags.map(tag => tag.startsWith('#') ? tag.slice(1) : tag),
        movie.cast = cast
        movie.director = director

        res.json(await movie.save());
    }else{
        res.status(404);
        throw new Error('Movie not found');
    }
});

const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if(movie){
        await movie.remove();
        res.json({ message: 'Movie removed successfully' });
    }else{
        res.status(404);
        throw new Error('Movie not found');
    }
});

export {
    getMovies,
    getMovieById,
    deleteMovie,
    updateMovie,
    createMovie,
    searchMovies,
    getRandTags
}