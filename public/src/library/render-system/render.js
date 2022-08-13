function RenderMachine(camera) {
    this.camera = camera;
}

RenderMachine.prototype.RenderSurface = function(surface) {
    const res = {
        points: [],
        zorder: 0
    };

    const proj = this.camera.GetProjectionTransform();

    res.points = surface.points.map(p => Point2D.NormalizeProjectedPoint(Applier.toPoint(p, proj)));
    res.zorder = res.points.map(p => p.d).reduce((d1, d2) => d1 + d2);

    return res;
}

RenderMachine.prototype.RenderFigure = function(figure) {
    let res = [];

    for (const surface of figure) {
        res.push(this.RenderSurface(surface));    
    }

    return res;
}


export default RenderMachine;