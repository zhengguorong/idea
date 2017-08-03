'use strict';

module.exports = mongoose => {
  const UserSchema = new mongoose.Schema({
    userId: { type: String },
    nickName: { type: String },
    password: { type: String },
    token: { type: String },
    role: { type: String, enum: [ 'USER', 'ADMIN', 'PM' ], default: 'USER' },
  });

  return mongoose.model('User', UserSchema);
};
