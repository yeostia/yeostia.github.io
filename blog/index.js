var jsonArray = [];
var requestURL = 'https://hereus.pythonanywhere.com/user/islekcaganmert/back';
fetch(requestURL)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        };
    })
    .then(function(data) {
        jsonArray = data.articles;
    });
const load_data = function() {
    var navbargen = '<p>';
    var requestURL = 'https://hereus.pythonanywhere.com/feed/articles/read/'+window.location.hash.replace('#','')+'/back';
    fetch(requestURL)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then (function(data) {
            if (data.author === 'islekcaganmert@barsposta.com') {
                var htmlgen = '<div style="padding:10px;padding-left:30px;padding-bottom:15px;border-radius:0px;margin-left:-20px;position:fixed;z-index:9999;width:80vw;" class="the_box"><a href="/#blog" style="font-size:30px;"><</a></div><div style="margin-top:90px;"><p style="margin-bottom:50px;"><h1>'+data.title;
                htmlgen = htmlgen + '</h1><p>'+data.content+'</p><div style="height:50px;"></div><center></div>';
                document.getElementById('page-content').innerHTML = htmlgen;
            } else {console.log('Article not owned by Blog Owner');};
        });
};
addEventListener("load", (event) => {load_data();});
addEventListener("hashchange", (event) => {load_data();});