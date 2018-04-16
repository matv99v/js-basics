// helpers

function processResponse() {
    if (this.readyState != 4) return; // process only the last state - DONE
    if (this.status == 200) {
        alert(this.responseText);
    } else {
        alert(this.status + ': ' + this.statusText);
    }
}

function getFormData(formEl) {
    const formData = new FormData(formEl);
    const data = {};
    for (const pair of formData.entries()) {
        data[pair[0]] = pair[1];
    }
    return data;
}

function buildQueryString(obj) {
    return Object.keys(obj)
        .map(el => encodeURIComponent(el) + '=' + encodeURIComponent(obj[el]))
        .join('&');
}

function buildMultipartObj(obj) {
    const boundary = String(Math.random()).slice(2);
    const boundaryMiddle = '--' + boundary + '\r\n';
    const boundaryLast = '--' + boundary + '--\r\n'
    const body = ['\r\n'];
    for (var key in obj) {
      body.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + obj[key] + '\r\n');
    }
    return {
        body: body.join(boundaryMiddle) + boundaryLast,
        boundary: boundary
    };
}

// request handlers

function getUrlencoded(formEl) {
    const data = getFormData(formEl);
    const params = buildQueryString(data);
    const method = formEl.getAttribute('method');

    const url = formEl.getAttribute('action');
    const enctype = formEl.getAttribute('enctype') || 'application/x-www-form-urlencoded';

    const xhr = new XMLHttpRequest();
    xhr.open(method, url + '?' + params);
    xhr.setRequestHeader('Content-Type', enctype);
    xhr.onreadystatechange = processResponse;
    xhr.send();
}


function postUrlencoded(formEl) {
    const data = getFormData(formEl);
    const body = buildQueryString(data);
    const method = formEl.getAttribute('method');

    const url = formEl.getAttribute('action');
    const enctype = formEl.getAttribute('enctype') || 'application/x-www-form-urlencoded';

    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', enctype);
    xhr.onreadystatechange = processResponse;
    xhr.send(body);
}

function postMultipart(formEl) {
    // construct body manually
    const data = getFormData(formEl);
    const url = formEl.getAttribute('action');

    const multipartObj = buildMultipartObj(data);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + multipartObj.boundary);
    xhr.onreadystatechange = processResponse;
    xhr.send(multipartObj.body);
}

function postMultipartAlt(formEl) {
    // XMLHttpRequest object supports FormData, no header required
    const url = formEl.getAttribute('action');
    const formData = new FormData(formEl);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onreadystatechange = processResponse;
    xhr.send(formData);
}

function postTextplain(formEl) {
    const url = formEl.getAttribute('action');
    const data = getFormData(formEl);

    const textBody = Object.keys(data)
        .map(el => el + '=' + data[el] + '\n')
        .join('');

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.onreadystatechange = processResponse;
    xhr.send(textBody);
}

function postJson(formEl) {
    const url = formEl.getAttribute('action');
    const data = getFormData(formEl);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = processResponse;
    xhr.send(JSON.stringify(data));
}

function postFiles(formEl) {
    const url = formEl.getAttribute('action');
    const formData = new FormData(formEl);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onreadystatechange = processResponse;
    xhr.send(formData);
}

function performCors() {
    console.log('performCors');

    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:8000/submit/cors');
    xhr.onreadystatechange = processResponse;
    xhr.send();
}
