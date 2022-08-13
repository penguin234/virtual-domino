describe('Domino', function() {
    describe('#GetFigure()', function() {
        const frame = new DominoFrame(4, 2, 8, 1);
        const pi = new Vector3D(0, 0, 0);
        const ri = Rotate(new Vector3D(0, 0, 1), 0);
        const vi = [new Vector3D(0, 0, 0), Rotate(new Vector3D(0, 0, 1), 0)];

        it('still domino', function() {
            const actual = new Domino(frame, pi, ri, ...vi);
            const expected = {
                points: [[2, 1, 4], [-2, 1, 4], [-2, -1, 4], [2, -1, 4], [2, 1, -4], [-2, 1, -4], [-2, -1, -4], [2, -1, -4]],
                indices: [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]]
            };

            isCubeEqual(actual.GetFigure(), expected);
        });

        it('rotated domino', function() {
            const actual = new Domino(frame, pi, Rotate(new Vector3D(0, 0, 1), Math.PI / 2), ...vi);
            const expected = [1, 1, 1, 1, 1, 1];

            isCubeEqual(actual.GetFigure(), expected);
        });
        
        it('moved domino', function() {
            const actual = new Domino(frame, new Vector3D(2, 1, 4), ri, ...vi);
            const expected = [1, 1, 1, 1, 1, 1];

            isCubeEqual(actual.GetFigure(), expected);
        });
        
        it('rearranged domino', function() {
            const actual = new Domino(frame, new Vector3D(2, 1, 4), Rotate(new Vector3D(0, 0, 1), Math.PI / 2), ...vi);
            const expected = [1, 1, 1, 1, 1, 1];

            isCubeEqual(actual.GetFigure(), expected);
        });
    });
});