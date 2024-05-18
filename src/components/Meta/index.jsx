import React from "react";

function MetaItem({ label, value }) {
  return (
    <p
      className={`border ${value ? "border-dark-green" : "border-orange"} mx-auto w-full px-5 py-2 text-center`}
    >
      {value ? label : `No ${label}`}
    </p>
  );
}

function MetaList({ data }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <MetaItem label="Wifi" value={data.meta.wifi} />
      <MetaItem label="Parking" value={data.meta.parking} />
      <MetaItem label="Breakfast" value={data.meta.breakfast} />
      <MetaItem label="Pets" value={data.meta.pets} />
    </div>
  );
}

export default MetaList;
