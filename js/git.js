jQuery.githubUser = function(user, cbfun) { $.ajax({ dataType: "json", url: "https://api.github.com/users/" + user + "/repos?callback=?", headers: {  Authorization: "Bearer " + $("meta[name=\"csrf-token\"]").attr("content"), Accept: "application/vnd.github+json" }, success: cbfun, error: function(error) { console.log(error); } }); };
jQuery.fn.loadRepositories = function(user) {
    this.html("<h2>Querying GitHub for projects...</h2>");
    let target = this;
    $.githubUser(user, function(repositories) {
        target.empty();
        let display = "";
        $(repositories.data).each(function() {
            let project = "<div class=\"project\">\n"
            project += "<div class=\"heading\">\n";
            project += "<h3>" + this.name + "</h3>\n";
            project += "<div class=\"social\">\n";
            project += "<a href=\"" + this.html_url + "\" target=\"_blank\" rel=\"Link to GitHub\"><i class=\"fab fa-github\"></i></a>\n";
            if (this.homepage !== "" && this.homepage !== null)
                project += "<a href=\"" + this.homepage + "\" target=\"_blank\" rel=\"Link to website\"><i class=\"fab fa-globe-europe\"></i></a>\n";
            project += "</div>\n";
            project += "</div></br>\n";
            project += "<div class=\"content\">\n";
            project += "<p>" + this.description + "</p>\n";
            project += "</div></br>\n";
            project += "<div class=\"chips\">\n";
            if (this.language !== "" && this.language !== null)
                project += "<span class=\"chip\">" + this.language + "</span>\n";
            if (this.private)
                project += "<span class=\"chip\">Private</span>\n";
            else
                project += "<span class=\"chip\">Public</span>\n";
            project += "</div></br>\n";
            project += "</div>\n";
            display.concat(project);
            console.log("Project:\n" + project);
        });
        console.log("HTML: " + display);
        console.log("Target: " + target);
        target.html(display);
    });
};

window.onload = function() {
    $("#projects.container.projects").loadRepositories("IAmSeraph");
};