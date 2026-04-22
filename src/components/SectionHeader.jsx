import React from "react";

function SectionHeader({ title, desc, action }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
      {action}
    </div>
  );
}

export default SectionHeader;
