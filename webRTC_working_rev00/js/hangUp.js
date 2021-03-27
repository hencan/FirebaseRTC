
function hangUp() {
    let iscaller = false

    const configuration = {
        iceServers: [
            {
                urls: [
                    'stun:stun1.l.google.com:19302',
                    'stun:stun2.l.google.com:19302',
                ],
            },
        ],
        iceCandidatePoolSize: 10,
    };

    async function stop(e) {
        const createConnection = createRoom();
        console.log(createConnection)

        var remoteStream = document.querySelector('#remoteVideo_1').srcObject
        var peerConnection = new RTCPeerConnection(configuration);

        const tracks = document.querySelector('#localVideo').srcObject.getTracks();
        tracks.forEach(track => {
            track.stop();
        });

        if (remoteStream) {
            remoteStream.getTracks().forEach(track => track.stop());
        }

        if (peerConnection) {
            peerConnection.close();
        }

        document.querySelector('#localVideo').srcObject = null;
        document.querySelector('#remoteVideo_1').srcObject = null;
        document.querySelector('#cameraBtn').disabled = false;
        document.querySelector('#cameraBtn').classList.add("btn-primary")
        document.querySelector('#cameraBtn').classList.remove("btn-success")
        document.querySelector('#joinBtn').disabled = true;
        document.querySelector('#createBtn').disabled = true;
        document.querySelector('#hangupBtn').disabled = true;

        // Delete room on hangup
        if (iscaller) {
            console.log(iscaller)
            if (roomId) {
                const db = firebase.firestore();
                const roomRef = db.collection('rooms').doc(roomId);
                const calleeCandidates = await roomRef.collection('calleeCandidates').get();
                calleeCandidates.forEach(async candidate => {
                    await candidate.ref.delete();
                });
                const callerCandidates = await roomRef.collection('callerCandidates').get();
                callerCandidates.forEach(async candidate => {
                    await candidate.ref.delete();
                });
                await roomRef.delete();
            }
        }

        document.location.reload(true);

    }

    return {
        stop
    }
}

export default hangUp;