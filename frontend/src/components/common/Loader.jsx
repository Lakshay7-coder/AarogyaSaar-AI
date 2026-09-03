function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-container">
      <div className="loader-ring" />
      <span>{text}</span>
    </div>
  );
}

export default Loader;