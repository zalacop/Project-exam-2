import React from "react";
import { MdWifi, MdPets } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { CiForkAndKnife } from "react-icons/ci";

function MetaItem({ label, value, icon }) {
  let IconComponent = null;
  let iconSize = "1.2em";

  switch (label) {
    case "Wifi":
      IconComponent = MdWifi;
      break;
    case "Parking":
      IconComponent = FaParking;
      break;
    case "Breakfast":
      IconComponent = CiForkAndKnife;
      break;
    case "Pets":
      IconComponent = MdPets;
      break;
    default:
      IconComponent = null;
  }

  return (
    <div
      className={`border ${value ? "border-dark-green" : "border-orange"} mx-auto flex w-full items-center px-5 py-2 text-center`}
    >
      {IconComponent && (
        <IconComponent className="mr-2" style={{ fontSize: iconSize }} />
      )}
      <p>{value ? label : `No ${label}`}</p>
    </div>
  );
}

function MetaList({ data }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <MetaItem label="Wifi" value={data.meta.wifi} icon="Wifi" />
      <MetaItem label="Parking" value={data.meta.parking} icon="Parking" />
      <MetaItem
        label="Breakfast"
        value={data.meta.breakfast}
        icon="Breakfast"
      />
      <MetaItem label="Pets" value={data.meta.pets} icon="Pets" />
    </div>
  );
}

export default MetaList;
