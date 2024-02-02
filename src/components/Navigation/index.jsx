import sonylivlogo from '../../assets/images/sonylivlogo.png'
import sonylivnav from '../../assets/images/sonylivnav.png'
import './style.css';
function Nav() {
    return (
        <div className="navigation__container">
            <nav className='navigation__container__nav'>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "6px"
                }}>
                    <img src={sonylivlogo} alt="" />
                    <span>TV Shows</span>
                    <span>Originals</span>
                    <span>Movies</span>
                    <span>Sports</span>
                    <span>Premium</span>
                    <span>Games</span>
                </div>
                <img src={sonylivnav} alt="" />
            </nav>
        </div>
    )
}

export default Nav;