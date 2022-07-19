function Matrix4By4(
    n11, n12, n13, n14,
    n21, n22, n23, n24,
    n31, n32, n33, n34,
    n41, n42, n43, n44
    ) {
    this.matrix = [
        [n11, n12, n13, n14],
        [n21, n22, n23, n24],
        [n31, n32, n33, n34],
        [n41, n42, n43, n44]
    ];
}

Matrix4By4.prototype.copy = function() {
    return new Matrix4By4(
        this.matrix[0][0], this.matrix[0][1], this.matrix[0][2], this.matrix[0][3],
        this.matrix[1][0], this.matrix[1][1], this.matrix[1][2], this.matrix[1][3],
        this.matrix[2][0], this.matrix[2][1], this.matrix[2][2], this.matrix[2][3],
        this.matrix[3][0], this.matrix[3][1], this.matrix[3][2], this.matrix[3][3]
    );
};

Matrix4By4.prototype.log = function() {
    for(const row of this.matrix) {
        line = '';
        for (const value of row) {
            line += String(value) + '\t';
        }
        console.log(line);
    }
};

Matrix4By4.prototype.mult = function(c) {
    for (const row of this.matrix) {
        for (let index in row) {
            row[index] *= c;
        }
    }

    return this;
};

Matrix4By4.prototype.add = function(m) {
    for (const rowindex in this.matrix) {
        for (let index in this.matrix[rowindex]) {
            this.matrix[rowindex][index] += m.matrix[rowindex][index];
        }
    }

    return this;
};

Matrix4By4.prototype.sub = function(m) {
    this.add(m.copy().mult(-1));

    return this;
};