import Picture from "/Components/Pictures/Picture.jsx";
import { ImageContainer } from "/Components/Pictures/ImageContainer.jsx";
import React from "react";
import PidorModal from "/Components/PidorModal.jsx";
import Title from "/Components/Title.jsx";

export default function HomePage() {
  return (
    <>
      <Title />

      <div style={{ display: "flex" }}>
        {Object.entries(ImageContainer).map(([key, value]) => (
          <Picture image={value} key={key} />
        ))}
      </div>

      <PidorModal />
    </>
  );
}
