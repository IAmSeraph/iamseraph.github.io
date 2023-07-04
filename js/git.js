jQuery.githubUser = function(user, cbfun) { $.ajax({ dataType: "json", url: "https://api.github.com/users/" + user + "/repos?callback=?", beforeSend: function(xhr) { xhr.setRequestHeader("authorization", "Bearer " + $("meta[name=csrf-token]").attr("content"));}, success: cbfun, error: $(".projects").html("<span style=\"color:white;font-size:10vh;text-align:center;width:70vw;\">Rate limit reached!</span>") }); };
jQuery.loadRepositories = function(user) {
    $(".projects").html("<span style=\"color:white;font-size:10vh;text-align:center;float:right;width:70vw;\">Querying GitHub for projects...</span>");
    $.githubUser(user, function(repositories) {
        console.log(repositories);
        let display = "";
        $(repositories.data).each(function() {
            let project = "<div class=\"project\">\n"
            project += "<div class=\"heading\">\n";
            project += "<h3>" + this.name + "</h3>\n";
            project += "<div class=\"social\">\n";
            project += "<a href=\"" + this.html_url + "\" target=\"_blank\" rel=\"Link to GitHub\"><i class=\"fab fa-github\"></i></a>\n";
            if (this.homepage !== "" && this.homepage !== null)
                project += "<a href=\"" + this.homepage + "\" target=\"_blank\" rel=\"Link to website\"><i class=\"fas fa-globe-europe\"></i></a>\n";
            project += "</div>\n";
            project += "</div></br>\n";
            project += "<div class=\"content\">\n";
            project += "<p>" + this.description + "</p>\n";
            project += "</div></br>\n";
            project += "<div class=\"chips\">\n<span class=\"chip\">"+(this.private?"Private":"Public")+"</span>\n</div></br>\n";
            if (this.language != "" && this.language != null) {
                console.log(this.language);
                project += "<div class=\"chips\">\n";
                let languages = this.language.split(" ");
                for (let language of languages) project += "<span class=\"chip\">" + language + "</span>\n";
                project += "</div></br>\n";
            }
            if (this.topics != "" && this.topics != null) {
                console.log(this.topics);
                project += "<div class=\"chips\">\n";
                for (let topic of this.topics) project += "<span class=\"chip\">" + topic + "</span>\n";
                project += "</div></br>\n";
            }
            project += "</div>\n";
            display += project;
        });
        $(".projects").html(display);
    });
};

window.onload = function() {
    $.loadRepositories("IAmSeraph");
};