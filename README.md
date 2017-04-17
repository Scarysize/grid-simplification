# grid-simplification
Geometry based simplification of a 3 dimensional tetrahedral grids.

### [Demo](https://scarysize.github.io/grid-simplification/build/)

The tetrahedralization is a bit weird, so some points are falsely classified, but it's enough to terminate the algorithm and demonstrate the general approach.

Basically the grid is simplified by collapsing cell edges. To keep the characteristic boundary of the grid, only complete inner or complete boundary edges are collapsed. The algorithms works roughly like this:

1. Classify all vertices as inner, surfce or corner/edge
2. Calculate the cost of possible edge collapses (here the simple approach is to let cost be driven by the edge length.)
3. Choose the cheapest collapse (shorted edge)
4. Collapse the edge onto its midpoint, for a edge *e(a,b)* move 'a' to the midpoint and remove 'b'
5. Update all cells affected by the collapse
6. Remove all cells which where incident on the collapsed edge
7. goto #2
8. The algorithms terminates if there are no more edges which can be considered for a collapse.

The cost function can be easily expanded to consider values stored at vertices thus retaining iso surfaces of the volumen data.


## Resources
- [Topology Guided Downsampling](https://pdfs.semanticscholar.org/4a22/edcc8eb39fae5975660fe05a3f016fc6b230.pdf)
- [Simplification of Tetrahedral Meshes with Accute Error Evaluation](http://www.pascucci.org/VIS03-tutorial/pdf/Simplification_tetrahedral_meshes.pdf)
- [Feature Preserved Volume Simplification](https://pdfs.semanticscholar.org/488f/403541b308e726de2afd3b6d950f3c63d850.pdf)
- [Progressive Tetrahedralizations](https://graphics.ethz.ch/Downloads/Publications/Papers/1998/p_Sta98.pdf)

![](http://i.imgur.com/MttMDmj.png?1)
