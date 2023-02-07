const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const trainerSchema = new Schema({
    username: {
        type: String,
        required: "Username is required",
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: "Email is required",
        unique: true,
        match: [ /.+@.+\..+/, "Must be a valid email address"]
    },
    password: {
        type: String,
        required: "Password is required",
        minLength: 8,
    },
    pokemon: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Pokemon'
        }
    ]
})

trainerSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10
        this.password = await bcrypt.hash(this.password, saltRounds)
    }

    next()
})

trainerSchema.methods.isCorrectPassword = function(password) {
    return bcrypt.compare(password, this.password)
}

const Trainer = model('Trainer', trainerSchema)

module.exports = Trainer