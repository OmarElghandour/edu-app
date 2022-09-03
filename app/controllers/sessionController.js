const express = require('express');
const router = express.Router();
const sessionModel = require('../models/session.model');
const faker = require('@faker-js/faker');
const {Session} = require("../schemas");
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

function generateUserIdentity(req, response) {
    let identity = faker.faker.datatype.uuid();
    let token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );
    token.identity = identity;
    const grant = new VideoGrant();
    // Grant token access to the Video API features
    token.addGrant(grant);
    // // Serialize the token to a JWT string and include it in a JSON response
    return response.send({
        identity: identity,
        token: token.toJwt()
    });
}

function subscribeToTwillioSession(request, response) {
  let token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET
  );
  let room = request.body.room;
  let identity = request.body.identity;
  const grant = new VideoGrant({room});
  // Grant token access to the Video API features
  token.addGrant(grant);
  token.identity = identity;
  // // Serialize the token to a JWT string and include it in a JSON response
  console.log(token.toJwt());
 return response.send({token :  token.toJwt()});
}

async function scheduleSessions(request, response) {
   await sessionModel.scheduleSessions(request.body, response);
}

async function getAllScheduleSessionsForTeacher(request, response) {
  let userId = request.query.user_id;
  const sessions = await sessionModel.getTeacherSession(userId);
  response.send(sessions);
}

async function updateStatus(request, response){
  const session = await sessionModel.updateStatus(request.body.id, request.body.status);
  response.send(session);
}

module.exports = {
    generateUserIdentity,
    subscribeToTwillioSession,
    scheduleSessions,
    getAllScheduleSessionsForTeacher,
    updateStatus
}