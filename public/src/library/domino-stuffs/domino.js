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


export default Domino;