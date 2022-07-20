function Scale(sx, sy, sz) {
    matrix = Matrix4By4.unit();
    matrix.write(0, 0, sx);
    matrix.write(1, 1, sy);
    matrix.write(2, 2, sz);

    return matrix;
};