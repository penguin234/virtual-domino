import Point2D from '../3d-elements/point2d'
import Applier from '../3d-transforms/applier'


function RenderMachine(projection) {
    this.projection = projection;
}

RenderMachine.prototype.SetCamera = function(projection) {
    this.projection = projection;
}

RenderMachine.prototype.RenderSurface = function(surface) {
    const res = {
        points: [],
        zorder: 0
    };

    res.points = surface.points.map(p => Point2D.NormalizeProjectedPoint(Applier.toPoint(p, this.projection)));
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