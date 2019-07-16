import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { schema as mathmlSchema, attributes as mathmlAttributes } from './mathmlschema';
import MathmlDataProcessor from './conversion/mathmldataprocessor';

export default class MathML extends Plugin {

    static get requires() {
        return [];
    }

    static get pluginName() {
        return 'MathML';
    }

    init() {

        const editor = this.editor;
        const schema = editor.model.schema;

        // If the MathType plugin is loaded, we don't create editingDowncasts
        let editingDowncast = true;//!editor.config.get( 'plugins' ).some( plugin => plugin.name == 'Wiris' );

        /*** Extend model ***/

        // For every element of MathML...
        for ( const { realName, modelName, definition, needsCasting } of mathmlSchema ) {

            // Register the element with its definition
            schema.register( modelName, definition );

            // Add casting?
            if ( needsCasting ) {

                if ( editingDowncast ) {

                    editor.conversion.elementToElement( {
                        model: modelName,
                        view: realName
                    } );

                } else {

                    editor.conversion.for( 'upcast' ).elementToElement( {
                        model: modelName,
                        view: realName
                    } );

                    editor.conversion.for( 'dataDowncast' ).elementToElement( {
                        model: modelName,
                        view: realName
                    } );

                }

            }

            for ( const attribute of mathmlAttributes ) {
                editor.conversion.attributeToAttribute( {
                    model: {
                        key: attribute,
                        name: modelName,
                    },
                    view: {
                        key: attribute,
                        name: realName,
                    }
                } );
            }

        }

        // Allow text in some elements
        schema.extend( '$text', {
            allowIn: mathmlSchema
                        .filter( element => element.allowsText )
                        .map( element => element.modelName )
        } );

        // Data processor to output proper MathML
        editor.data.processor = new MathmlDataProcessor();

    }

}
