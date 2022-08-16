import Vector3D from '../3d-elements/vector3d';
import Applier from '../3d-transforms/applier';


function DominoFrame(width, length, height, mass) {
    this.width = width;
    this.length = length;
    this.height = height;
    this.mass = mass;

    this.seedVectors = [
        new Vector3D(this.width / 2, 0, 0),
        new Vector3D(0, this.length / 2, 0),
        new Vector3D(0 ,0, this.height / 2)
    ];
}

DominoFrame.prototype.SetWidth = function(width) {
    this.width = width;
    this.seedVectors[0] = new Vector3D(this.width / 2, 0, 0);
}

DominoFrame.prototype.SetLength = function(length) {
    this.length = length;
    this.seedVectors[1] = new Vector3D(0, this.length / 2, 0);
}

DominoFrame.prototype.SetHeight = function(height) {
    this.height = height;
    this.seedVectors[2] = new Vector3D(0, 0, this.height / 2);
}

DominoFrame.prototype.GetSeedVectors = function(transform) {
    return this.seedVectors.map((v) => Applier.toVector(v, transform));
};

DominoFrame.prototype.GetI = function(axis) {
    let x = axis.x;
    let y = axis.y;
    let z = axis.z;
    let w = this.width;
    let l = this.length;
    let h = this.height;
    let m = this.mass;
    const sq = a => a * a;
    
    let I = (m / (sq(x) + sq(y) + sq(z))) * (sq(w) * (sq(y) + sq(z)) / 12 + sq(l) * (sq(x) + sq(y)) / 12 + sq(h) * (sq(x) + sq(y)) / 12 + w * l * x * y / 8 + w * h * x * z / 8 + l * h * y * z / 8);

    return I;
};

DominoFrame.prototype.ApplyTorque = function(point, force) {
    const axis = point.outerProduct(force);
    const I = this.GetI(axis);
    if (isNaN(I) || I == 0) {
        return { axis: new Vector3D(0, 0, 1), angle: 0 };
    }
    const r = axis.abs() / force.abs();
    return { axis: axis, angle: force.abs() * r / I };
};

DominoFrame.prototype.ApplyForce = function(point, force) {
    return force.copy().mult(1 / this.mass);
};


export default DominoFrame;