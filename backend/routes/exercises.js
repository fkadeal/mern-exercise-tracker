const router = require('express').Router();
const Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('error: '+ err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const discription = req.body.discription;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercsie = new Exercise({
        username,
        discription,
        duration,
        date,
    });

    newExercsie.save()
    .then(() => res.json('Exersisess added'))
    .catch(err => res.status(400).json('error: '+ err));
});
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercisesexercises => res.json(exercisesexercises))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise Deleted'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req, res) => {
     Exercise.findById(req.params.id)
     .then(exercise => {
         exercise.username = req.body.username;
         exercise.discription = req.body.discription;
         exercise.duration = Number(req. body.duration);
         exercise.date = Date.parse(req.body.date);

         exercise.save()
         .then(() => res.json('Exercise Updated'))
         .catch(err => res.status(400).json('Error1: '+ err));
     })
     .catch(err => res.status(400).json('Error0: '+ err));
});

module.exports = router;