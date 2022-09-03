const express = require('express');
const sessionRouter = express.Router();
const sessionController = require('../controllers/sessionController');
const sessionModel = require('../models/session.model');

sessionRouter.get('/twillio', sessionController.generateUserIdentity );
sessionRouter.post('/twillio', sessionController.subscribeToTwillioSession );
sessionRouter.post('/subscribe', sessionModel.createNewSession);
sessionRouter.post('/allSessions', sessionModel.getAllSession);
sessionRouter.post('/userSessions', sessionModel.getUserSessions);
sessionRouter.post('/sessionUsers', sessionModel.getSessionUsers);
sessionRouter.post('/scheduleSessions', sessionController.scheduleSessions)
sessionRouter.get('/scheduledSessions', sessionController.getAllScheduleSessionsForTeacher);
sessionRouter.post('/status', sessionController.updateStatus);

module.exports = sessionRouter;
