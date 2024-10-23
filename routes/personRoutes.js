import express from 'express';
import Person from './../models/Persons.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched from db');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error : 'Internal server error'});

    }
})

router.post('/', async (req, res) => {
    
    try {
        // data sent from frontend, storing data using bodyParser
        const data = req.body;
        
        // creating a new Person object
        const newPerson = new Person(data);

        // saving data to db, which is asynchronous
        const response = await newPerson.save();
        console.log('data saved to db');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: `Internal Server Error`});
    }

})

router.get('/:work', async (req, res) => {
    
    try {
        const work = req.params.work;
        if(work=='chef' || work=='manager' || work=='waiter'){
            const data = await Person.find({work: work});
            console.log('data fetched');
            res.status(200).json(data);
        }
        else{
            res.status(404).json({error: 'Invalid work'});
        }
    } catch (error) {
        res.status(500).json({error: `Internal Server Error`});
    }

})

router.put('/:id', async (req,res)=>{
    
    try {
        const id = req.params.id;
        const newData = req.body;

        const response = await Person.findByIdAndUpdate(id, newData, {
            new: true,
            runValidators: true
        });
        
        console.log('Data updated');
        res.status(200).json(response);

    } catch (error) {
        if(error.name === 'CastError'){
            return res.status(404).json({error: 'Person does not exist'});
        }
        res.status(500).json({error: 'Server Error'});
    }
})

router.delete('/:id', async (req,res)=>{
    
    try {
        const id = req.params.id;
        const response = await Person.findByIdAndDelete(id);
        console.log('Data deleted');
        res.status(200).json({message : 'Person deleted'})

    } catch (error) {
        if(error.name === 'CastError'){
            return res.status(404).json({error: 'Person does not exist'});
        }
        res.status(500).json({error: 'Server Error'});
    }
})

export default router;