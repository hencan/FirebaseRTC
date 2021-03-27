function openUserMedia() {
    let localStream_1
    let remoteStream_1

    async function start(e) {

        // const stream = await navigator.mediaDevices.getUserMedia(
        //   { video: true, audio: true });
        const stream = await navigator.mediaDevices.getUserMedia(
            {
                audio: true,
                video: true
                // video: { width: 300, height: 300 }
                // video: {
                //   width: { min: 1024, ideal: 1280, max: 1920 },
                //   height: { min: 576, ideal: 720, max: 1080 }
                // } 
            });

        document.querySelector('#localVideo').srcObject = stream;
        // document.querySelector('#localVideo').muted = true
        localStream_1 = stream;
        console.log(localStream_1)
        remoteStream_1 = new MediaStream();
        document.querySelector('#remoteVideo').srcObject = remoteStream_1;
        console.log(remoteStream_1)

        // console.log('Stream:', document.querySelector('#localVideo').srcObject);
        document.querySelector('#cameraBtn').classList.remove("btn-primary")
        document.querySelector('#cameraBtn').classList.add("btn-success")
        document.querySelector('#cameraBtn').disabled = true;
        document.querySelector('#joinBtn').disabled = false;
        document.querySelector('#joinInput').disabled = false;
        document.querySelector('#createBtn').disabled = false;
        document.querySelector('#hangupBtn').disabled = false;
    }

    return {
        start
    }
}

export default openUserMedia;

