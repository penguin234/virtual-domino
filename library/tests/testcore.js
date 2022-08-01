function StrictCorrection(a, b) {
    return a === b;
}

function MakeApproximateCorrection(d) {
    return function(a, b) {
        return Math.abs(a - b) <= d;
    }
}


const tolerance = 1 / 1000000;

const correction = MakeApproximateCorrection(tolerance);


function CorrectVector3D(v1, v2, corr) {
    return corr(v1.x, v2.x) && corr(v1.y, v2.y) && corr(v1.z, v2.z);
}

const isVectorEqual = function(actual, expected) {
    assert(CorrectVector3D(actual, expected, correction), actual.toString() + ' doesn\'t match ' + expected.toString())
};


function CorrectMatrix(m1, m2, corr) {
    if (m1.matrix.length != m2.matrix.length) {
        return false;
    }

    for (const r in m1.matrix) {
        let r1 = m1.matrix[r];
        let r2 = m2.matrix[r];

        if (r1.length != r2.length) {
            return false;
        }

        for (const c in r1) {
            if (!corr(r1[c], r2[c])) {
                return false;
            }
        }
    }

    return true;
}

const isMatrixEqual = function(actual, expected) {
    assert(CorrectMatrix(actual, expected, correction), actual.toString() + ' doesn\'t match ' + expected.toString());
};