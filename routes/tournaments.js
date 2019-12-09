import express from "express";

export const router = express.Router();
export const prefix = '/tournament';
const Joi = require('@hapi/joi');

router.use(express.json());

const tournamentArray =[
    {
        tName: "UNC Fights",
        date: new Date(),
        host: "John Doe",
        location: "Chapel Hill, NC",
        time: "12/12/2020 5:00 AM to 6:00 PM",
        description: "Quidditch Tournament",
        teams: ["UNC", "STATE","DUKE","APP"],
        arePools: false,
        areBracket: true,
        duration: 60,
        refs: ["HANNAH","GRACE","SAM"],
        snitch: "SHANE",
        tournamentId: 1,
    },
    {
        tName: "UNC Fights",
        date: new Date(),
        host: "John Doe",
        location: "Chapel Hill, NC",
        time: "12/12/2020 5:00 AM to 6:00 PM",
        description: "Quidditch Tournament",
        teams: ["UNC", "STATE","DUKE","APP"],
        arePools: false,
        areBracket: true,
        duration: 60,
        refs: ["HANNAH","GRACE","SAM"],
        snitch: "SHANE",
        tournamentId: 2,
    },
    {
        tName: "UNC Fights",
        date: new Date(),
        host: "John Doe",
        location: "Chapel Hill, NC",
        time: "12/12/2020 5:00 AM to 6:00 PM",
        description: "Quidditch Tournament",
        teams: ["UNC", "STATE","DUKE","APP"],
        arePools: false,
        areBracket: true,
        duration: 60,
        refs: ["HANNAH","GRACE","SAM"],
        snitch: "SHANE",
        tournamentId: 3,
    },
    {
        tName: "UNC Fights",
        date: new Date(),
        host: "John Doe",
        location: "Chapel Hill, NC",
        time: "12/12/2020 5:00 AM to 6:00 PM",
        description: "Quidditch Tournament",
        teams: ["UNC", "STATE","DUKE","APP"],
        arePools: false,
        areBracket: true,
        duration: 60,
        refs: ["HANNAH","GRACE","SAM"],
        snitch: "SHANE",
        tournamentId: 4,
    }
];

// Get all of the tournaments
router.get('/', function(req, res){
    res.send(tournamentArray);
});

// Get a specific tournament
router.get('/:id', function(req, res){
    const tournament = tournamentArray.find(c => c.id === parseInt(req.params.id));
    if (!tournament) return res.status(404).send("Tournament not found");
    res.send(tournament);
})

// Add a tournament to the array
router.post('/', function(req, res){
    if(tournamentValidator(req.body) == -1) return res.status(400).send("Tournament object is missing one or more required fields. Please try again with populated fields.");

    const tournament = {
        tName: req.body.tournamentName,
        date: req.body.tournamentDate,
        host: req.body.tournamentHost,
        location: req.body.tournamentLocation,
        time: req.body.tournamentTime,
        description: req.body.description,
        teams: req.body.teams,
        arePools: req.body.havePools,
        areBracket: req.body.haveBrackets,
        refs: req.body.tournamentReferees,
        snitch: req.body.tournamentSnitches,
        tournamentId: req.body.id,
    };
    
    tournamentArray.push(tournament);
    res.send(tournament); 
});

// Add information to a specific tournament
router.put('/add/:id', function(req, res){
    // Find the tournament, if not found send 404 status
    const tournament = tournamentArray.find(c => c.tournamentId === parseInt(req.params.id));
    if (!tournament) return res.status(404).send("Tournament not found.");

    // Make sure the request is valid
    const schema = {
        tournamentId: Joi.string().require(),
        updateInfo: Joi.string().require(),
        keyValue: Joi.string().require()
    }
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send("Tournament ID not found. Please send Tournament ID to update a specific tournament.");

    // Define objects to hold the key/value pair to be added
    const key = req.body.keyValue;
    const value = req.body.updateInfo;

    // Add the key/value pair to the torunament object
    tournament[key] = [value];

    // Send back the updated tournament object
    res.send(tournament);    
});

// Update information about a specific tournament
router.put('/update/:id', function(req, res){
    // Find the tournament, if not found send 404 status
    const tournament = tournamentArray.find(c => c.tournamentId == parseInt(req.params.id));
    if(!tournament) return res.status(404).send("Tournament not found.")

    // Make sure the update information and the key to the information is there
    // otherwise, send appropriate 400 status
    const schema = {
        key: Joi.string().require(),
        updateInfo: Joi.string().require()
    }
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error);
    
    // Set the key, and update information appropriately
    const key = req.body.key;
    const content = req.body.updateInfo;
    
    // Update the desired tournament property (key), and return the updated tournament
    tournament.key = content;
    res.send(tournament);
});

function tournamentValidator(tournament){
    const schema1 = {
        name: Joi.string().require(),
        date: Joi.date().require(),
        host: Joi.string().require(),
        location: Joi.string().require(),
        time: Joi.string().require(),
        description: Joi.string().require(),
        teams: Joi.array(Joi.string()).require(),
        arePools: Joi.boolean(),
        areBracket: Joi.boolean(),
        refs: Joi.array(Joi.string()).require(),
        snitch: Joi.array(Joi.string()).require(),
        tournamentId: Joi.string(),
    };  

    const {error} = schema1.validate(tournament);
    if(error){
        return -1;
    } else {
        return 1;
    }
    
}