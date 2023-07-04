jQuery.githubUser = function(user, cbfun) { $.ajax({ dataType: "json", url: "https://api.github.com/users/" + user + "/repos?callback=?", headers: {  Authorization: "Bearer " + $("meta[name=\"csrf-token\"]").attr("content"), Accept: "application/vnd.github+json" }, success: cbfun, error: function(error) { console.log(error); } }); };
jQuery.fn.loadRepositories = function(user) {
    this.html("<h2>Querying GitHub for projects...</h2>");
    let target = this;
    $.githubUser(user, function(repositories) {
        console.log(repositories);
        target.empty();
        let display = "";
        $(repositories.data).each(function() {
            if (this.name === ".github" || this.name === "iamseraph.github.io")
                return;
            let project = "<div class=\"project\">\n"
            concat(project, "<div class=\"heading\">\n");
            concat(project, "<h3>" + this.name + "</h3>\n");
            concat(project, "<div class=\"social\">")
            concat(project, "<a href=\"" + this.html_url + "\" target=\"_blank\" rel=\"Link to GitHub\"><i class=\"fab fa-github\"></i></a>\n");
            if (this.homepage !== "" && this.homepage !== null)
                concat(project, "<a href=\"" + this.homepage + "\" target=\"_blank\" rel=\"Link to website\"><i class=\"fab fa-globe-europe\"></i></a>\n");
            concat(project, "</div>\n");
            concat(project, "</div></br>\n");
            concat(project, "<div class=\"content\">\n");
            concat(project, "<p>" + this.description + "</p>\n");
            concat(project, "</div></br>\n");
            concat(project, "<div class=\"chips\">\n");
            if (this.language !== "" && this.language !== null)
                concat(project, "<span class=\"chip\">" + this.language + "</span>\n");
            if (this.private)
                concat(project, "<span class=\"chip\">Private</span>\n");
            else
                concat(project, "<span class=\"chip\">Public</span>\n");
            concat(project, "</div></br>\n");
            concat(project, "</div>\n");
            concat(display, project);
        });
        target.html(display);
    });
};

window.onload = function() {
    $("#projects.container.projects").loadRepositories("IAmSeraph");
};