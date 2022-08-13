function Translate(tx, ty, tz) {
    matrix = Matrix4By4.unit();
    matrix.write(3, 0, tx);
    matrix.write(3, 1, ty);
    matrix.write(3, 2, tz);

    return matrix;
};


export default Translate;