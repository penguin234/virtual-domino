Applier = {};

Applier.apply = function(target, transform) {
    res = [0, 0, 0, 0];

    for (const colindex in res) {
        for (const k in transform.matrix[colindex]) {
            res[colindex] += target[k] * transform.matrix[k][colindex];
        }
    }

    return res;
};

Applier.toVector = function(vector, transform) {
    const obj = [vector.x, vector.y, vector.z, 0];

    const res = Applier.apply(obj, transform);

    return new Vector3D(res[0], res[1], res[2]);
}

Applier.toPoint = function(vector, transform) {
    const obj = [vector.x, vector.y, vector.z, 1];

    const res = Applier.apply(obj, transform);

    return new Vector3D(res[0], res[1], res[2]);
}

Applier.merge = function(transform1, transform2) {
    return Matrix4By4.prod(transform1, transform2);
};