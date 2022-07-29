function Matrix3By3(
    n00, n01, n02,
    n10, n11, n12,
    n20, n21, n22
    ) {
    this.matrix = [
        [n00, n01, n02],
        [n10, n11, n12],
        [n20, n21, n22]
    ];
}

Matrix3By3.fromArray = function(matrix) {
    return new Matrix4By4(
        matrix[0][0], matrix[0][1], matrix[0][2],
        matrix[1][0], matrix[1][1], matrix[1][2],
        matrix[2][0], matrix[2][1], matrix[2][2]
    );
};

Matrix3By3.prototype.__proto__ = Matrix.prototype;

Matrix3By3.prototype.copy = function() {
    return new Matrix3By3(
        this.matrix[0][0], this.matrix[0][1], this.matrix[0][2],
        this.matrix[1][0], this.matrix[1][1], this.matrix[1][2],
        this.matrix[2][0], this.matrix[2][1], this.matrix[2][2]
    );
};

Matrix3By3.prototype.sub = function(m) {
    this.add(m.copy().mult(-1));

    return this;
};