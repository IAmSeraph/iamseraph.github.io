jQuery.githubUser = function(user, cbfun) { $.ajax({ dataType: "json", url: "https://api.github.com/users/" + user + "/repos?callback=?", headers: {  Authorization: "Bearer " + $("meta[name=\"csrf-token\"]").attr("content"), Accept: "application/vnd.github+json" }, success: cbfun, error: function(error) { console.log(error); } }); };
jQuery.fn.loadRepositories = function(user) {
    this.html("<h2>Querying GitHub for projects...</h2>");
    let target = this;
    $.githubUser(user, function(repositories) {
        target.empty();
        let display = "";
        $(repositories.data).each(function() {
            let project = "<div class=\"project\">\n"
            project.concat("<div class=\"heading\">\n");
            project.concat("<h3>" + this.name + "</h3>\n");
            project.concat("<div class=\"social\">\n")
            project.concat("<a href=\"" + this.html_url + "\" target=\"_blank\" rel=\"Link to GitHub\"><i class=\"fab fa-github\"></i></a>\n");
            if (this.homepage !== "" && this.homepage !== null)
                project.concat("<a href=\"" + this.homepage + "\" target=\"_blank\" rel=\"Link to website\"><i class=\"fab fa-globe-europe\"></i></a>\n");
            project.concat("</div>\n");
            project.concat("</div></br>\n");
            project.concat("<div class=\"content\">\n");
            project.concat("<p>" + this.description + "</p>\n");
            project.concat("</div></br>\n");
            project.concat("<div class=\"chips\">\n");
            if (this.language !== "" && this.language !== null)
                project.concat("<span class=\"chip\">" + this.language + "</span>\n");
            if (this.private)
                project.concat("<span class=\"chip\">Private</span>\n");
            else
                project.concat("<span class=\"chip\">Public</span>\n");
            project.concat("</div></br>\n");
            project.concat("</div>\n");
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