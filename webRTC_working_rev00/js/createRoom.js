import registerPeerConnectionListeners from './registerPeerConnectionListeners.js'

function createRoom() {
    let peerConnection
    let roomId
    let iscaller
    let localStream_2 
    let remoteStream_2

    const register = registerPeerConnectionListeners()

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

    async function start() {

        console.log(localStream_2)
        console.log(remoteStream_2)


        document.querySelector('#createBtn').disabled = true;
        document.querySelector('#joinBtn').disabled = true;

        const db = firebase.firestore();
        const roomRef = await db.collection('rooms').doc();

        console.log('Create PeerConnection with configuration: ', configuration);
        peerConnection = new RTCPeerConnection(configuration);

        register.start;

        await localStream_2.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream_2);
        });

        // Code for collecting ICE candidates below
        const callerCandidatesCollection = roomRef.collection('callerCandidates');

        peerConnection.addEventListener('icecandidate', event => {
            if (!event.candidate) {
                console.log('Got final candidate!');
                return;
            }
            console.log('Got candidate: ', event.candidate);
            callerCandidatesCollection.add(event.candidate.toJSON());
        });
        // Code for collecting ICE candidates above

        // Code for creating a room below
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        console.log('Created offer:', offer);

        const roomWithOffer = {
            'offer': {
                type: offer.type,
                sdp: offer.sdp,
            },
        };

        await roomRef.set(roomWithOffer);
        roomId = roomRef.id;
        console.log(`New room created with SDP offer. Room ID: ${roomRef.id}`);
        document.querySelector('#createInput').value = roomId

        // Code for creating a room above
        document.querySelector('#copyBtn').disabled = false;

        peerConnection.addEventListener('track', event => {
            console.log('Got remote track:', event.streams);
            event.streams[0].getTracks().forEach(track => {
                console.log('Add a track to the remoteStream_2:', track);
                remoteStream_2.addTrack(track);
            });
        });

        // Listening for remote session description below
        roomRef.onSnapshot(async snapshot => {
            const data = snapshot.data();
            if (!peerConnection.currentRemoteDescription && data && data.answer) {
                console.log('Got remote description: ', data.answer);
                const rtcSessionDescription = new RTCSessionDescription(data.answer);
                await peerConnection.setRemoteDescription(rtcSessionDescription);
            }
        });
        // Listening for remote session description above

        // Listen for remote ICE candidates below
        roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(async change => {
                if (change.type === 'added') {
                    let data = change.doc.data();
                    console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
                    await peerConnection.addIceCandidate(new RTCIceCandidate(data));
                }
            });
        });
        // Listen for remote ICE candidates above
        iscaller = true;

    }
    return {
        start
    }
}

export default createRoom;
