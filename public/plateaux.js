const PLATE = {
  THICKNESS: 1.2,
  TOP_GAP: 2,
  BORDER_COLOR: '#000',
  COLOR: '#77580e'
}

const FRAME = {
  ANGLE: 60,
  BASE_HEIGHT: 3,
  WIDTH: 10,
  BORDER_COLOR: '#664802',
  COLOR: '#dbc183'
}
const CHEESE_DEFAULT_COLOR = '#cfbd75'
const ZOOM = 5
const zoom = value => ZOOM * value
const tanDeg = deg => Math.tan(deg * Math.PI / 180)
const sinDeg = deg => Math.sin(deg * Math.PI / 180)

const plates = [
  { diam: 30, code: 'brie', thickness: 8 },
  { diam: 28, code: 'osso-iraty', thickness: 8 },
  { diam: 24, code: 'st-nectaire', thickness: 8 },
  { diam: 22, code: 'selles / cher', thickness: 8 },
  { diam: 16, code: 'fourme', thickness: 8 },
  { diam: 14, code: 'chaource', thickness: 8 },
  { diam: 12, code: 'vromage', thickness: 8 }
]

const draw = SVG('plateaux').size(1000, 1000)

// prints the plates and cheeses
const totalOffset = plates.reduce(
  (offset, plate) => {
    // adds the plate
    const plateHeight = PLATE.THICKNESS + plate.thickness + PLATE.TOP_GAP
    draw
      .rect(zoom(plate.diam), zoom(PLATE.THICKNESS))
      .attr({
        fill: PLATE.COLOR,
        stroke: PLATE.BORDER_COLOR,
        'stroke-width': 1
      })
      .move(zoom(offset.x), zoom(offset.y + FRAME.BASE_HEIGHT))

    // adds the cheese
    const cheese = draw
      .rect(zoom(plate.diam - 2), zoom(plate.thickness))
      .attr({
        fill: plate.color || CHEESE_DEFAULT_COLOR
      })
      .move(
        zoom(offset.x + 1),
        zoom(offset.y + FRAME.BASE_HEIGHT + PLATE.THICKNESS)
      )

    // adds the cheese label
    draw.text(add =>
      add
        .rotate(180)
        .tspan(plate.code)
        .move(-(cheese.cx() + zoom(plate.diam / 2 - 2)), -cheese.cy())
    )

    return {
      previousX: offset.x,
      x: offset.x - plateHeight / tanDeg(FRAME.ANGLE),
      y: offset.y + plateHeight
    }
  },
  { x: 0, y: 0 }
)

// adds the base
draw
  .rect(zoom(-totalOffset.previousX + plates[0].diam), zoom(FRAME.BASE_HEIGHT))
  .attr({
    fill: FRAME.COLOR,
    stroke: FRAME.BORDER_COLOR,
    'stroke-width': 1
  })
  .move(zoom(totalOffset.previousX), 0)

const frameWidth = FRAME.WIDTH / sinDeg(FRAME.ANGLE)
// adds the holder
draw
  .rect(zoom(frameWidth), zoom(totalOffset.y))
  .attr({
    fill: FRAME.COLOR,
    // 'fill-opacity': 0.5,
    stroke: FRAME.BORDER_COLOR,
    'stroke-width': 1
  })
  .move(
    -zoom(frameWidth + totalOffset.y / tanDeg(FRAME.ANGLE) / 2),
    zoom(FRAME.BASE_HEIGHT)
  )
  .skew(FRAME.ANGLE - 90, 0)

console.log({ totalOffset })
draw.translate(zoom(-totalOffset.x + frameWidth), 0)

draw.rotate(180)
