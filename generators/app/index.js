"use strict";
var util = require("util");
var path = require("path");
var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var mkdirp = require("mkdirp");

var folderName = path.basename(process.cwd());

 var BeerkissGenerator = yeoman.generators.Base.extend({
    init : function() {
        console.log("Called init");

        // canvas
        this.usePhaser = false;
        this.useThreejs = false;
        
        // mvc 
        this.useBackbone = false;
        this.useAngular = false;

        // css extensions
        this.useBootstrap = false;

        this.on("end", function() {
            if (!this.options["skip-install"]) {
                console.log("TODO: dependency installation");
                //this.installDependencies();
            } else {
                console.log("Skip dependency installation");
            }
        });
    },
    

    askFor: function() {
        console.log("called askFor")

        var done = this.async();

        this.log(chalk.cyan("... Beerkiss Generator ..."));

        var prompts = [{   

            type: "input",
            name: "projectName",
            message: "Project name?",
            default: folderName
        },{
            type: "list",
            name: "customInstall",
            message: "Quick or Custom?",
            default: false,
            choices: [{
                name: "Quick",
                value: false,
            },{
                name: "Custom",
                value: true
            }]
        }];

        this.prompt(prompts, function(props) {
            //console.log("User wants to call the project: " + props.projectName);
            //console.log("Does the user want a custom install: " + (props.customInstall ? "yes" : "no"));

            this.projectName = props.projectName;

            done();
        }.bind(this));
    },

    app: function() {
        console.log("called app");

        mkdirp("src");
        mkdirp("src/assets");
        mkdirp("src/js");
        mkdirp("src/scss");

        this.fs.copyTpl(
            this.templatePath("_package.json"), 
            this.destinationPath("package.json"),
            this
        );

        this.fs.copyTpl(
            this.templatePath("_bower.json"), 
            this.destinationPath("bower.json"),
            this
        );

        this.fs.copyTpl(
            this.templatePath("jshintrc"),
            this.destinationPath(".jshintrc"),
            this
        );

        this.fs.copy(
            this.templatePath("gitignore"), 
            this.destinationPath(".gitignore")
        );
    },

    projectfiles: function() {
        console.log("called projectfiles");

                
        
        //this.fs.copy("gitignore", ".gitignore");
        this.fs.copy(
            this.templatePath("src/assets/**/*"), 
            this.destinationPath("src/assets")
        );
        
        this.fs.copyTpl(
            this.templatePath("src/js/**/*.js"),
            this.destinationPath("src/js"),
            this
        );

        this.fs.copyTpl(
            this.templatePath("src/scss/**/*.scss"),
            this.destinationPath("src/scss"),
            this
        );

        this.fs.copyTpl(
            this.templatePath("src/index.html"),
            this.destinationPath("src/index.html"),
            this
        );


    }

});

 module.exports = BeerkissGenerator;