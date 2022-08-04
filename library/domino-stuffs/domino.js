function Domino(frame, position, rotation, velocity, angularvelocity) {
    this.frame = frame;
    this.position = position;
    this.rotation = rotation;
    this.velocity = velocity;
    this.angularvelocity = angularvelocity;
}

Domino.prototype.GetFigure = function() {
    const seeds = this.frame.GetSeedVectors(this.rotation);

    let surfaces = [];

    for (const i in seeds) {
        let rem = seeds.filter((v, index) => index != i);
        for (const c of [1, -1]) {
            let base = seeds[i].copy().mult(c);
            surface = {
                points: [],
                norm: base
            };
            for ([a, b] of [[1, 1], [1, -1], [-1, -1], [-1, 1]]) {
                surface.points.push(this.position.add(base).add(rem[0].copy().mult(a)).add(rem[1].copy().mult(b)));
            }
            surfaces.push(surface);
        }
    }

    return surfaces;
};