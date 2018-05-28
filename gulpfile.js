var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    pug = require('gulp-pug'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var path = {
  src: {
    //исходные файлы
    pug: './src/*.pug',
    styl: ['./src/style/style.styl'],
    js: ['./src/js/**/*.js'],
    images: './src/img/**/*.*',
    fonts: './src/fonts/**/*.*'
  },
  build: {
    //готовые файлы
    src: './build/',
    style: './build/css/',
    js: './build/js/',
    images: './build/img/',
    fonts: './build/fonts/'
  },
  watch: {
    //смотрим за изменениями
    pug: './src/**/*.pug',
    templates: './src/templates/**/*.pug',
    styl: './src/style/**/*.styl',
    js: './src/js/**/*.js',
    images: './src/img/**/*.*',
    fonts: './src/fonts/**/*.*'
  },

  clean: './build'
};

function clean() {
  return del(path.clean);
}

//таск сборки html
gulp.task('pug', function html() {
  return gulp.src(path.src.pug, {since: gulp.lastRun('pug')})
  .pipe(plumber())
  .pipe(pug({
    pretty: true,
    cache: true
  }))
  .pipe(gulp.dest(path.build.src))
  .pipe(browserSync.stream());
});

//таск копирования шрифтов
gulp.task('copyFonts', function() {
  return gulp.src(path.src.fonts)
  .pipe(plumber())
  .pipe(gulp.dest(path.build.fonts))
  .pipe(browserSync.stream());
});

//таск копирования изображений
gulp.task('copyImg', function() {
  return gulp.src(path.src.images)
  .pipe(plumber())
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()],
    interlaced: true,
    options: {
        cache: true
    }
  }))
  .pipe(gulp.dest(path.build.images))
  .pipe(browserSync.stream());
});

//препроцессор stylus
gulp.task('stylus', function() {
  return gulp.src(path.src.styl)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      'include css': true
    }))
    .on('error', function (error) {
      console.error('' + error);
    })
    .pipe(stylus({
       compress: true
    }))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(cssnano({
      //не учитываем zindex
      zindex: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.style))
    .pipe(browserSync.stream());
})

//препроцессор javascript
gulp.task('javascript', function() {
  return gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('script.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
});

//initBrowserSync
var initBrowserSync = function (){
  browserSync({
    // Customize the Browsersync console logging prefix
    logPrefix: 'BrowserSync',
    // Sync viewports to TOP position
    scrollProportionally: true,
    //Открывать страницу в браузере по умолчанию
    open: true,
    //папка для live server
    server: {
      //папка куда смотреть
      baseDir: './build',
      //показывать в папке
      directory: true,
      //порт
      port: 3000
    }
  })
}

gulp.task('watch', function (done){
  gulp.watch(path.watch.pug, gulp.series('pug')).on('change', reload);
  gulp.watch(path.watch.fonts, gulp.series('copyFonts')).on('change', reload);
  gulp.watch(path.watch.images, gulp.series('copyImg')).on('change', reload);
  gulp.watch(path.watch.styl, gulp.series('stylus')).on('change', reload);
  gulp.watch(path.watch.js, gulp.series('javascript')).on('change', reload);
  //done обезательно
  done();
})
//сборка
gulp.task('build', 
  gulp.series(clean, 
    gulp.parallel('pug', 'copyFonts', 'copyImg', 'stylus', 'javascript'),
    'watch',
    initBrowserSync
    )
);
gulp.task('clean', gulp.series(clean));