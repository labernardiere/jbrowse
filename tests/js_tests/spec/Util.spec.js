require([
            'dojo/_base/array',
            'JBrowse/Util'
        ], function( array, Util ) {

function expectDeepEqual( func, input, output ) {
    it( JSON.stringify(input)+' -> '+JSON.stringify(output), function() {
            expect( func.apply( Util, input ) ).toEqual( output );
        });
}

function testAll( func, inOut ) {
    array.forEach( inOut,
                   function( testcase ) {
                       expectDeepEqual( func, testcase[0], testcase[1] );
                   });
}

describe( 'Util.basename', function() {

    testAll( Util.basename, [
                       [ [null], undefined ],
                       [ [{},'.baz'], undefined ],
                       [ ['bar.baz'], 'bar.baz' ],
                       [ ['foo/bar.baz'], 'bar.baz' ],
                       [ ['foo/bar.baz', '.baz' ], 'bar' ],
                       [ ['foo/bar.BAZ', '.baz' ], 'bar' ],
                       [ ['foo/bar.baz', '.BAZ' ], 'bar' ],
                       [ ['/noggin/boggin/' ], 'boggin' ],
                       [ ['/bee/boo/foo/bar.baz', '.BAZ' ], 'bar' ],
                       [ ['foo/barfbaz', '.baz' ], 'barfbaz' ],
                       [ ['foo\\barfbaz', '.baz' ], 'barfbaz' ],
                       [ ['foo\\bar.baz', '.baz' ], 'bar' ]
             ]);
});

describe( 'Util.parseLocString', function() {

    testAll( Util.parseLocString,
             [
                 [ ['snark123'], null ],
                 [ ['ctgA:3000..4000'], { ref: 'ctgA', start: 2999, end: 4000 } ],
                 [ ['ctgA^:3,000..4,000.0'], { ref: 'ctgA^', start: 2999, end: 4000 } ],
                 [ ['ctgA^:3,000..4,000.0 (42 kb)'], { ref: 'ctgA^', start: 2999, end: 4000 } ],
                 [ ['ziggy234.1:3,000..4,000.0 (42 kb)'], { ref: 'ziggy234.1', start: 2999, end: 4000 } ],
                 [ ['3,000..4,000.0 (42 kb)'], { start: 2999, end: 4000 } ],
                 [ ['3,000'], { start: 2999, end: 2999 } ],
                 [ ['  3000 (42kb) '], { start: 2999, end: 2999 } ],
                 [ ['  3000 (42) '], { start: 2999, end: 2999 } ],
                 [ ['  3000 ( 42 ) '], { start: 2999, end: 2999 } ],
                 [ ['3000 ( 42 ) '], { start: 2999, end: 2999 } ],
                 [ [' higgleplonk: 3000 ( 42 ) '], { ref: 'higgleplonk', start: 2999, end: 2999 } ],
                 [ ['234324x#21: 3000 ( 42 ) '], { ref: '234324x#21', start: 2999, end: 2999 } ],
                 [ ['ctgA:3000'], { ref: 'ctgA', start: 2999, end: 2999 } ]
             ]);

});

});
