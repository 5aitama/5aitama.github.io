/** Scene settings */
var antialias       = true
var backgroundColor = 0xF7F7F7
var lineColor       = 0xCECECE
var lineWidth       = 1
var camNear         = 0.1
var camFar          = 1000
var camFov          = 75

/** Grid settings */
var width   = 32
var height  = 16
var offset  = 0.7

/** Noise settings */
var noiseSeed       = 2304
var noiseFrequency  = 0.1
var noiseAmplitude  = 1

var lineSegments;

$(document).ready(() => {

    const body = $($('section')[0]);

    function GetSceneDimension()
    {
        return { 
            width  : body.innerWidth(), 
            height : body.innerHeight(),
    
            ratio : function() { return this.width / this.height }
        };
    }

    const sceneDimension = GetSceneDimension();

    const scene     = new THREE.Scene();
    const camera    = new THREE.PerspectiveCamera(camFov, sceneDimension.ratio(), camNear, camFar);
    const renderer  = new THREE.WebGLRenderer({ antialias: antialias });
    const fog       = new THREE.Fog(backgroundColor, 0.1, height * offset);
    const clock     = new THREE.Clock(true);

    scene.fog = fog;

    renderer.setSize(sceneDimension.width, sceneDimension.height);
    renderer.setClearColor(backgroundColor);
    renderer.setPixelRatio(window.devicePixelRatio);

    $(window).resize(() => {
        const sceneDimension = GetSceneDimension();
        renderer.setSize(sceneDimension.width, sceneDimension.height);
        camera.aspect = sceneDimension.ratio();
        camera.updateProjectionMatrix();
    });
    
    document.body.appendChild(renderer.domElement);

    camera.position.x = (width * offset / 2) - (offset / 2);
    camera.position.y = 2;
    camera.position.z = height * offset - offset;

    const grid = CreateWireFrameGrid(width, height, offset, scene, lineColor, lineWidth);

    noise.seed(noiseSeed)

    let time = 0

    function animate() {
        requestAnimationFrame( animate );

        const delta = clock.getDelta()
        time += delta
        
        const vAttribute = grid.getAttribute('position');

        for(var i = 0; i < Math.floor(vAttribute.array.length / 3); i++)
        {
            const index = i * 3;

            const x = vAttribute.array[index    ] + time * 0.7;
            const z = vAttribute.array[index + 2] + time * 0.7;
            const y = noise.simplex2(x * noiseFrequency, z * noiseFrequency) * noiseAmplitude;
            
            vAttribute.array[index + 1] = y;
        }

        vAttribute.needsUpdate = true;

        renderer.render( scene, camera );
    }

    animate();
});

function CreateWireFrameGrid(width, height, offset, scene, lineColor, lineWidth)
{
    const vertices    = [];
    const indices     = [];

    const pointAmount = width * height;

    for(var i = 0; i < pointAmount; i++)
    {
        const x = Math.floor(i % width);
        const y = 0;
        const z = Math.floor(i / width);

        const vertex = new THREE.Vector3(x * offset, y * offset, z * offset);

        vertices.push(vertex.x, vertex.y, vertex.z);

        if(x < width - 1 && z < height - 1)
        {
            const a = i;
            const b = i + width;
            const c = i + width + 1;
            const d = i + 1;
            
            indices.push( a, b, c, a, c, d );
        }
    }

    const geometry = new THREE.BufferGeometry();
    const vertBufferAttrib = new THREE.Float32BufferAttribute( vertices, 3 );

    vertBufferAttrib.setDynamic(true)

    geometry.setIndex(indices);
    geometry.addAttribute( 'position', vertBufferAttrib );

    const wireframe = new THREE.WireframeGeometry( geometry );

    const material = new THREE.LineBasicMaterial( {
        color: lineColor,
        linewidth: lineWidth,
    });
    
    lineSegments = new THREE.LineSegments( wireframe, material );

    scene.add(lineSegments);

    return wireframe;
}

/**
 * Convert an hexadecimal color representation to
 * 3 float component (r, g, b)
 * @param {number | string} hexColor Hexadecimal color representation
 * @returns { {r: number, g: number, b: number} } RGB color representation
 */
function ConvertHexColorToRGBFloat(hexColor)
{
    let n;

    if(isNaN(hexColor))
    {
        if(hexColor.charAt(0) === '#')
            n = parseInt(hexColor.replace("#", "0x"));
        else
            throw `Not recognize format of "${hexColor}"`;
    }
    else
    {
        n = hexColor;
    }

    return {
        r: ((n & 0xFF0000) >> 0x10) / 0xFF,
        g: ((n & 0x00FF00) >> 0x08) / 0xFF,
        b: ((n & 0x0000FF))         / 0xFF
    }
}

/**
 * Change the color of the line segments
 * @param {string | {r: number, g: number, b: number}} rgb RGB (0..1) values.
 */
function ChangeLineSegmentsColor(rgb)
{
    lineSegments.material.color = isNaN(rgb) ? ConvertHexColorToRGBFloat(rgb) : rgb;
}

/**
 * Reset the color of the line segments to the original color.
 */
function ResetLineSegmentsColor()
{
    lineSegments.material.color = ConvertHexColorToRGBFloat(lineColor);
}