export default function BookImg({ src, title }) {
  return src ? (
    <img src={src} alt="bookImg" />
  ) : (
    <div className="divImgCloser">
      <span className="divImgCloser__text">{title}</span>
    </div>
  );
}
