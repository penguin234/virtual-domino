Applier = {};

Applier.apply = function(vector, transform) {
    obj = [vector.x, vector.y, vector.z, 1];
    res = [0, 0, 0, 0];

    for (const colindex in res) {
        for (const k in transform.matrix[colindex]) {
            res[colindex] += obj[k] * transform.matrix[k][colindex];
        }
    }

    return new Vector3D(res[0], res[1], res[2]);
};

Applier.merge = function(transform1, transform2) {
    return Matrix4By4.prod(transform1, transform2);
};