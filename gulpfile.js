var gulp = require('gulp'),
    pug = require('gulp-pug'),
    stylus = require('gulp-stylus'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    plumber = require('gulp-plumber'),
    gcmq = require('gulp-group-css-media-queries'),
    rename = require('gulp-rename'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    del = require('del'),

    browserSync = require('browser-sync'),
    server = browserSync.create(),

    production = false;

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './build'
    }
  });
  done();
}
var jsonFiles = [
	'src/assets/**/*.json'
];
var pugFiles = [
	'src/**/*.pug',
	'!src/layouts/**',
	'!src/blocks/**',
    '!src/globals/**/*.pug',
    '!src/vendor/**/*.pug'
];
var stylFiles = [
	'src/assets/**/*.styl',
];
var cssVendor = [
    'src/vendor/**/*.css'
];
var sassVendor = [
    'src/vendor/**/*.sass'
];
var scssVendor = [
    'src/vendor/**/*.scss'
];
var jsFiles = [
	'!src/vendor/**/*.js',
	'src/assets/**/*.js',
	'src/blocks/**/*.js'	
];
var jsVendor = [
    'src/vendor/**/*.js'
];
var imgFiles = [
	'src/assets/**/*.{jpg,png,jpeg,svg,gif}',
];

gulp.task('pug', function() {
	return gulp.src(pugFiles)
		.pipe(pug({
			pretty: true
		}))
        .pipe(plumber())
		.pipe(gulp.dest('build/'))
});

gulp.task('stylus', function() {
    var postCSSplugins = [
        autoprefixer({browsers: ['last 10 version']})
    ];
	if (production){
		return gulp.src(stylFiles)
			.pipe(stylus())
			.pipe(postcss(postCSSplugins))
			.pipe(concat('assets/app.css'))
			.pipe(plumber())
            .pipe(gcmq())
			.pipe(cssnano())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('build/'))
			.pipe(server.stream())
	}
	return gulp.src(stylFiles)
		.pipe(stylus())
		.pipe(postcss(postCSSplugins))
    	.pipe(concat('assets/app.css'))
        .pipe(plumber())
		.pipe(gulp.dest('build/'))
		.pipe(server.stream())
});

gulp.task('cssVendor', function() {
    var postCSSplugins = [
        autoprefixer({browsers: ['last 10 version']})
    ];
    if (production){
        return gulp.src(cssVendor)
            .pipe(postcss(postCSSplugins))
            .pipe(concat('assets/vendor.css'))
            .pipe(plumber())
            .pipe(gcmq())
            .pipe(cssnano())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('build/'))
            .pipe(server.stream())
    }
	return gulp.src(cssVendor)
		.pipe(postcss(postCSSplugins))
    	.pipe(concat('assets/vendor.css'))
        .pipe(plumber())
		.pipe(gulp.dest('build/'))
		.pipe(server.stream())
});

gulp.task('sassVendor', function() {
    var postCSSplugins = [
        autoprefixer({browsers: ['last 10 version']})
    ];
    if (production){
        return gulp.src(sassVendor)
            .pipe(postcss(postCSSplugins))
            .pipe(concat('assets/vendor.sass'))
            .pipe(plumber())
            .pipe(gcmq())
            .pipe(cssnano())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('build/'))
            .pipe(server.stream())
    }
	return gulp.src(sassVendor)
		.pipe(postcss(postCSSplugins))
    	.pipe(concat('assets/vendor.sass'))
        .pipe(plumber())
		.pipe(gulp.dest('build/'))
		.pipe(server.stream())
});

gulp.task('scssVendor', function() {
    var postCSSplugins = [
        autoprefixer({browsers: ['last 10 version']})
    ];
    if (production){
        return gulp.src(scssVendor)
            .pipe(postcss(postCSSplugins))
            .pipe(concat('assets/vendor.scss'))
            .pipe(plumber())
            .pipe(gcmq())
            .pipe(cssnano())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('build/'))
            .pipe(server.stream())
    }
	return gulp.src(scssVendor)
		.pipe(postcss(postCSSplugins))
    	.pipe(concat('assets/vendor.scss'))
        .pipe(plumber())
		.pipe(gulp.dest('build/'))
		.pipe(server.stream())
});
gulp.task('js', function () {
    if (production){
        return gulp.src(jsFiles)
        .pipe(concat('assets/app.js'))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build'))
    } 
    return gulp.src(jsFiles)
        .pipe(concat('assets/app.js'))
        .pipe(plumber())
        .pipe(gulp.dest('build'))
    
});
gulp.task('json', function () {
    if (production){
        return gulp.src(jsonFiles)
        .pipe(concat('assets/data.json'))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build'))
    } 
    return gulp.src(jsonFiles)
        .pipe(concat('assets/data.json'))
        .pipe(plumber())
        .pipe(gulp.dest('build'))
    
});
gulp.task('jsVendor', function () {
  return gulp.src(jsVendor)
    .pipe(concat('assets/vendor.js'))
    .pipe(plumber())
    .pipe(gulp.dest('build'))
});

gulp.task('img', function () {
    if (production) {
        return gulp.src(imgFiles)
        .pipe(plumber())
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('build/assets'))
    } 
    return gulp.src(imgFiles)
        .pipe(plumber())
        .pipe(gulp.dest('build/assets'))
    
});

gulp.task('font', function () {
  return gulp.src('src/assets/fonts/**/*.*')
    .pipe(gulp.dest('build/assets/fonts'))
    .pipe(plumber())
});

gulp.task('watch', function(){
	gulp.watch('src/**/*.styl', gulp.series('stylus', 'cssVendor', 'sassVendor', 'scssVendor'));
	gulp.watch('src/**/*.pug', gulp.series('pug', reload));
	gulp.watch('src/**/*.js', gulp.series('js', 'jsVendor', reload));
	gulp.watch('src/assets/**/*.json', gulp.series('json', reload));
	gulp.watch(imgFiles, gulp.series('img', reload));
});

gulp.task('clean', function(){
	return del('./build');	
});

gulp.task('build', gulp.parallel('stylus', 'cssVendor', 'sassVendor', 'scssVendor', 'pug', 'js', 'json', 'jsVendor', 'img', 'font'));

gulp.task('serve', gulp.parallel('watch', serve));

gulp.task('default', gulp.series('clean','build', 'serve'));