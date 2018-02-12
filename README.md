
weex src --entry src/index.vue

weex compile src/*.vue dist
weex compile src/** dist
npm rebuild node-sass --force