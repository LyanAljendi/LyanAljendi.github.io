class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
// Edge class for checking the first edge
class Edge {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
}
// ray array for storing ray points a,b

var points = [];
var ray = [];
var points2 = [];
var triangles = [];
let numberOfclicks = 1;
let dtr = "";
let alignment = "";
let inclusion = "";
let intersecting = false;
let drawPisclicked = false;
let edgenum = 1;
let shoot = false;
let edgeCounter = 0;
let inorout = "";
let con = [];

// three new buttons
// Ray for finishing drawing the polygon and starting to draw the ray
// Shoot for "shooting", detecting which edge was hit first
// InOrOut for finding out if the point 'a' is inside or outside the polygon
function setup() {
    createCanvas(windowWidth, windowHeight);

    // Put setup code here
    fill("black");
    textSize(40);
    button = createButton("Clear");
    button.position(30, 150);
    button.mousePressed(resetpoints);

    button = createButton("triangulate");
    button.position(175, 150);
    button.mousePressed(function () {
        triangulate();
    });
}

function resetpoints() {
    numberOfclicks = 0;
    points = [];
    points2 = [];
    ray = [];
    triangles = [];
    alignment = "";
    inclusion = "";
    drawPisclicked = false;
    edgenum = 1;
    shoot = false;
    edgeCounter = 0;
    clear();
}
// in draw, only highlight the first hit edge after calculating it
function draw() {
    // Put drawings here
    background(245);
    push();

    for (i in points) {
        ellipse(points[i].x, points[i].y, 4, 4);
    }
    for (let i = 0; i < triangles.length; i += 2) {
        line(
            triangles[i].x,
            triangles[i].y,
            triangles[i + 1].x,
            triangles[i + 1].y
        );

    }

    for (i in ray) {
        ellipse(ray[i].x, ray[i].y, 4, 4);
        if ((i = ray.length - 1)) {
            line(ray[i].x, ray[i].y, ray[0].x, ray[0].y);
        }
    }
    for (let i = 1; i < points.length; i++) {
        line(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
    }
    if ((i = points.length)) {
        line(points[i - 1].x, points[i - 1].y, points[0].x, points[0].y);
    }
    pop();
    push();
    stroke(150, 230, 0);
    if (shoot) {
        if (edgenum === points.length) {
            line(
                points[edgenum - 1].x,
                points[edgenum - 1].y,
                points[0].x,
                points[0].y
            );
        } else {
            if (edgenum > 0) {
                line(
                    points[edgenum - 1].x,
                    points[edgenum - 1].y,
                    points[edgenum].x,
                    points[edgenum].y
                );
            }
        }
    }
    pop();

    text("Ray Shooting", 30, 75);
    text(inorout, 400, 75);
}
// numberofclicks variable is used to avoid counting the button clicks as  points in the array
// drawPisclicked is used to check if we are adding to the points array or to the ray array
function mousePressed() {
    if (drawPisclicked) {
        if (numberOfclicks === 0) {
            numberOfclicks += 1;
        } else {
            ray.push(new Point(mouseX, mouseY));
            numberOfclicks += 1;
        }
    } else {
        if (numberOfclicks === 0) {
            numberOfclicks += 1;
        } else {
            points.push(new Point(mouseX, mouseY));

            numberOfclicks += 1;
        }
    }
}

function orient(a, b, c) {
    let dtrmatrix = [
        [a.x, -a.y, 1],
        [b.x, -b.y, 1],
        [c.x, -c.y, 1]
    ];

    dtr = dtr =
        dtrmatrix[0][0] * (dtrmatrix[1][1] - dtrmatrix[2][1]) -
        dtrmatrix[0][1] * (dtrmatrix[1][0] - dtrmatrix[2][0]) +
        (dtrmatrix[1][0] * dtrmatrix[2][1] - dtrmatrix[1][1] * dtrmatrix[2][0]);
    if (dtr > 0) {
        alignment = 1;
    }
    if (dtr < 0) {
        alignment = -1;
    }
    if (dtr === 0) {
        alignment = 1;
    }

    return alignment;
}
function inc(b, a, c, d) {
    if (orient(b, a, c) === 1 && orient(b, c, d) === 1 && orient(b, d, a) === 1) {
        inclusion = "inside";
        intersecting = true;
        return true;
    } else {
        inclusion = "outside";
        return false;
    }
}
function rayDrawing() {
    ray = [];
    shoot = false;
    numberOfclicks = 0;
    drawPisclicked = true;
    edgeCounter = 0;
}

//rayintersectfunction checks if a ray a,b hits an edge c,d, using the inclusion (thus the orientation determinant) function from the last homework
function rayintersects(a, c, d) {
    intersecting = false;
    numberOfclicks = 0;
    let b = new Point(a.x + 0.1, a.y);
    inc(b, a, c, d);
    inc(b, a, d, c);
    if (intersecting) {
        return true;
    } else {
        return false;
    }
}

function inOut(a) {
    edgeCounter = 0;

    for (let i = 0; i < points.length - 1; i++) {
        if (rayintersects(a, points[i], points[i + 1])) {
            edgeCounter++;
        }
    }
    if (rayintersects(a, points[points.length - 1], points[0])) {
        edgeCounter++;
    }
    if (edgeCounter % 2 == 0) {
        inorout = "out";
        return false;
    } else {
        inorout = "in";
        return true;
    }
}

function triangulate() {
    points2 = [];
    numberOfclicks = 0;
    triangles = [];
    flag = true;
    flag2 = true;

    for (let i = 0; i < points.length; i++) {
        points2.push(new Point(points[i].x, points[i].y));
    }

    while (flag2) {
        console.log("flag2 while", points2.length);
        if (points2.length < 4) {
            flag2 = false;
            console.log("terminating3")
        }
        conORref(points2);
        console.log("again in the big while");
        flag = true;
        let l = 0;
        while (flag) {
            console.log("inside flag");


            switch (con[l]) {
                case 0:
                    console.log("inside the while!")
                    if (anEar(points2.length - 1, con[l], con[l] + 1)) {
                        triangles.push(new Point(points2[points2.length - 1].x, points2[points2.length - 1].y));
                        triangles.push(new Point(points2[con[l] + 1].x, points2[con[l] + 1].y));
                        points2.splice(con[l], 1);
                        console.log(points2.length)

                        flag = false;


                    } else { l++; }
                    break;
                case points2.length - 1:
                    if (anEar(con[l] - 1, con[l], 0)) {
                        triangles.push(new Point(points2[con[l] - 1].x, points2[con[l] - 1].y));
                        triangles.push(new Point(points2[0].x, points2[0].y));
                        points2.splice(con[l], 1);
                        flag = false;

                    } else { l++; }
                    break;
                default:
                    if (anEar(con[l] - 1, con[l], con[l] + 1)) {
                        triangles.push(new Point(points2[con[l] - 1].x, points2[con[l] - 1].y));
                        triangles.push(new Point(points2[con[l] + 1].x, points2[con[l] + 1].y));
                        points2.splice(con[l], 1);

                        flag = false;


                    } else { l++; }


            }

            //console.log(l, con.length);
            if (l === con.length) { flag = false; break; }

        }


    }

    console.log("triangles", triangles.length);
}


function anEar(a, b, c) {
    numberOfclicks = 0;
    for (let k = 0; k < points2.length; k++) {


        if (k != a && k != b && k != c) {

            if (inc(points2[k], points2[a], points2[b], points2[c])) {
                console.log("not an EAR");

                return false;
            }
        }
    }
    console.log("An EAR!");
    return true;
}

function conORref(arr) {
    con = [];
    numberOfclicks = 0;
    for (let i = 0; i < arr.length; i++) {
        if (convex(i, arr)) {
            con.push(i);
        }
    }
    console.log(con);
}

function convex(i, arr) {
    if (i === 0) {
        if (orient(arr[arr.length - 1], arr[i], arr[i + 1]) === 1) {
            return true;
        }
        else return false;
    }
    if (i === arr.length - 1) {
        if (orient(arr[i - 1], arr[i], arr[0]) === 1) {
            return true;

        }
        else return false;
    }

    if (orient(arr[i - 1], arr[i], arr[i + 1]) === 1) {
        return true;
    }
    else { return false; }
}

// This Redraws the Canvas when resized
windowResized = function () {
    resizeCanvas(windowWidth, windowHeight);
};
