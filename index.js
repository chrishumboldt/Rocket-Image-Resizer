/**
@author Chris Humboldt
**/

const Chalk = require('chalk');
const Directory = require('./module/directory');
const Jimp = require('jimp');
const Rocket = require('rocket-tools');
const Walker = require('dir-at-st');

module.exports = (uOptions) => {
   let self = {};

   // Functions
   self.init = () => {
      const opts = self.getOptions();

      Directory.exists(opts.inDir, (resp) => {
         if (resp) {
            Directory.create(opts.outDir, () => {
               self.resize.images(opts);
            });
         }
      });
   }

   self.getOptions = () => {
      let options = {
         cleanName: Rocket.helper.setDefault(uOptions.cleanName, false),
         inDir: Rocket.helper.setDefault(uOptions.imagesDir, ''),
         max: {
            height: Rocket.helper.setDefault(uOptions.maxHeight, 1000),
            width: Rocket.helper.setDefault(uOptions.maxWidth, 1000)
         },
         outDir: Rocket.helper.setDefault(uOptions.outputDir, './images/new/')
      };

      return options;
   }

   self.resize = {
      image: (image, opts) => {
         let imageName = image.split('/').pop();

         // Catch
         if (!Rocket.is.image(imageName)) {
            Rocket.log(Chalk.magenta('Error: ') + Chalk.cyan(image) + Chalk.magenta('...not an image'));
            return;
         }

         // Continue
         Jimp.read(image)
         .then((jImage) => {
            if (opts.cleanName) {
               imageName = Rocket.string.lowercase.all(imageName.replace(/ /g, '-').replace(/&/g, 'and'));
            }
            jImage.scaleToFit(opts.max.width, opts.max.height)
               .write(opts.outDir + imageName, () => {
                  Rocket.log(Chalk.magenta('Image Resize: ') + Chalk.cyan(image) + Chalk.magenta('...done'));
               });
         })
         .catch((error) => {
            Rocket.log(Chalk.magenta('Image Error: ') + Chalk.cyan(error));
         });
      },
      images: (opts) => {
         Walker({
            directory: opts.inDir,
            find: 'files'
         }, (files) => {
            if (files.length < 1) {
               Rocket.log('');
               Rocket.log(Chalk.magenta('Images: ') + Chalk.cyan(opts.inDir) + Chalk.magenta('...none found'));
               Rocket.log('');
            } else {
               Rocket.log('');
               Rocket.log(Chalk.magenta('Images: ') + Chalk.cyan('Resizing...'));
               Rocket.log('');

               for (var i = 0, len = files.length; i < len; i++) {
                  self.resize.image(files[i], opts);
               }
            }
         });
      }
   }

   // Execute
   self.init();
}
