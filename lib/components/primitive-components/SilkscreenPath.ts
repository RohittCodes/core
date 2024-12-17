import { silkscreenPathProps } from "@tscircuit/props"
import { PrimitiveComponent } from "../base-components/PrimitiveComponent"
import { applyToPoint } from "transformation-matrix"

export class SilkscreenPath extends PrimitiveComponent<
  typeof silkscreenPathProps
> {
  pcb_silkscreen_path_id: string | null = null
  isPcbPrimitive = true

  get config() {
    return {
      componentName: "SilkscreenPath",
      zodProps: silkscreenPathProps,
    }
  }

  _getPcbCircuitJsonBounds(): {
    center: { x: number; y: number }
    bounds: { left: number; top: number; right: number; bottom: number }
    width: number
    height: number
  } {
    const { db } = this.root!
    const silkscreenPath = db.pcb_silkscreen_path.get(
      this.pcb_silkscreen_path_id!,
    )!

    // bounds from route points
    const xs = silkscreenPath.route.map((p) => p.x)
    const ys = silkscreenPath.route.map((p) => p.y)
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const minY = Math.min(...ys)
    const maxY = Math.max(...ys)
    const width = maxX - minX
    const height = maxY - minY
    const centerX = minX + width / 2
    const centerY = minY + height / 2

    return {
      center: { x: centerX, y: centerY },
      bounds: {
        left: minX,
        top: minY,
        right: maxX,
        bottom: maxY,
      },
      width,
      height,
    }
  }

  _setPositionFromLayout(newCenter: { x: number; y: number }) {
    const { db } = this.root!
    const silkscreenPath = db.pcb_silkscreen_path.get(
      this.pcb_silkscreen_path_id!,
    )!
    const currentBounds = this._getPcbCircuitJsonBounds()
    const dx = newCenter.x - currentBounds.center.x
    const dy = newCenter.y - currentBounds.center.y

    // Update all route points with the offset
    const newRoute = silkscreenPath.route.map((point) => ({
      ...point,
      x: point.x + dx,
      y: point.y + dy,
    }))

    db.pcb_silkscreen_path.update(this.pcb_silkscreen_path_id!, {
      route: newRoute,
    })
  }

  doInitialPcbPrimitiveRender(): void {
    if (this.root?.pcbDisabled) return
    const { db } = this.root!
    const { _parsedProps: props } = this

    const layer = props.layer ?? "top"
    if (layer !== "top" && layer !== "bottom") {
      throw new Error(
        `Invalid layer "${layer}" for SilkscreenPath. Must be "top" or "bottom".`,
      )
    }

    const transform = this._computePcbGlobalTransformBeforeLayout()

    const pcb_silkscreen_path = db.pcb_silkscreen_path.insert({
      pcb_component_id: this.parent?.pcb_component_id!,
      layer,
      route: props.route.map((p) => {
        const transformedPosition = applyToPoint(transform, {
          x: p.x,
          y: p.y,
        })
        return {
          ...p,
          x: transformedPosition.x,
          y: transformedPosition.y,
        }
      }),
      stroke_width: props.strokeWidth ?? 0.1,
    })

    this.pcb_silkscreen_path_id = pcb_silkscreen_path.pcb_silkscreen_path_id
  }
}
