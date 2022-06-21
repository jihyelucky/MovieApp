import style from "./Footer.css";

function Footer() {
  return (
    <div className="footerWrap">
      <div className="logo">JIFLIX</div>
      <p className="cont">
        Contact :
        <button
          onClick={() =>
            window.open("https://www.instagram.com/jiz2_yang/", "_blank")
          }
        >
          instagram@jiz2_yang
        </button>
      </p>
    </div>
  );
}

export default Footer;
