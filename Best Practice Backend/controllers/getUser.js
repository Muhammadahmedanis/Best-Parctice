import Users from '../models/auth.js';

export const getUsers = async (req, res) => {
    try {
        const users = await Users.find({ //findOne, fingById
            userName: "Hamza"
        });
        res.status(200).send({status: 200, users});
    } catch (error) {
        res.status(500).send({status: 500, error});
    }    
}

//update user
// findByIdandUpdate(id, req.body)