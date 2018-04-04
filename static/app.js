function loadPhones() {
    var button = document.getElementById('myBtn');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'phones.json', true);
    xhr.send();

    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;

      button.innerHTML = 'Готово!';

      if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
      } else {
        alert(xhr.responseText);
      }

    }

    button.innerHTML = 'Загружаю...'; // (2)
    button.disabled = true;

}
