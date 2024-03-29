import Matrix from './matrix';


function Matrix4By4(
    n00, n01, n02, n03,
    n10, n11, n12, n13,
    n20, n21, n22, n23,
    n30, n31, n32, n33
    ) {
    this.matrix = [
        [n00, n01, n02, n03],
        [n10, n11, n12, n13],
        [n20, n21, n22, n23],
        [n30, n31, n32, n33]
    ];
}

Matrix4By4.fromArray = function(matrix) {
    return new Matrix4By4(
        matrix[0][0], matrix[0][1], matrix[0][2], matrix[0][3],
        matrix[1][0], matrix[1][1], matrix[1][2], matrix[1][3],
        matrix[2][0], matrix[2][1], matrix[2][2], matrix[2][3],
        matrix[3][0], matrix[3][1], matrix[3][2], matrix[3][3]
    );
};

Matrix4By4.unit = function() {
    return new Matrix4By4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
};

Matrix4By4.prototype.__proto__ = Matrix.prototype;

Matrix4By4.prototype.copy = function() {
    return new Matrix4By4(
        this.matrix[0][0], this.matrix[0][1], this.matrix[0][2], this.matrix[0][3],
        this.matrix[1][0], this.matrix[1][1], this.matrix[1][2], this.matrix[1][3],
        this.matrix[2][0], this.matrix[2][1], this.matrix[2][2], this.matrix[2][3],
        this.matrix[3][0], this.matrix[3][1], this.matrix[3][2], this.matrix[3][3]
    );
};

Matrix4By4.prototype.sub = function(m) {
    this.add(m.copy().mult(-1));

    return this;
};


export default Matrix4By4;