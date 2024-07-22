import * as Phaser from 'phaser'

import Weapon from '../weapons/weapon'
import Character from './character'

type Point = { x: number; y: number }

// Function to determine the orientation of points p, q, and r
const getOrientation = (p: Point, q: Point, r: Point): number => {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)
  if (val === 0) return 0 // collinear
  return val > 0 ? 1 : 2 // clockwise or counterclockwise
}

// Function to check if point q is on segment pr
const isOnSegment = (p: Point, q: Point, r: Point): boolean => {
  return (
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y)
  )
}

// Function to check if segments p1q1 and p2q2 intersect
const segmentsIntersect = (
  p1: Point,
  q1: Point,
  p2: Point,
  q2: Point
): boolean => {
  const o1 = getOrientation(p1, q1, p2)
  const o2 = getOrientation(p1, q1, q2)
  const o3 = getOrientation(p2, q2, p1)
  const o4 = getOrientation(p2, q2, q1)

  // General case: segments intersect if orientations are different
  if (o1 !== o2 && o3 !== o4) return true

  // Special cases: check if segments are collinear and touch
  if (o1 === 0 && isOnSegment(p1, p2, q1)) return true
  if (o2 === 0 && isOnSegment(p1, q2, q1)) return true
  if (o3 === 0 && isOnSegment(p2, p1, q2)) return true
  if (o4 === 0 && isOnSegment(p2, q1, q2)) return true

  return false
}

// Function to find the intersection point of two segments
const getIntersectionPoint = (
  p1: Point,
  q1: Point,
  p2: Point,
  q2: Point
): Point | null => {
  const A1 = q1.y - p1.y
  const B1 = p1.x - q1.x
  const C1 = A1 * p1.x + B1 * p1.y

  const A2 = q2.y - p2.y
  const B2 = p2.x - q2.x
  const C2 = A2 * p2.x + B2 * p2.y

  const determinant = A1 * B2 - A2 * B1

  if (determinant === 0) {
    // Lines are parallel
    return null
  } else {
    const x = (B2 * C1 - B1 * C2) / determinant
    const y = (A1 * C2 - A2 * C1) / determinant
    return { x, y }
  }
}

export function EntitiesAndTileCollision(
  entities: (Character | Weapon)[],
  tilemapLayer: Phaser.Tilemaps.TilemapLayer
) {
  entities.forEach(entity => {
    const character = entity as Character
    const characterBounds = character.getBounds()

    // Define character corners
    const characterCorners: Point[] = [
      { x: characterBounds.left, y: characterBounds.top },
      { x: characterBounds.right, y: characterBounds.top },
      { x: characterBounds.right, y: characterBounds.bottom },
      { x: characterBounds.left, y: characterBounds.bottom }
    ]

    let inAir = true // Initialize inAir variable outside the loop

    tilemapLayer.forEachTile(tile => {
      if (tile.collides) {
        const tileBounds = new Phaser.Geom.Rectangle(
          tile.pixelX * 3,
          tile.pixelY * 3,
          tile.width * 3,
          tile.height * 3
        )

        // Define tile corners
        const tileCorners: Point[] = [
          { x: tileBounds.left, y: tileBounds.top },
          { x: tileBounds.right, y: tileBounds.top },
          { x: tileBounds.right, y: tileBounds.bottom },
          { x: tileBounds.left, y: tileBounds.bottom }
        ]

        // Check intersections between character segments and tile segments
        let intersectionPoint: Point | null = null
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (
              segmentsIntersect(
                characterCorners[i],
                characterCorners[(i + 1) % 4],
                tileCorners[j],
                tileCorners[(j + 1) % 4]
              )
            ) {
              intersectionPoint = getIntersectionPoint(
                characterCorners[i],
                characterCorners[(i + 1) % 4],
                tileCorners[j],
                tileCorners[(j + 1) % 4]
              )
              if (intersectionPoint) break
            }
          }
          if (intersectionPoint) break
        }

        if (intersectionPoint) {
          // Adjust character position based on intersection point
          const characterWidth = characterBounds.width
          const characterHeight = characterBounds.height

          // Determine collision direction
          const charMidX = (characterBounds.left + characterBounds.right) / 2
          const charMidY = (characterBounds.top + characterBounds.bottom) / 2
          const tileMidX = tileBounds.left + tileBounds.width / 2
          const tileMidY = tileBounds.top + tileBounds.height / 2

          const diffX = charMidX - tileMidX
          const diffY = charMidY - tileMidY

          const overlapX =
            Math.abs(diffX) - (characterBounds.width + tileBounds.width) / 2
          const overlapY =
            Math.abs(diffY) - (characterBounds.height + tileBounds.height) / 2

          // Adjust character position based on collision direction
          if (overlapX < overlapY) {
            if (diffY < 0) {
              character.setPosition(
                character.x,
                tileBounds.top - characterHeight / 2
              )
              character.setVelocity(character.body!.velocity.x, 0)
              inAir = false // Update inAir variable
            } else {
              character.setPosition(
                character.x,
                tileBounds.bottom + characterHeight / 2
              )
              character.setVelocity(character.body!.velocity.x, 0)
            }
          } else {
            if (diffX < 0) {
              character.setPosition(
                tileBounds.left - characterWidth / 2,
                character.y
              )
              character.setVelocity(0, character.body!.velocity.y)
            } else {
              character.setPosition(
                tileBounds.right + characterWidth / 2,
                character.y
              )
              character.setVelocity(0, character.body!.velocity.y)
            }
            inAir = false // Update inAir variable
          }
          character.setGravityY(0)
        }
      }
    })

    character.inAir = inAir // Update character.inAir after the loop
  })
}
