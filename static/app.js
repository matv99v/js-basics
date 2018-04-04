function loadPhones() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'phones.json', false, 'Vladimir', 'qwerty');
    xhr.send();

    if (xhr.status != 200) {
        // обработать ошибку
        console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
        // вывести результат
        console.log(xhr.responseText);
    }
}
