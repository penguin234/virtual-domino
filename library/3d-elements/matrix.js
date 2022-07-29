function Matrix() {
    this.matrix = null;
}

Matrix.prototype.log = function() {
    for(const row of this.matrix) {
        line = '';
        for (const value of row) {
            line += String(value) + '\t';
        }
        console.log(line);
    }
};

Matrix.prototype.read = function(row, col) {
    return this.matrix[row][col];
};

Matrix.prototype.write = function(row, col, val) {
    this.matrix[row][col] = val;

    return this;
};

Matrix.prototype.mult = function(c) {
    for (const row of this.matrix) {
        for (let index in row) {
            row[index] *= c;
        }
    }

    return this;
};

Matrix.prototype.add = function(m) {
    for (const rowindex in this.matrix) {
        for (let index in this.matrix[rowindex]) {
            this.matrix[rowindex][index] += m.matrix[rowindex][index];
        }
    }

    return this;
};

Matrix.prod = function(m1, m2) {
    const row = m1.matrix.length;
    const col = m2.matrix[0].length;
    const n = m1.matrix[0].length;

    let matrix = [];
    for (let r = 0; r < row; r++) {
        matrix.push([]);
        for (let c = 0; c < col; c++) {
            matrix[r].push(0);
            for (let k = 0; k < n; k++) {
                matrix[r][c] += m1.matrix[r][k] * m2.matrix[k][c];
            }
        }
    }

    let res = new Matrix();
    res.matrix = matrix;

    return res;
}