Course App Angular 1 Development

bower install --save

npm install --save

Under bower_components folder go to bootswatch-dist folder and edit .bower.json and bower.json file main parameter to below

"main": [
    "js/bootstrap.js",
    "css/bootstrap.css"
]

then run below commands

gulp default

For production mode gulp default --production this will create index.prod.html

gulp serve

