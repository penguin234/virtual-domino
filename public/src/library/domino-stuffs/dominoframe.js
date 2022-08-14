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


export default DominoFrame;