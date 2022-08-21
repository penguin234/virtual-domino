import Applier from '../3d-transforms/applier';
import Translate from '../3d-transforms/translate';
import Vector3D from '../3d-elements/vector3d';


function Domino(frame, position, rotation, velocity, angularvelocity) {
    this.frame = frame;
    this.position = position.copy();
    this.rotation = rotation.copy();
    this.velocity = velocity.copy();
    this.angularvelocity = angularvelocity.copy();
}

Domino.prototype.GetFigure = function() {
    const seeds = this.frame.GetSeedVectors(this.rotation);

    let surfaces = [];

    for (const i in seeds) {
        let rem = seeds.filter((v, index) => index != i);
        for (const c of [1, -1]) {
            let base = seeds[i].copy().mult(c);
            let surface = {
                points: [],
                norm: base
            };
            for (let [a, b] of [[1, 1], [1, -1], [-1, -1], [-1, 1]]) { 
                surface.points.push(this.position.copy().add(base).add(rem[0].copy().mult(a)).add(rem[1].copy().mult(b)));
            }
            surfaces.push(surface);
        }
    }

    return surfaces;
};

Domino.prototype.GetPoints = function() {
    const seeds = this.frame.GetSeedVectors(this.rotation);

    const p = 1;
    const n = -1;
    let points = [
        this.position.copy().add(seeds[0].copy().mult(p)).add(seeds[1].copy().mult(p)).add(seeds[2].copy().mult(p)),
        this.position.copy().add(seeds[0].copy().mult(p)).add(seeds[1].copy().mult(p)).add(seeds[2].copy().mult(n)),
        this.position.copy().add(seeds[0].copy().mult(p)).add(seeds[1].copy().mult(n)).add(seeds[2].copy().mult(n)),
        this.position.copy().add(seeds[0].copy().mult(p)).add(seeds[1].copy().mult(n)).add(seeds[2].copy().mult(p)),
        this.position.copy().add(seeds[0].copy().mult(n)).add(seeds[1].copy().mult(p)).add(seeds[2].copy().mult(p)),
        this.position.copy().add(seeds[0].copy().mult(n)).add(seeds[1].copy().mult(p)).add(seeds[2].copy().mult(n)),
        this.position.copy().add(seeds[0].copy().mult(n)).add(seeds[1].copy().mult(n)).add(seeds[2].copy().mult(n)),
        this.position.copy().add(seeds[0].copy().mult(n)).add(seeds[1].copy().mult(n)).add(seeds[2].copy().mult(p))
    ];

    return points;
}

Domino.prototype.Move = function() {
    this.position.add(this.velocity);
    this.rotation = Applier.merge(this.rotation, this.angularvelocity);
};

Domino.prototype.ConvertForceCoord = function(point, force) {
    let p = point.copy();
    let f = force.copy();

    const positionInverse = Translate(this.position.x * -1, this.position.y * -1, this.position.z * -1);
    const rotationInverse = this.rotation.T();
    const Inverse = Applier.merge(positionInverse, rotationInverse);

    p = Applier.toPoint(p, Inverse);
    f = Applier.toVector(f, Inverse);

    return { p, f };
};

Domino.prototype.GetAccelerationForce = function(point, direction, acceleration) {
    if (acceleration < Math.pow(10, -10)) {
        return new Vector3D(0, 0, 0);
    }
    let forceSize = null
    const { p, f } = this.ConvertForceCoord(point, direction);
    const axis = p.outerProduct(f);
    const M = this.frame.mass;
    const d = direction.copy().normalize();
    if (axis.abs() == 0) {
        forceSize = acceleration * M;
    }
    else {
        const I = this.frame.GetI(axis);
        forceSize = acceleration / (1 / M + p.abs() * p.outerProduct(d).abs() / I);
    }
    return d.mult(forceSize);
};

Domino.prototype.Force = function(point, force) {
    const { p, f } = this.ConvertForceCoord(point, force);
    let acceleration = this.frame.ApplyForce(p, f);
    let angularacceleration = this.frame.ApplyTorque(p, f);
    acceleration = Applier.toVector(acceleration, this.rotation);
    angularacceleration.axis = Applier.toVector(angularacceleration.axis, this.rotation);

    return { acceleration, angularacceleration };
};

Domino.prototype.Accelerate = function(a) {
    this.velocity.add(a);

    return this;
};

Domino.prototype.AngularAccelerate = function(ra) {
    this.angularvelocity = Applier.merge(this.angularvelocity, ra);

    return this;
};

Domino.prototype.GetPointVelocity = function(point) {
    const positionInverse = Translate(this.position.x * -1, this.position.y * -1, this.position.z * -1);
    const rotationInverse = this.rotation.T();
    const Inverse = Applier.merge(positionInverse, rotationInverse);

    let p = Applier.toPoint(point, Inverse);
    p = Applier.toPoint(p, Applier.merge(this.rotation, this.angularvelocity));
    p.add(this.position).add(this.velocity);

    let v = p.sub(point);
    return v;
};

Domino.prototype.GetOverallInteria = function(point, direction) {
    const d = direction.normalize();
    const { p, f } = this.ConvertForceCoord(point, d);
    const axis = p.outerProduct(f);
    const M = this.frame.mass;
    if (axis.abs() == 0) {
        return M;
    }
    const I = this.frame.GetI(axis);
    return 1 / (1 / M + p.abs() * p.innerProduct(f) / I);
}


export default Domino;