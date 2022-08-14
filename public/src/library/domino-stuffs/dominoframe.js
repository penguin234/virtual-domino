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

DominoFrame.prototype.GetSeedVectors = function(transform) {
    this.seedVectors = [
        new Vector3D(this.width / 2, 0, 0),
        new Vector3D(0, this.length / 2, 0),
        new Vector3D(0 ,0, this.height / 2)
    ];
    
    return this.seedVectors.map((v) => Applier.toVector(v, transform));
};


export default DominoFrame;