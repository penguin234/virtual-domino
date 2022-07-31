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
    const isEqual = function(actual, expected) {
        assert(CorrectVector3D(actual, expected, correction), actual.toString() + ' doesn\'t match ' + expected.toString())
    }

    describe('#add()', function() {
        it('add (2, 2, 2) to (1, 2, 3) is (3, 4, 5)', function() {
            let v1 = new Vector3D(1, 2, 3);
            let v2 = new Vector3D(2, 2, 2);
            let expected = new Vector3D(3, 4, 5);

            isEqual(v1.add(v2), expected);
        });

        it('add (-1, -4, 5) to (4.5, 3.2, 2.3) is (3.5, -0.8, 7.3)', function() {
            let v1 = new Vector3D(4.5, 3.2, 2.3);
            let v2 = new Vector3D(-1, -4, 5);
            let expected = new Vector3D(3.5, -0.8, 7.3);

            isEqual(v1.add(v2), expected);
        });
    });

    describe('#mult()', function() {
        it('multiply 3 to (1, 2, 3) is (3, 6, 9)', function() {
            let v1 = new Vector3D(1, 2, 3);
            let c = 3;
            let expected = new Vector3D(3, 6, 9);

            isEqual(v1.mult(c), expected);
        });

        it('multiply 0.7 to (2, 2, -2) is (1.4, 1.4, -1.4)', function() {
            let v1 = new Vector3D(2, 2, -2);
            let c = 0.7;
            let expected = new Vector3D(1.4, 1.4, -1.4);

            isEqual(v1.mult(c), expected);
        });
    });
});