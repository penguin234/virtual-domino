import Vector3D from "../3d-elements/vector3d";
import Domino from "./domino";


function DominoSystem() {
    this.dominos = [];
}

DominoSystem.CheckCollisions = function() {

};

DominoSystem.CheckFloorCollisions = function(domino, surface) {
    surface = {
        norm: new Vector3D(0, 0, 1),
        border: 0
    }

    const points = domino.GetPoints();

    let collides = [];
    for (const point of points) {
        if (point.innerProduct(surface.norm) <= 0) {
            collides.push(point);
        }
    }

    if (collides.length == 0) {
        return { point: null, velocity: null };
    }

    let p = collides.reduce((a, b) => a.add(b), new Vector3D(0, 0, 0));
    p.mult(1 / collides.length);

    let v = domino.GetPointVelocity(p);
    
    return { point: p, velocity: v };
};

DominoSystem.CheckDominoCollision(d1, d2) {
    
}


export default DominoSystem;