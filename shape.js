var thickness = 4.8
const tabLength = 5

// Settings in MM
const handleHeight = 15
var width = 100
var length = 100
var height = 100
var boxType = "lid"




const form = document.querySelector('form');
form.reset(); 

function syncDimensionsFromForm() {
    thickness = parseFloat(document.getElementById('thickness').value)
    length = parseFloat(document.getElementById('length').value)
    width = parseFloat(document.getElementById('width').value)
    height = parseFloat(document.getElementById('height').value)
    const boxTypeInput = document.getElementById('boxType')
    if (boxTypeInput) {
        boxType = boxTypeInput.value
    }

    thickness = clamp(thickness, 0.1, 50)
    length = clamp(length, 30, 1000)
    width = clamp(width, 30, 1000)
    height = clamp(height, 50, 1000)

    document.getElementById('thickness').value = thickness
    document.getElementById('length').value = length
    document.getElementById('width').value = width
    document.getElementById('height').value = height
    if (boxTypeInput) {
        boxTypeInput.value = boxType
    }

    const topClearance = getTopClearance()
    myCanvas.width = height*2+thickness*2+length+height*2+thickness*2
    myCanvas.height = height*2+width*3+topClearance+40 // Evita retallar la part superior de la tapa
    view.viewSize = new Size(myCanvas.width, myCanvas.height)
    updateDisplayDimensions()
}

function updateDisplayDimensions() {
    const widthEl = document.getElementById('patternWidth')
    const heightEl = document.getElementById('patternHeight')
    if (widthEl) widthEl.textContent = Math.round(myCanvas.width)
    if (heightEl) heightEl.textContent = Math.round(myCanvas.height)
}


form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    syncDimensionsFromForm()
    // console.log(event.submitter.value)
    if(event.submitter && event.submitter.value == "Export"){
        start()
        window.process(getExportFileName())
    }
    start()
});




