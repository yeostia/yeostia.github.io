var isAutoScrolling = false;
const hashscroll = function() {
    for (var hashpage of ['homepage','about','education','experience','works','posts','repositories','contact']) {
        selected_navbutton = document.getElementById(hashpage+'-button');
        selected_navbutton.style = 'margin-bottom:25px;';
    };
    selected_navbutton = document.getElementById(window.location.hash.replace('#','')+'-button');
    if (window.location.hash === '') {selected_navbutton = document.getElementById('homepage-button');};
    selected_navbutton.style = 'margin-bottom:25px;color:#0080ff;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:2px;';
};
const hashchanger = function() {
    if (isAutoScrolling) {return;};
    if (window.scrollY >= document.getElementById('contact').offsetTop) {window.location.hash = 'contact'} else {
        if (window.scrollY >= document.getElementById('repositories').offsetTop) {window.location.hash = 'repositories'} else {
            if (window.scrollY >= document.getElementById('posts').offsetTop) {window.location.hash = 'posts'} else {
                if (window.scrollY >= document.getElementById('works').offsetTop) {window.location.hash = 'works'} else {
                    if (window.scrollY >= document.getElementById('experience').offsetTop) {window.location.hash = 'experience'} else {
                        if (window.scrollY >= document.getElementById('education').offsetTop) {window.location.hash = 'education'} else {
                            if (window.scrollY >= document.getElementById('about').offsetTop) {window.location.hash = 'about'} else {window.location.hash = ''};
                        };
                    };
                };
            };
        };
    };
};
const load_data = function() {
    //Loading Posts
    var requestURL = 'https://hereus.pythonanywhere.com/user/islekcaganmert/back';
    fetch(requestURL)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            };
        })
        .then(function(data) {
            var htmlgen = '<div style="height:50px;"></div><p style="margin-bottom:50px;"><font size="30px"><b>My Posts</b></font></p>'
            for (var post of data.posts) {
                htmlgen = htmlgen + '<div class="the_box" style="margin-top:40px;margin-bottom:-30px;"><p style="font-size:20px;"><b>'+post.username;
                if (post.community !== '') {htmlgen = htmlgen + ' > '+post.community;};
                htmlgen = htmlgen + '</b></p><p style="color:#808080;font-size:10px;">'+post.date_created.split(' ')[1]+' '+post.date_created.split(' ')[2]+' '+post.date_created.split(' ')[3]+'</p>';
                htmlgen = htmlgen + '<p>'+post.text.replace('<long>','<br>&nbsp;<br>')+'</p></div></div>';
            };
            document.getElementById('posts').innerHTML = htmlgen;
        });
    //Loading Repos
    requestURL = 'https://api.github.com/users/islekcaganmert/repos';
    fetch(requestURL)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            };
        })
        .then(function(data) {
            console.log(JSON.stringify(data));
            var htmlgen = '<div style="height:50px;"></div><p style="margin-bottom:50px;"><font size="30px"><b>My Public Repositories</b></font></p>';
            for (var repo of data) {
                htmlgen = htmlgen + '<a href="https://github.com/'+repo.full_name+'" target="_blank"><div class="the_box" style="margin-top:40px;margin-bottom:-30px;';
                if (repo.archived) {htmlgen = htmlgen + 'color:#a68400;';};
                htmlgen = htmlgen + '"><p style="font-size:20px;"><b>'+repo.full_name+'</b></p><p style="color:';
                if (repo.archived) {htmlgen = htmlgen + '#d0c18a';} else {htmlgen = htmlgen + '#808080';};
                htmlgen = htmlgen + ';font-size:10px;">'+repo.description+'</p><p>';
                for (var topic of repo.topics) {htmlgen = htmlgen + '<button class="button-mini">'+topic+'</button>';};
                htmlgen = htmlgen + '</p></div></a>';
            };
            document.getElementById('repositories').innerHTML = htmlgen;
        });
}
addEventListener("load", (event) => {isAutoScrolling = true;hashscroll();;load_data();});
addEventListener("hashchange", (event) => {isAutoScrolling = true;hashscroll();});
addEventListener("scroll", (event) => {hashchanger();});
window.addEventListener("wheel", function() {
    isAutoScrolling = false;
});
window.addEventListener("touchstart", function() {
    isAutoScrolling = false;
});