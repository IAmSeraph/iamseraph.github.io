jQuery.githubUser = function(user, cbfun) { $.ajax({ dataType: "json", url: "https://api.github.com/users/" + user + "/repos?callback=?", headers: {  Authorization: "Bearer " + $("meta[name=\"csrf-token\"]").attr("content"), Accept: "application/vnd.github+json" }, success: cbfun, error: function(error) { console.log(error); } }); };
jQuery.loadRepositories = function(user) {
    $(".projects").html("<h2>Querying GitHub for projects...</h2>");
    $.githubUser(user, function(repositories) {
        $(".projects").empty();
        let display = "";
        $(repositories.data).each(function() {
            let project = "<div class=\"project\">\n<div class=\"heading\">\n<h3>" + this.name + "</h3>\n<div class=\"social\">\n<a href=\"" + this.html_url + "\" target=\"_blank\" rel=\"Link to GitHub\"><i class=\"fab fa-github\"></i></a>\n";
            if (this.homepage !== "" && this.homepage !== null)
                project += "<a href=\"" + this.homepage + "\" target=\"_blank\" rel=\"Link to website\"><i class=\"fas fa-globe-europe\"></i></a>\n";
            project += "</div>\n</div></br>\n<div class=\"content\">\n<p>" + this.description + "</p>\n</div></br>\n<div class=\"chips\">\n<span class=\"chip\">" + this.private ? "Private" : "Public" + "</span>\n</div></br>\n<div class=\"chips\">\n";
            if (this.language !== "" && this.language !== null)
                $(this.language).each(function(language) { project += "<span class=\"chip\">" + language + "</span>\n"; });
            project += "</div></br>\n<div class=\"chips\">\n";
            if (this.topics !== "" && this.topics !== null)
                $(this.topics).each(function(topic) { project += "<span class=\"chip\">" + topic + "</span>\n"; });
            project += "</div></br>\n</div>\n";
            display += project;
        });
        $(".projects").html(display);
    });
};

window.onload = function() {
    $.loadRepositories("IAmSeraph");
};