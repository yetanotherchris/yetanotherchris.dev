var gulp = require("gulp");
var resume = require("gulp-resume");
var rename = require("gulp-rename");
var replace = require("gulp-replace"); // bug fix for templates that can't have null dates
 
// eddywashere
// elegant-hitesh
// crispy-potato
gulp.task("default", function() {
  return gulp.src("resume.json")
    .pipe(resume({
      format: "html",
      theme: "eddywashere"
    }))
    .pipe(replace(/January 2099/g, "Present"))
    .pipe(rename("index.html"))
    .pipe(gulp.dest("."));
});
 