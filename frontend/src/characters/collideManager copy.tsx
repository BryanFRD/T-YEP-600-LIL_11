import * as Phaser from 'phaser'

import Weapon from '../weapons/weapon'
import Character from './character'
import Mage from './mage'

type Point = { x: number; y: number }

// Fonction pour déterminer l'orientation des points p, q, et r
const getOrientation = (p: Point, q: Point, r: Point): number => {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)
  if (val === 0) return 0 // colinéaire
  return val > 0 ? 1 : 2 // sens horaire ou antihoraire
}

// Fonction pour vérifier si le point q est sur le segment pr
const isOnSegment = (p: Point, q: Point, r: Point): boolean => {
  return (
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y)
  )
}

// Fonction pour vérifier si les segments p1q1 et p2q2 se croisent
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

  // Cas général : les segments se croisent si les orientations sont différentes
  if (o1 !== o2 && o3 !== o4) return true

  // Cas particuliers : vérifier si les segments sont colinéaires et se touchent
  if (o1 === 0 && isOnSegment(p1, p2, q1)) return true
  if (o2 === 0 && isOnSegment(p1, q2, q1)) return true
  if (o3 === 0 && isOnSegment(p2, p1, q2)) return true
  if (o4 === 0 && isOnSegment(p2, q1, q2)) return true

  return false
}

// Fonction pour trouver le point d'intersection entre deux segments
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
    // Les lignes sont parallèles
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
    if (entity instanceof Character) {
      const character = entity as Character
      const characterBounds = character.getBounds()

      // Définir les coins du personnage
      const characterCorners: Point[] = [
        { x: characterBounds.left, y: characterBounds.top },
        { x: characterBounds.right, y: characterBounds.top },
        { x: characterBounds.right, y: characterBounds.bottom },
        { x: characterBounds.left, y: characterBounds.bottom }
      ]

      const inAir = false

      tilemapLayer.forEachTile(tile => {
        if (tile.collides) {
          const tileBounds = new Phaser.Geom.Rectangle(
            tile.pixelX * 3,
            tile.pixelY * 3,
            tile.width * 3,
            tile.height * 3
          )

          // Définir les coins de la tuile
          const tileCorners: Point[] = [
            { x: tileBounds.left, y: tileBounds.top },
            { x: tileBounds.right, y: tileBounds.top },
            { x: tileBounds.right, y: tileBounds.bottom },
            { x: tileBounds.left, y: tileBounds.bottom }
          ]

          // Vérifier les intersections entre les segments du personnage et de la tuile
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
            // Ajuster la position du personnage en fonction du point d'intersection
            const characterWidth = characterBounds.width
            const characterHeight = characterBounds.height

            const adjustedX = intersectionPoint.x - characterWidth / 2
            const adjustedY = intersectionPoint.y - characterHeight / 2

            character.setPosition(adjustedX, adjustedY)

            if (character instanceof Mage) {
              console.log('Intersection Point:', intersectionPoint)
              console.log(
                'Character Point center:',
                character.getBounds().centerX,
                character.getBounds().centerY
              )
              console.log(
                'Character Point:',
                character.getBounds().x,
                character.getBounds().y
              )
            }
          }
        }
      })
    } else if (entity instanceof Weapon) {
      // Gérer la collision de l'arme avec la plateforme
    }
  })
}
