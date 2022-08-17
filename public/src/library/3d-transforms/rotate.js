import Matrix4By4 from '../3d-elements/matrix4by4';
import Vector3D from '../3d-elements/vector3d';
import Applier from '../3d-transforms/applier';


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

Rotate.GetMetadata = function(rotation) {
    const zeroexpect = Math.pow(10, -10);
    const isZero = (n) => Math.abs(n) < zeroexpect;

    let p1 = new Vector3D(1, 0, 0);
    let p2 = new Vector3D(0, 1, 0);
    let q1 = Applier.toVector(p1, rotation).sub(p1);
    let q2 = Applier.toVector(p2, rotation).sub(p2);
    let axis = null;
    let seed = null;
    if (isZero(q1.abs())) {
        axis = p1;
        seed = p2;
    }
    else if (isZero(q2.abs())) {
        axis = p2;
        seed = p1;
    }
    else {
        axis = q1.outerProduct(q2);
        seed = q1;
        if (isZero(axis.abs())) {
            let p3 = new Vector3D(0, 0, 1);
            let q3 = Applier.toVector(p3, rotation).sub(p3);
            if (q3.abs() == 0) {
                axis = p3;
                seed = p1;
            }
            else {
                axis = q1.outerProduct(q3);
                seed = q1;
            }
        }
    }

    axis.normalize();
    seed.normalize();

    let cosA = Applier.toVector(seed, rotation).innerProduct(seed);
    let angle = Math.acos(cosA);

    return { axis, angle };
};


export default Rotate;