// form.dispatchEvent("submit")
syncDimensionsFromForm()
start()
function start(){

project.clear()
// Logic
const topClearance = getTopClearance()
const offset = new Point(height*2+thickness*2,height+width+topClearance) // Més espai per la tapa superior
const LRSizes = new Size(height,width)
const TBSizes = new Size(length-thickness*2,height)
const TB_LRSizes = new Size(width/2,height-thickness)
const handleTemp = new Path.Rectangle(new Rectangle(new Point(0,0), new Size(handleHeight,width/4)),handleHeight/2)
const handleTemp2 = new Path.Rectangle(new Rectangle(new Point(0,0), new Size(handleHeight+5,width/4+5)),handleHeight/2)
// handleTemp.strokeColor = "#000000"

var base = new Path.Rectangle(offset,new Size(length,width))
var baseTabHole1 = new Path.Rectangle(offset+new Point(0,width*1/6),new Size(thickness*2,width/6))
var baseTabHole2 = new Path.Rectangle(offset+new Point(0,width*4/6),new Size(thickness*2,width/6))
var baseTabHole3 = new Path.Rectangle(offset+new Point(length-thickness*2,width*4/6),new Size(thickness*2,width/6))
var baseTabHole4 = new Path.Rectangle(offset+new Point(length-thickness*2,width*1/6),new Size(thickness*2,width/6))


var sideL = new Path.Rectangle(offset-new Point(height,0) ,LRSizes)
var sideL1_5 = new Path.Rectangle(offset-new Point(height+thickness,0) ,new Size(thickness*1.5,LRSizes.height))
var sideL2 = new Path.Rectangle(offset-new Point(height*2+thickness,0),LRSizes)
var sideLTab1 = new Path.Rectangle(offset-new Point(height*2+thickness*2,-width*1/6),new Size(thickness,width/6))
var sideLTab2 = new Path.Rectangle(offset-new Point(height*2+thickness*2,-width*4/6),new Size(thickness,width/6))
var handleL1 = handleTemp.clone()
handleL1.position = offset-new Point(height+thickness/2-height/3,-width/2)
var handleL2 = handleTemp.clone()
handleL2.position = offset-new Point(height+thickness/2+height/3,-width/2)


var sideR = new Path.Rectangle(offset+new Point(length,0),LRSizes)
var sideR1_5 = new Path.Rectangle(offset+new Point(length+height,0),new Size(thickness*1.5,LRSizes.height))
var sideR2 = new Path.Rectangle(offset+new Point(length+height+thickness,0),LRSizes)
var sideRTab1 = new Path.Rectangle(offset+new Point(length+height*2+thickness,width*1/6),new Size(thickness,width/6))
var sideRTab2 = new Path.Rectangle(offset+new Point(length+height*2+thickness,width*4/6),new Size(thickness,width/6))
var handleR1 = handleTemp.clone()
handleR1.position = offset+new Point(length+height+thickness/2-height/3,width/2)
var handleR2 = handleTemp.clone()
handleR2.position = offset+new Point(length+height+thickness/2+height/3,width/2)

var sideT = new Path.Rectangle(offset-new Point(-thickness,height),TBSizes)
var sideTL = new Path.Rectangle(offset-new Point(TB_LRSizes.width-thickness,height),TB_LRSizes)
var sideTR = new Path.Rectangle(offset-new Point(-TBSizes.width-thickness,height),TB_LRSizes)
var handleTL = handleTemp2.clone()
handleTL.position = offset-new Point(TB_LRSizes.width-thickness,thickness+height * 2/3)
handleTL.rotate(90)
// handleTL.scale(1.5)
var handleTR = handleTemp2.clone()
handleTR.position = offset-new Point(-TBSizes.width-TB_LRSizes.width-thickness,thickness+height * 2/3)
handleTR.rotate(90)
// handleTR.scale(1.5)
var sideB = new Path.Rectangle(offset+new Point(thickness,width),TBSizes)
var sideBL = new Path.Rectangle(offset-new Point(TB_LRSizes.width-thickness,-width-thickness),TB_LRSizes)
var sideBR = new Path.Rectangle(offset-new Point(-length+thickness,-width-thickness),TB_LRSizes)
var handleBL = handleTemp2.clone()
handleBL.position = offset-new Point(TB_LRSizes.width-thickness,-width-thickness-height* 2/3)
handleBL.rotate(90)
// handleBL.scale(1.5)
var handleBR = handleTemp2.clone()
handleBR.position = offset-new Point(-TBSizes.width-TB_LRSizes.width-thickness,-width-thickness-height* 2/3)
handleBR.rotate(90)
// handleBR.scale(1.5)

base2 = base.clone()
// base2.strokeColor = "#000000"
// base.strokeColor = "#000000"
// baseTabHole1.strokeColor = "#000000"
// baseTabHole2.strokeColor = "#000000"
// baseTabHole3.strokeColor = "#000000"
// baseTabHole4.strokeColor = "#000000"
// sideL.strokeColor = "#000000"
// sideL1_5.strokeColor = "#000000"
// sideL2.strokeColor = "#000000"
// sideLTab1.strokeColor = "#000000"
// sideLTab2.strokeColor = "#000000"
// handleL1.strokeColor = "#000000"
// handleL2.strokeColor = "#000000"
// sideR.strokeColor = "#000000"
// sideR1_5.strokeColor = "#000000"
// sideR2.strokeColor = "#000000"
// sideRTab1.strokeColor = "#000000"
// sideRTab2.strokeColor = "#000000"
// handleR1.strokeColor = "#000000"
// handleR2.strokeColor = "#000000"
// sideT.strokeColor = "#000000"
// sideTL.strokeColor = "#000000"
// sideTR.strokeColor = "#000000"
// handleTL.strokeColor = "#000000"
// handleTR.strokeColor = "#000000"
// sideB.strokeColor = "#000000"
// sideBL.strokeColor = "#000000"
// sideBR.strokeColor = "#000000"
// handleBL.strokeColor = "#000000"
// handleBR.strokeColor = "#000000"


base = base.subtract(baseTabHole1)
base = base.subtract(baseTabHole2)
base = base.subtract(baseTabHole3)
base = base.subtract(baseTabHole4)
base = base.unite(sideL)
base = base.unite(sideL1_5)
base = base.unite(sideL2)
base = base.unite(sideLTab1)
base = base.unite(sideLTab2)
base = base.unite(sideR)
base = base.unite(sideR1_5)
base = base.unite(sideR2)
base = base.unite(sideRTab1)
base = base.unite(sideRTab2)
base = base.unite(sideT)
base = base.unite(sideTR)
base = base.unite(sideTL)
base = base.unite(sideB)
base = base.unite(sideBR)
base = base.unite(sideBL)

// Els forats de mànec només existeixen al model original (sense tapa)
if (!hasLid()) {
    base = base.subtract(handleL1)
    base = base.subtract(handleL2)
    base = base.subtract(handleR1)
    base = base.subtract(handleR2)
    base = base.subtract(handleTL)
    base = base.subtract(handleTR)
    base = base.subtract(handleBL)
    base = base.subtract(handleBR)
}

handleL1.remove()
handleL2.remove()
handleR1.remove()
handleR2.remove()
handleTL.remove()
handleTR.remove()
handleBL.remove()
handleBR.remove()
handleTemp.remove()
handleTemp2.remove()

if (hasLid()) {
    // Crear tapa tipus "mailer": panell superior + solapa de tancament + solapes laterals
    const lidWidth = length - thickness * 2
    const lidPanelHeight = width
    const lidOffset = offset + new Point(thickness, -height - lidPanelHeight)
    const flapDepth = getLidFlapDepth()

    // Panell principal de la tapa (enganxat al costat superior)
    var lidPanel = new Path.Rectangle(lidOffset, new Size(lidWidth, lidPanelHeight))

    // Solapa de tancament superior: ampla (fins a vores) i curta (25% de la tapa)
    const lockTabHeight = flapDepth
    const lockTabShoulder = Math.max(3, thickness * 1.2)
    const lockTabCornerRadius = Math.min(8, lockTabHeight * 0.35)
    const lockTabTopInset = Math.max(2, lockTabCornerRadius * 0.9)

    var lidLockTab = new Path([
        lidOffset + new Point(0, 0),
        lidOffset + new Point(0, -lockTabShoulder),
        lidOffset + new Point(lockTabShoulder + lockTabTopInset, -lockTabHeight),
        lidOffset + new Point(lidWidth - lockTabShoulder - lockTabTopInset, -lockTabHeight),
        lidOffset + new Point(lidWidth, -lockTabShoulder),
        lidOffset + new Point(lidWidth, 0)
    ])
    lidLockTab.closed = true
    // Arrodonir només les cantonades superiors de la solapa de tancament
    lidLockTab.segments[2].handleIn = new Point(-lockTabCornerRadius, 0)
    lidLockTab.segments[2].handleOut = new Point(lockTabCornerRadius, 0)
    lidLockTab.segments[3].handleIn = new Point(-lockTabCornerRadius, 0)
    lidLockTab.segments[3].handleOut = new Point(lockTabCornerRadius, 0)

    // Solapes laterals: més llargues, en diagonal, arribant a les cantonades de la tapa
    const sideWingDepth = flapDepth
    const sideWingInset = clamp(flapDepth * 0.35, 4, lidPanelHeight * 0.35)
    const cornerRadius = Math.min(6, sideWingInset * 0.5)

    var lidSideL = new Path([
        lidOffset + new Point(0, 0),
        lidOffset + new Point(-sideWingDepth, sideWingInset),
        lidOffset + new Point(-sideWingDepth, lidPanelHeight - sideWingInset),
        lidOffset + new Point(0, lidPanelHeight)
    ])
    lidSideL.closed = true
    // Arrodonir només les cantonades externes (segments 1 i 2)
    lidSideL.segments[1].handleIn = new Point(0, -cornerRadius)
    lidSideL.segments[1].handleOut = new Point(0, cornerRadius)
    lidSideL.segments[2].handleIn = new Point(0, -cornerRadius)
    lidSideL.segments[2].handleOut = new Point(0, cornerRadius)

    var lidSideR = new Path([
        lidOffset + new Point(lidWidth, 0),
        lidOffset + new Point(lidWidth + sideWingDepth, sideWingInset),
        lidOffset + new Point(lidWidth + sideWingDepth, lidPanelHeight - sideWingInset),
        lidOffset + new Point(lidWidth, lidPanelHeight)
    ])
    lidSideR.closed = true
    // Arrodonir només les cantonades externes (segments 1 i 2)
    lidSideR.segments[1].handleIn = new Point(0, -cornerRadius)
    lidSideR.segments[1].handleOut = new Point(0, cornerRadius)
    lidSideR.segments[2].handleIn = new Point(0, -cornerRadius)
    lidSideR.segments[2].handleOut = new Point(0, cornerRadius)

    // Unir tota la geometria de la tapa a la peça principal
    base = base.unite(lidPanel)
    base = base.unite(lidLockTab)
    base = base.unite(lidSideL)
    base = base.unite(lidSideR)
}

base.strokeColor = "#ff0000"

if (hasLid()) {
    const lidWidth = length - thickness * 2
    const lidPanelHeight = width
    const lidOffset = offset + new Point(thickness, -height - lidPanelHeight)

    // Línia de plegat entre costat superior i panell de tapa
    var lidBaseFold = new Path.Line(
        offset + new Point(thickness, -height),
        offset + new Point(length - thickness, -height)
    )
    var lidBaseFoldD = dashPath(lidBaseFold)
    lidBaseFoldD.strokeColor = "#ff0000"
    lidBaseFold.remove()

    // Línia de plegat entre panell de tapa i solapa de tancament
    var lidTabFold = new Path.Line(
        lidOffset + new Point(0, 0),
        lidOffset + new Point(lidWidth, 0)
    )
    var lidTabFoldD = dashPath(lidTabFold)
    lidTabFoldD.strokeColor = "#ff0000"
    lidTabFold.remove()

    // Línies de plegat de les solapes laterals
    var lidSideLFold = new Path.Line(
        new Point(lidOffset.x, lidOffset.y),
        new Point(lidOffset.x, lidOffset.y + lidPanelHeight)
    )
    var lidSideLFoldD = dashPath(lidSideLFold)
    lidSideLFoldD.strokeColor = "#ff0000"
    lidSideLFold.remove()

    var lidSideRFold = new Path.Line(
        new Point(lidOffset.x + lidWidth, lidOffset.y),
        new Point(lidOffset.x + lidWidth, lidOffset.y + lidPanelHeight)
    )
    var lidSideRFoldD = dashPath(lidSideRFold)
    lidSideRFoldD.strokeColor = "#ff0000"
    lidSideRFold.remove()
}

var base2D = dashPath(base2)
var sideL1_5D = dashPath(sideL1_5) 
var sideR1_5D = dashPath(sideR1_5)
// Pestanyes interiors: dibuixar només la línia de plegat d'unió
var sideTLFold = new Path.Line(
    new Point(sideTL.bounds.right, sideTL.bounds.top),
    new Point(sideTL.bounds.right, sideTL.bounds.bottom)
)
var sideTRFold = new Path.Line(
    new Point(sideTR.bounds.left, sideTR.bounds.top),
    new Point(sideTR.bounds.left, sideTR.bounds.bottom)
)
var sideBLFold = new Path.Line(
    new Point(sideBL.bounds.right, sideBL.bounds.top),
    new Point(sideBL.bounds.right, sideBL.bounds.bottom)
)
var sideBRFold = new Path.Line(
    new Point(sideBR.bounds.left, sideBR.bounds.top),
    new Point(sideBR.bounds.left, sideBR.bounds.bottom)
)
var sideTLFoldD = dashPath(sideTLFold)
var sideTRFoldD = dashPath(sideTRFold)
var sideBLFoldD = dashPath(sideBLFold)
var sideBRFoldD = dashPath(sideBRFold)
sideTLFold.remove()
sideTRFold.remove()
sideBLFold.remove()
sideBRFold.remove()

base2D.strokeColor = "#ff0000"
sideL1_5D.strokeColor = "#ff0000"
sideR1_5D.strokeColor = "#ff0000"
sideTLFoldD.strokeColor = "#ff0000"
sideTRFoldD.strokeColor = "#ff0000"
sideBLFoldD.strokeColor = "#ff0000"
sideBRFoldD.strokeColor = "#ff0000"
}
// process()




