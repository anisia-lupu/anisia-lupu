var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function nonEmptyOrNull(value) {
   return (value == "" ? null : value)
}

var host = location.origin

getJSON(host + '/info.html',
function(err, data) {
      if (err !== null) {
        console.log('Something went wrong: ' + err);
      } else {
      var oldVersion = nonEmptyOrNull(getCookie("build_revision"))
      var newVersion = nonEmptyOrNull(data["build_revision"])
      if(oldVersion !== newVersion) {
        console.log("Updated");
      }
      for (var key in data) {
          if (data.hasOwnProperty(key)) {
              setCookie(key, data[key], 365)
          }
      }
  }
});
