function CorrectVector3D(v1, v2, corr) {
    return corr(v1.x, v2.x) && corr(v1.y, v2.y) && corr(v1.z, v2.z);
}

function StrictCorrection(a, b) {
    return a === b;
}

function MakeApproximateCorrection(d) {
    return function(a, b) {
        return Math.abs(a - b) <= d;
    }
}



describe('Vector3D', function() {
    const tolerance = 1 / 1000000;
    const correction = MakeApproximateCorrection(tolerance);
    const isVectorsEqual = function(actual, expected) {
        assert(CorrectVector3D(actual, expected, correction), actual.toString() + ' doesn\'t match ' + expected.toString())
    }

    describe('#add()', function() {
        it('add (2, 2, 2) to (1, 2, 3) is (3, 4, 5)', function() {
            let v1 = new Vector3D(1, 2, 3);
            let v2 = new Vector3D(2, 2, 2);
            let expected = new Vector3D(3, 4, 5);

            isVectorsEqual(v1.add(v2), expected);
        });

        it('add (-1, -4, 5) to (4.5, 3.2, 2.3) is (3.5, -0.8, 7.3)', function() {
            let v1 = new Vector3D(4.5, 3.2, 2.3);
            let v2 = new Vector3D(-1, -4, 5);
            let expected = new Vector3D(3.5, -0.8, 7.3);

            isVectorsEqual(v1.add(v2), expected);
        });
    });

    describe('#mult()', function() {
        it('multiply 3 to (1, 2, 3) is (3, 6, 9)', function() {
            let v1 = new Vector3D(1, 2, 3);
            let c = 3;
            let expected = new Vector3D(3, 6, 9);

            isVectorsEqual(v1.mult(c), expected);
        });

        it('multiply 0.7 to (2, 2, -2) is (1.4, 1.4, -1.4)', function() {
            let v1 = new Vector3D(2, 2, -2);
            let c = 0.7;
            let expected = new Vector3D(1.4, 1.4, -1.4);

            isVectorsEqual(v1.mult(c), expected);
        });
    });

    describe('#abs()', function() {
        it('absolute of (2, 0, 0) is 2', function() {
            let v1 = new Vector3D(2, 0, 0);
            let expected = 2;

            v1.abs().should.equal(expected);
        });

        it('absolute of (0, -1.5, 0) is 1.5', function() {
            let v1 = new Vector3D(0, -1.5, 0);
            let expected = 1.5;
            
            v1.abs().should.equal(expected);
        });

        it('absolute of (0, 0, -4) is 4', function() {
            let v1 = new Vector3D(0, 0, -4);
            let expected = 4;
            
            v1.abs().should.equal(expected);
        });

        it('absolute of (1, 1, 1) is sqrt(3)', function() {
            let v1 = new Vector3D(1, 1, 1);
            let expected = Math.sqrt(3);
            
            v1.abs().should.equal(expected);
        });
    });

    describe('#normalize()', function() {
        it('normalize (2, 0, 0) is (1, 0, 0)', function() {
            let v1 = new Vector3D(2, 0, 0);
            let expected = new Vector3D(1, 0, 0);

            isVectorsEqual(v1.normalize(), expected);
        });

        it('normalize (0, -4, 0) is (0, -1, 0)', function() {
            let v1 = new Vector3D(0, -4, 0);
            let expected = new Vector3D(0, -1, 0);

            isVectorsEqual(v1.normalize(), expected);
        });

        it('normalize (0, 0, -0.3) is (0, 0, -1)', function() {
            let v1 = new Vector3D(0, 0, -0.3);
            let expected = new Vector3D(0, 0, -1);

            isVectorsEqual(v1.normalize(), expected);
        });

        it('normalize (1, -1, 1) is (sqrt(1/3), -sqrt(1/3), sqrt(1/3))', function() {
            let v1 = new Vector3D(1, -1, 1);
            let expected = new Vector3D(Math.sqrt(1 / 3), -Math.sqrt(1 / 3), Math.sqrt(1 / 3));

            isVectorsEqual(v1.normalize(), expected);
        });
    });
});