function dashPath(path){
    // console.log(path.segments)
    const dashline = 8
    const dashgap = 7
    var dashPos = dashgap
    compoundPath = new CompoundPath()
    while (path.length > dashPos+8){
        
        var skip = false
        path.segments.forEach(s => {
            
            // console.log(path.getOffsetOf(s.point))
            if(dashPos-dashgap/2 < path.getOffsetOf(s.point) && dashPos+dashline+dashgap/2 > path.getOffsetOf(s.point)){
                skip = true
            }
        });
        
        var segments = [path.getPointAt(dashPos), path.getPointAt(dashPos+dashline)];
        dashPos += dashline + dashgap
        

        if(skip){ continue }
        

        var p = new Path(segments);
        compoundPath.addChild(new Path(p.segments))
    }
    // compoundPath.selected = true
    return compoundPath
}


function process()
{

    project.activeLayer.scale(3.779528)
    // project.activeLayer.scale(2)

    project.activeLayer.position = project.activeLayer.bounds.size/2;

    // myCanvas is an Id made in html doc
    myCanvas.width = project.activeLayer.bounds.width+100
    myCanvas.height = project.activeLayer.bounds.height+10
    view.viewSize = new Size(myCanvas.width, myCanvas.height)
    
    
    
   
    // downloadAsSVG()
    // console.log(project.exportSVG())
    // rect.strokeColor = "#000000"
}

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

function getLidFlapDepth() {
    return Math.max(10, width * 0.25)
}

function getTopClearance() {
    // Deixa espai extra només quan la tapa està activa.
    return hasLid() ? getLidFlapDepth() + 40 : 0
}

function hasLid() {
    return boxType === "lid"
}

function formatDimensionForFile(value) {
    const rounded = Math.round(value * 100) / 100
    if (Number.isInteger(rounded)) {
        return String(rounded)
    }
    return String(rounded).replace('.', '_')
}

function getExportFileName() {
    const boxSuffix = hasLid() ? "tapa" : "normal"
    const l = formatDimensionForFile(length)
    const w = formatDimensionForFile(width)
    const h = formatDimensionForFile(height)
    return l + "x" + w + "x" + h + boxSuffix + ".svg"
}
