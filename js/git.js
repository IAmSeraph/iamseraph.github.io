jQuery.githubUser = function(user, cbfun) {
    $.getJSON("https://api.github.com/users/" + user + "/repos?callback=?", cbfun);
};

jQuery.fn.loadRepositories = function(user) {
    this.html("<h2>Querying GitHub for projects...</h2>");
    let target = this;
    $.githubUser(user, function(repositories) {
        sortByPopularity(repositories);
        target.empty();
        let display = "";
        $(repos).each(function() {
            if (this.name === ".github" || this.name === "iamseraph.github.io")
                return;
            let project = "<div class=\"project\">\n"
            project.append("<div class=\"heading\">\n");
            project.append("<h3>" + this.name + "</h3>\n");
            project.append("<div class=\"social\">")
            project.append("<a href=\"" + this.html_url + "\" target=\"_blank\" rel=\"Link to GitHub\"><i class=\"fab fa-github\"></i></a>\n");
            if (this.homepage !== "" && this.homepage !== null)
                project.append("<a href=\"" + this.homepage + "\" target=\"_blank\" rel=\"Link to website\"><i class=\"fab fa-globe-europe\"></i></a>\n");
            project.append("</div>\n");
            project.append("</div></br>\n");
            project.append("<div class=\"content\">\n");
            project.append("<p>" + this.description + "</p>\n");
            project.append("</div></br>\n");
            project.append("<div class=\"chips\">\n");
            if (this.language !== "" && this.language !== null)
                project.append("<span class=\"chip\">" + this.language + "</span>\n");
            if (this.private)
                project.append("<span class=\"chip\">Private</span>\n");
            else
                project.append("<span class=\"chip\">Public</span>\n");
            project.append("</div></br>\n");
            project.append("</div>\n");
            display.append(project);
        });
        target.html(display);
    });

    function sortByPopularity(repositories) {
        repositories.sort(function(a, b) {
            return calculatePopularity(b)-calculatePopularity(a);
        });
    };

    function calculatePopularity(repository) {
        return repository.watchers_count+(repository.stargazers_count*2)+(repository.forks_count*3);
    }
};

$("projects").loadRepositories("IAmSeraph");