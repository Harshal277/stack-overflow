import mongose from 'mongoose'
import User from '../models/auth.js'

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        const allUserDetails = []
        allUsers.forEach(users => {
            allUserDetails.push({ _id: users._id, name: users.name, about: users.about, tags: users.tags, joinedOn: users.joinedOn, mob: users.mob, email: users.email, password: users.password, lat: users.lat, long: users.long })
        }) 
        res.status(200).json(allUserDetails)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params
    const { name, mob, about, tags, lat, long } = req.body

    if(!mongose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('User unavilable')
    }

    try {
        const updatedProfile = await User.findByIdAndUpdate( _id, { $set: {'name': name, 'mob': mob, 'about': about, 'tags': tags, 'lat': lat, 'long': long }}, { new: true })
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(405).json({message: error.message})
    }
}