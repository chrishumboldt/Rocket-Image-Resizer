# Rocket Image Resizer

A simple NodeJS image resizer.

## Getting Started
Install the package using the following command.

```
npm install rocket-image-resizer
```

## Example Usage
Execute the image resizer on a directory. All options are shown in the example.

```javascript
const Rir = require('rocket-image-resizer');

Rir({
   imagesDir: './images/original/',
   outputDir: './images/new/',
   cleanName: true, // Default of 'false'
   maxHeight: 150, // Default of '1000'
   maxWidth: 400 // Default of '1000'
});
```

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Copyright and License
Copyright 2017 Rocket Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
