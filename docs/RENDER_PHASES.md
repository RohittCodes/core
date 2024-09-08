# Render Phases

The render phases in @tscircuit/core are defined in the `Renderable` class (`Renderable.ts`) and executed in a specific order. Each phase has a distinct purpose in the rendering process. Here's a description of each render phase:

1. ReactSubtreesRender: Renders React subtrees within components.

2. InitializePortsFromChildren: Initializes ports based on the component's children.

3. CreateNetsFromProps: Creates nets based on the component's properties.

4. CreateTracesFromProps: Creates traces based on the component's properties.

5. SourceRender: Renders the source component, which is the basic representation of the component.

6. SourceParentAttachment: Attaches the source component to its parent.

7. PortDiscovery: Discovers and initializes ports for the component.

8. PortMatching: Matches ports with their corresponding elements.

9. SourceTraceRender: Renders the source traces, which are the basic representations of connections between components.

10. SchematicComponentRender: Renders the schematic representation of the component.

11. SchematicLayout: Handles the layout of schematic components.

12. SchematicPortRender: Renders ports in the schematic view.

13. SchematicTraceRender: Renders traces in the schematic view.

14. PcbComponentRender: Renders the PCB representation of the component.

15. PcbPrimitiveRender: Renders primitive PCB elements (e.g., pads, holes).

16. PcbFootprintLayout: Handles the layout of PCB footprints.

17. PcbPortRender: Renders ports in the PCB view.

18. PcbPortAttachment: Attaches ports to their corresponding PCB elements.

19. PcbLayout: Handles the overall layout of PCB components.

20. PcbTraceRender: Renders traces in the PCB view.

21. PcbRouteNetIslands: Routes connections between isolated net islands on the PCB.

22. PcbComponentSizeCalculation: Calculates the size of PCB components.

23. CadModelRender: Renders 3D CAD models of components.

Each of these phases is executed in order for every component in the project during the rendering process. Components can implement specific logic for each phase by defining methods like `doInitial<PhaseName>`, `update<PhaseName>`, or `remove<PhaseName>`.