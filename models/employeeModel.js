const mongoose = require('mongoose');

const employeeSchema =  new mongoose.Schema({
    ID: {
        type: String
    },
    basicInformation: {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        contactNumber: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        birthday: {
            type: Date,
            default: Date.now
        }
    },
    addressInformation: {
        streetAddress: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: Number,
            required: true
        },
        country: {
            type: String,
            required: true,
            default: 'South Africa'
        }
    },
    skills: [{
        skill: {
            type: String,
            required: true,
        },
        yearsExperience: {
            type: String,
            required: true
        },
        seniority: {
            type: String,
            required: true
        }
    }]
})
module.exports = mongoose.model('Employee', employeeSchema)
