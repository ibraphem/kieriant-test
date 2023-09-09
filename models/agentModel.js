import mongoose from "mongoose"

const agentSchema = new mongoose.Schema(
    {
        agentId: {
            type: String,
            required: true,
            minlength: 12,
            maxlength: 12,
            unique: true,
          },
        email: {type: String, required: true, unique: true},
        phone: {type: String, required: true, unique: true},
        walletAddress: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        pin: {type: String, required: true, unique: true},


    },
    {
        timestamps: true
    }
)

const Agent = mongoose.model('Agent', agentSchema)
export default Agent