/**
@author Chris Humboldt
**/

const Chalk = require('chalk');
const Fs = require('fs');
const Rocket = require('rocket-tools');

module.exports = {
   create: function (path, callback) {
      this.exists(path, function (resp) {
         if (!resp) {
            Fs.mkdir(path);
            Rocket.log(Chalk.magenta('Directory: ') + Chalk.cyan(path) + Chalk.magenta('...created'));
         }
         callback();
      });
   },
   exists: function (path, callback) {
      if (!Rocket.is.string(path) || !Rocket.is.function(callback)) { return false; }


      Fs.stat(path, function (error, stats) {
         if (error || !stats.isDirectory()) {
            Rocket.log('');
            Rocket.log(Chalk.magenta('Directory: ') + Chalk.cyan(path) + Chalk.magenta('...not found'));
            return callback(false);
         }

         return callback(true);
      });
   }
};
