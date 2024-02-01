import sonylivlogo from '../../assets/images/sonylivlogo.png'
import sonylivnav from '../../assets/images/sonylivnav.png'
function Nav() {
    return (
        <div style={{
            height: "8vh",
            backgroundColor: "rgb(44, 44, 44)",
            color: '#fff'
        }}>
            <nav style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "6px"
                }}>
                    <img src={sonylivlogo} alt="" />
                    <span style={{
                        marginLeft: "30px"
                    }}>TV Shows</span><span style={{
                        marginLeft: "30px"
                    }}>Originals</span><span style={{
                        marginLeft: "30px"
                    }}>Movies</span><span style={{
                        marginLeft: "30px"
                    }}>Sports</span><span style={{
                        marginLeft: "30px"
                    }}>Premium</span><span style={{
                        marginLeft: "30px"
                    }}>Games</span>
                </div>
                <img src={sonylivnav} alt="" />
            </nav>
        </div>
    )
}

export default Nav;