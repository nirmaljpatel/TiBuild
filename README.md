# TiBuild
Grunt build scripts to perform adhoc iOS builds for Appcelerator.

1) Place your tiapp.xml under env/[prod|test|stage] folder.
2) Configure build parameters in tasks/options/distribute.js
3) Configure a version number in package.json

To build Ad-hoc distributables,
$ grunt release [patch|major|minor]
