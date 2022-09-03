const {Session, UserSession, User} = require("../schemas/index");
const {where} = require("sequelize");

/**
 *
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
async function createNewSession(request, response) {
  UserSession.create({
    user_id: request.body.subscriberId,
    session_id: request.body.sessionId,
  }).then(userSession => {
    response.send(userSession);
  }).catch(err => {
    response.send(err);
  });
}

async function scheduleSessions(request, response) {
  Session.bulkCreate(request)
    .then(session => {
      response.status(200).send(session);
    }).catch(err => {
    response.status(500).send(err);
  })
}

/**
 *
 * @param request
 * @param response
 * @returns {Promise<[]>}
 */
async function getTeacherSession(userId) {
 return await Session.findAll({where: {userId : userId}});
}

/**
 *
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
async function getAllSession(request, response) {
  Session.findAll().then(allSession => {
    response.status(200).json(allSession);
  }).catch(err => {
    response.status(500).json({message: err});
  });
}

/**
 *
 * @param request
 * @param response
 */
function getUserSessions(request, response) {
  User.findAll({where: {id: request.body.userId}, include: UserSession})
    .then(data => {
      response.send(data);
    })
    .catch(err => response.send(err));
}

/**
 *
 * @param request
 * @param response
 */
function getSessionUsers(request, response) {
  Session.findAll({where: {session: request.body.sessionId}, include: UserSession})
    .then(data => {
      response.send(data)
    })
    .catch(err => response.send(err));
}

/**
 *
 * @param sessionId
 * @returns {Promise<[]>}
 */
function updateStatus(sessionId, status) {
  Session.update(
    { active: status},
    { where: { id: sessionId } }

  ).then(data => {
    return data;
  }).catch(err => {
    return err
    }
  );
}

module.exports = {
  createNewSession,
  getAllSession,
  getUserSessions,
  getSessionUsers,
  scheduleSessions,
  getTeacherSession,
  updateStatus
}