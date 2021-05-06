
const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    mobile: { type: String, default: null, unique: true },
    password: {
        type: String,
        required: [true, 'Your password cannot be blank.'],
        index: true
    },
    is_active: { type: String, default: true },
    role: { type: Number, required: true },   // 1 --> Admin 2 --> Sales
    login_time: { type: Date },
    logout_time: { type: Date }
}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date_time' }
});
let users = mongoose.model('title-users', schema);
users.createIndexes();
exports.users = users;


let tokenSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'admin-users', index: true },
    token: { type: String, index: true },
    is_deleted: { type: Boolean, default: false }
},
    {
        timestamps: { createdAt: 'created_date', updatedAt: 'modified_date_time' }
    });
let tokens = mongoose.model('auth-token', tokenSchema);
tokens.createIndexes();
exports.tokens = tokens;



