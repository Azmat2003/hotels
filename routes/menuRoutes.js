import express from 'express';
import MenuItem from './../models/MenuItem.js'
import Person from '../models/Persons.js';

const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        const data = await MenuItem.find();

        console.log(`Data fetched from db`);

        res.status(200).json(data);
        

    } catch (error) {
        console.log('Error');
        res.status(500).send({error : 'Internal Server Error'});
    }
})

router.post('/', async (req, res) =>{
    try {
        const data = req.body;

        const newItem = new MenuItem(data);

        const responce = await newItem.save();

        console.log('data saved');
        res.status(200).json(responce);

    } catch (error) {
        console.log('Error');
        res.status(500).send(error);
    }
})

router.get('/:taste', async (req, res) =>{
    
    try {
        const taste = req.params.taste;
        if(taste=='sweet' || taste=='spicy' || taste=='sour'){
            const data = await MenuItem.find({taste: taste});
            console.log('data fetched');
            res.status(200).json(data);
        }
        else{
            res.status(404).json({error: 'Invalid taste'});
        }
    } catch (error) {
        res.status(500).json({error: 'Server side error'});
    }
})


export default router;