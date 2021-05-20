MathML support for CKEditor 5
===

This package extends the CKEditor 5 model to allow working with the MathML standard.

## Install instructions

1. Install the npm module:

   ```
   npm install @wiris/ckeditor5-mathml
   ```

2. Update the CKEditor configuration by adding the plugin:

   ```js
   import MathML from '@wiris/ckeditor5-mathml/src/mathml';

   ...

   ClassicEditor
        .create( editorElement, {
            plugins: [ ..., MathML, ... ],
   ```

# WARNING

This project is no longer useful as the integration with CKEditor5 with the mathtype plugin supports mathml itself, so the project will be archived soon.