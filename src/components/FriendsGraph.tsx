import React from "react";
// @ts-ignore – react-d3-graph does not ship modern type declarations
import { Graph } from "react-d3-graph";
import type { City, Person } from "../types";

interface Props {
  cities: City[];
  people: Person[];
}

interface GraphNode {
  id: string;
  label: string;
  color: string;
  size: number;
}

interface GraphLink {
  source: string;
  target: string;
}

const graphConfig = {
  nodeHighlightBehavior: true,
  directed: false,
  node: {
    color: "#4fc3f7",
    size: 400,
    highlightStrokeColor: "blue",
    labelProperty: "label" as const,
    fontSize: 14,
    fontColor: "#fff",
  },
  link: {
    highlightColor: "lightblue",
    color: "#90caf9",
  },
  d3: {
    gravity: -200,
    linkLength: 140,
  },
  height: 520,
  width: 900,
};

const FriendsGraph: React.FC<Props> = ({ cities, people }) => {
  const cityNodes: GraphNode[] = cities.map((c) => ({
    id: c.id,
    label: `🏙 ${c.name}`,
    color: "#ef9a9a",
    size: 600,
  }));

  const personNodes: GraphNode[] = people.map((p) => ({
    id: p.id,
    label: `${p.name} (${p.age})`,
    color: "#80cbc4",
    size: 350,
  }));

  const links: GraphLink[] = people.map((p) => ({
    source: p.id,
    target: p.cityId,
  }));

  const data = {
    nodes: [...cityNodes, ...personNodes],
    links,
  };

  return (
    <div className="graph-container">
      <Graph id="friends-cities-graph" data={data} config={graphConfig} />
    </div>
  );
};

export default FriendsGraph;
