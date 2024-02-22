import React from 'react';
import Label from "./LabelComp"

const NavBarComp: React.FC = () => {
  return (
    <aside className="w-56 bg-gray-800 text-white p-6 space-y-6">
      <h2 className="text-lg font-semibold">Navigation</h2>
      <div className="space-y-2">
        <div className="space-y-1">
          <Label className="font-normal" htmlFor="steam-count">
            Side Label 1
          </Label>
        </div>
        <div className="space-y-1">
          <Label className="font-normal" htmlFor="twitch-viewership">
            Side Label 2
          </Label>
        </div>
        <div className="space-y-1">
          <Label className="font-normal" htmlFor="publisher-details">
            Side Label 3
          </Label>
        </div>
        <div className="space-y-1">
          <Label className="font-normal" htmlFor="past-reviews">
            Side Label 4
          </Label>
        </div>
        <div className="space-y-1">
          <Label className="font-normal" htmlFor="predicted-reviews">
            Side Label 5
          </Label>
        </div>
      </div>
    </aside>
  );
};

export default NavBarComp;