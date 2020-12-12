const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const commentSchema = new Schema({
    commenter: {
        // User 스키마의 사용자 ObjectId가 commenter 필드에 들어감
        // Mongoose가 JOIN과 비슷한 기능을 할 때 사용
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date, 
        default: Date.now,
    },
});

module.exports = mongoose.model('Comment', commentSchema);