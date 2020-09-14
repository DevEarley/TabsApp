
function updateBlog(_entries, _files) {
    let blog = document.getElementById("content");
    if (blog != null) {
        blog.innerHTML = "";

        let sortedEntries = _entries.sort(function (a, b) {
            return (getIndex(a.url, _entries, _files) < getIndex(b.url, _entries, _files)) ? -1 : 1;
        });
        for (let i = 0; i < sortedEntries.length; i++) {
            blog.innerHTML += sortedEntries[i].html;
            blog.innerHTML += "<!--" + sortedEntries[i].url + "-->";
        }

    }
}

function getIndex(_url, _entries, _files) {
    var fileName = extractFilename(_url);
    var index = 0;
    for (var i = 0; i < _files.length; i++) {
        let fileNameFromIndex = _files[i];
        if (fileNameFromIndex === fileName) {
            index = i;
        }
    }
    return index;
}

function extractFilename(_path) {
    const pathArray = _path.split("/");
    const lastIndex = pathArray.length - 1;
    return pathArray[lastIndex];
}

function init(_entries, _files, _converter) {
    for (let f = 0; f < _files.length; f++) {
        let client = new XMLHttpRequest();
        client.open('GET', './' + _files[f]);
        client.send();
        client.onreadystatechange = function () {
            if (client.readyState != 4) return;
            let html = _converter.makeHtml(client.responseText);
            let url = client.responseURL;
            _entries.push({
                html: html,
                url: url
            });
            if (_entries.length == _files.length) {
                updateBlog(_entries, _files);
            }
        }
    }
}

