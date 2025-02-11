let _config = {
    selector: 'form',
    title: 'Test',
    source: 'Test',
    link: location.href,
    requestURL: atob('aHR0cHM6Ly9za2lka2EtdHV0LmJ5L2FjdGlvbi9pbmRleC5waHA='),
    requestMethod: 'POST',
    resetFormAfterRequest: true,
    doneCallback: response => {
        if(response?.responseText && JSON.parse(response.responseText)?.text){
            alert(JSON.parse(response.responseText).text)
            return true;
        }
    },
    errorMessage: 'Произошла ошибка запроса. Пожалуйста, свяжитесь с менеджером по телефону!',
    repeatMessage: 'Вы уже отправили заявку, повторить?',
    testMode: true
}

export default (config = {}) => {
    _config = {..._config, ...config}
    const forms = document.querySelectorAll(_config.selector)
    Array.prototype.forEach.call(forms, form => {
        form.addEventListener('submit', event => {
            event.preventDefault()
            submitHandler(event.target)
        })
    })
}

const submitHandler = form => {

    if (checkIsFormSubmitted()) return false

    const data = getData(form)

    if (_config.resetFormAfterRequest) form.reset()

    sendData(data, response => {
        if (response.type === 'error') {
            alert(response.message)
        }
    })

    dispatchSendEvent()
}

const checkIsFormSubmitted = () => {
    if (typeof sessionStorage !== 'undefined') {
        if (sessionStorage.getItem('formSubmitted')) {
            return !confirm(_config.repeatMessage)
        } else {
            sessionStorage.setItem('formSubmitted', 'true')
        }
    }
    return false
}

const getData = (form) => {
    const {title, source, link} = _config
    const formData = new FormData(form)
    formData.append('source', source)
    formData.append('title', title)
    formData.append('link', link)

    return formData
}

const sendData = (data, callback = f => f) => {
    const {requestURL, requestMethod} = _config

    const request = new XMLHttpRequest()

    request.addEventListener("load", function({ target: response }) {
        if (response.status === 200) {
            if(typeof _config.doneCallback === "function" && _config.doneCallback(response)){
                return true
            }

            return alert(response.responseText)
        }

        callback({
            type: 'error',
            message: _config.errorMessage
        })
    }, false)
    request.addEventListener("error", function onError() {
        callback({
            type: 'error',
            message: _config.errorMessage
        })
    }, false)


    request.open(requestMethod, requestURL)
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

    if (_config.testMode) {
        let testing = {}
        data.forEach(function (value, key) {
            testing[key] = value
        })
        console.log(testing)
    } else {
        request.send(data)
    }
}

const dispatchSendEvent = () => {
    // Event dispatcher for IE9+ included
    if (typeof (Event) === 'function') {
        document.dispatchEvent(new Event('app.form.send'))
    } else {
        const ev = document.createEvent('Event')
        ev.initEvent('app.form.send', false, false)
        document.dispatchEvent(ev)
    }
}
