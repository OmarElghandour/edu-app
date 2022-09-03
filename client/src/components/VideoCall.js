import React, { useState, useEffect, useRef } from 'react';
import Video from "twilio-video";
import Participant from "../Participant";

const VideoCall = (props) => {
    const [roomName, setRoomName] = useState("test");
    const [room, setRoom] = useState(null);
    const [username, setUsername] = useState("testUser");
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        connectToRoom();
    }, []);

    useEffect(() => {
        //call function when something change in state
        if (room) {
            const participantConnected = (participant) => {
                console.log(participant);
                setParticipants((prevParticipants) => [...prevParticipants, participant]);
            };

            const participantDisconnected = (participant) => {
                console.log(participant.sid);
                setParticipants((prevParticipants) =>
                    prevParticipants.filter((p) => p !== participant)
                );
               const participantId = document.getElementById(participant.sid);
               console.log(participantId);
            //    if(participantId) {
            //        document.querySelector('.remote-participants').removeChild(participantId);
            //    }
            };
            room.on("participantConnected", participantConnected);
            room.on("participantDisconnected", participantDisconnected);
            room.participants.forEach(participantConnected);
            return () => {
                room.off("participantConnected", participantConnected);
                room.off("participantDisconnected", participantDisconnected);
            };
        }

    }, [room]) //dependency added


    const connectToRoom = async () => {
        const data = await fetch(`${process.env.REACT_APP_SERVER_API}token/twillio`, {
            method: "POST",
            body: JSON.stringify({
                identity: "test" + Math.random(),
                room: "test",
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            return data;
        });
        Video.connect(data.token, {
            name: roomName,
        })
            .then((room) => {
                setRoom(room);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    const remoteParticipants = participants.map((participant) => (
        <Participant  key={participant.sid} participant={participant} />
      ));

    return (
        <div className="room">
            <h2>Room: {roomName}</h2>
            {/*<button onClick={handleLogout}>Log out</button>*/}
            <div className="local-participant">
                {(room) ? (
                    <Participant
                        key={room.localParticipant.sid}
                        participant={room.localParticipant}
                    />
                ) : (
                    ""
                )}
            </div>
            <h3>Remote Participants</h3>
            <div className="remote-participants">{remoteParticipants}</div>
        </div>
    )
};

export default VideoCall;





