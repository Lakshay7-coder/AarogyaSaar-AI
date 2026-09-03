function Waveform({ active = false }) {
  return (
    <div className={`waveform ${active ? "active" : ""}`}>
      {Array.from({ length: 28 }).map((_, index) => (
        <span
          key={index}
          style={{
            "--i": index
          }}
        />
      ))}
    </div>
  );
}

export default Waveform;