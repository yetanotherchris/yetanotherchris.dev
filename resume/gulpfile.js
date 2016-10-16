var gulp = require("gulp");
var resume = require("gulp-resume");
var rename = require("gulp-rename");

// work around for templates that can't have null dates
var replace = require("gulp-replace"); 
 
 // templates:
// eddywashere
// elegant-hitesh
// crispy-potato
//
gulp.task("default", function() {
  return gulp.src("resume.json")
    .pipe(resume({
      format: "html",
      theme: "eddywashere"
    }))
    .pipe(replace(/January 2099/g, "Present"))
    .pipe(replace(/<h1>/g, "<style type='text/css'>h1,h2 { font-weight:bold; } @media print { .col-sm-12:nth-child(2) { margin-bottom:100px; } }</style><h1>"))
    .pipe(rename("index.html"))
    .pipe(gulp.dest("."));
});
 