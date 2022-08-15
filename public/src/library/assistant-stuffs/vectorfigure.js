import Matrix4By4 from '../3d-elements/matrix4by4';
import Rotate from '../3d-transforms/rotate';
import Scale from '../3d-transforms/scale';
import Translate from '../3d-transforms/translate';
import Applier from '../3d-transforms/applier';
import Vector3D from '../3d-elements/vector3d';

function VectorFigure(point, vector, scalefactor) {
    this.point = point.copy();
    this.vector = vector.copy();
    this.scalefactor = scalefactor;
}

VectorFigure.GetBaseFigure = function() {
    const tipLength = 0.3;
    const tipWidth = 0.3;
    const tailWidth = 0.1;
    const length = 1;

    // tip head
    const head = new Vector3D(0, 0, 0);
    // tip tail
    const tip1 = new Vector3D(tipWidth / 2, tipWidth / 2, tipLength * -1);
    const tip2 = new Vector3D(tipWidth / -2, tipWidth / 2, tipLength * -1);
    const tip3 = new Vector3D(tipWidth / -2, tipWidth / -2, tipLength * -1);
    const tip4 = new Vector3D(tipWidth / 2, tipWidth / -2, tipLength * -1);
    // tail head
    const th1 = new Vector3D(tailWidth / 2, tailWidth / 2, tipLength * -1);
    const th2 = new Vector3D(tailWidth / -2, tailWidth / 2, tipLength * -1);
    const th3 = new Vector3D(tailWidth / -2, tailWidth / -2, tipLength * -1);
    const th4 = new Vector3D(tailWidth / 2, tailWidth / -2, tipLength * -1);
    // tail tail
    const tt1 = new Vector3D(tailWidth / 2, tailWidth / 2, length * -1);
    const tt2 = new Vector3D(tailWidth / -2, tailWidth / 2, length * -1);
    const tt3 = new Vector3D(tailWidth / -2, tailWidth / -2, length * -1);
    const tt4 = new Vector3D(tailWidth / 2, tailWidth / -2, length * -1);

    let surfaces = [
        [head, tip1, tip2],
        [head, tip2, tip3],
        [head, tip3, tip4],
        [head, tip4, tip1],

        [tip4, tip3, tip2, tip1],

        [th1, th4, tt4, tt1],
        [th2, th1, tt1, tt2],
        [th3, th2, tt2, tt3],
        [th4, th3, tt3, tt4],

        [tt4, tt3, tt2, tt1]
    ];

    surfaces = surfaces.map(points => {
        return {
            points: points.map(point => point.copy()),
            norm: points[1].copy().sub(points[0]).outerProduct(points[2].copy().sub(points[1]))
        };
    });

    return surfaces;
}

VectorFigure.prototype.GetFigure = function() {
    const d = this.vector.copy().normalize();
    const s = this.vector.abs();
    /*
    const rotation = new Matrix4By4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        d.x, d.y, d.z, 0,
        0, 0, 0, 1
    );
    */
    const z = new Vector3D(0, 0, 1);
    const rotation = Rotate(z.outerProduct(d), Math.acos(z.innerProduct(d)));
    const scale = Scale(this.scalefactor * s, this.scalefactor * s, this.scalefactor * s);
    const translate = Translate(this.point.x, this.point.y, this.point.z);
    const transform = Applier.merge(Applier.merge(rotation, scale), translate);

    let surfaces = VectorFigure.GetBaseFigure();
    for (let surface of surfaces) {
        surface.points = surface.points.map(p => Applier.toPoint(p, transform));
        surface.norm = Applier.toVector(surface.norm, transform);
    }

    return surfaces;
}


export default VectorFigure;