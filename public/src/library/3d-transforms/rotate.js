import Matrix4By4 from '../3d-elements/matrix4by4'


function Rotate(axis, angle) {
    axis = axis.copy().normalize();
    const x = axis.x;
    const y = axis.y;
    const z = axis.z;
    const s = Math.sin(angle);
    const c = Math.cos(angle);

    let matrix = Matrix4By4.unit();
    matrix.write(0, 0, c + x * x * (1 - c));
    matrix.write(0, 1, y * x * (1 - c) + z * s);
    matrix.write(0, 2, z * x * (1 - c) - y * s);
    matrix.write(1, 0, x * y * (1 - c) - z * s);
    matrix.write(1, 1, c + y * y * (1 - c));
    matrix.write(1, 2, z * y * (1 - c) + x * s);
    matrix.write(2, 0, x * z * (1 - c) + y * s);
    matrix.write(2, 1, y * z * (1 - c) - x * s);
    matrix.write(2, 2, c + z * z * (1 - c));

    return matrix;
}


export default Rotate;