import Matrix4By4 from '../3d-elements/matrix4by4'


function Scale(sx, sy, sz) {
    let matrix = Matrix4By4.unit();
    matrix.write(0, 0, sx);
    matrix.write(1, 1, sy);
    matrix.write(2, 2, sz);

    return matrix;
};


export default Scale;