import { test, expect } from "bun:test"
import { getTestFixture } from "../../fixtures/get-test-fixture"

test("silkscreen path with manual edits", async () => {
  const { circuit } = getTestFixture()

  const manualEdits = {
    pcb_placements: [
      {
        selector: "S1",
        center: {
          x: 0,
          y: -6.869495369849336,
        },
        relative_to: "group_center",
        _edit_event_id: "0.037205222437411731",
      },
    ],
    edit_events: [],
    manual_trace_hints: [],
  }

  circuit.add(
    <board width="10mm" height="10mm" manualEdits={manualEdits}>
      <silkscreenpath
        name="S1"
        route={[
          { x: "0mm", y: "0mm" },
          { x: "5mm", y: "5mm" },
          { x: "10mm", y: "0mm" },
        ]}
        strokeWidth="0.2mm"
        layer="top"
      />
    </board>,
  )

  circuit.render()

  expect(circuit).toMatchPcbSnapshot(import.meta.path)
})
