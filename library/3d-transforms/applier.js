Applier = {};

Applier.apply = function(vector, matrix) {
    obj = [vector.x, vector.y, vector.z, 1];
    res = [0, 0, 0, 0];

    for (const colindex in res) {
        for (const k in matrix[colindex]) {
            res[colindex] += obj[k] * matrix[k][colindex];
        }
    }

    return new Vector3D(res[0], res[1], res[2]);
}