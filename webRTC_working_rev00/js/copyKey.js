function copyKey() {

    function start() {
        var copyText = document.querySelector('#createInput')
        copyText.disabled = false
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");

        copyText.disabled = true

        document.querySelector('#copyBtn').style.transition = "all .1s"
        document.querySelector('#copyBtn').classList.remove("btn-primary")
        document.querySelector('#copyBtn').classList.add("btn-success")
        setTimeout(function () {
            document.querySelector('#copyBtn').classList.add("btn-primary")
            document.querySelector('#copyBtn').classList.remove("btn-success")
        }, 500)

    }

    return {start}
}

export default copyKey;
