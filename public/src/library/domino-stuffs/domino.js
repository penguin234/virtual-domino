import Applier from '../3d-transforms/applier';
import Translate from '../3d-transforms/translate';


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
}

Domino.prototype.Force = function(point, force) {
    const { p, f } = this.ConvertForceCoord(point, force);
    const acceleration = this.frame.ApplyForce(p, force);
    const angularacceleration = this.frame.ApplyTorque(p, f);

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


export default Domino;