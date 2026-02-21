import "./Home.css";
import Heading from "../../components/Headingv2/Headingv2";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import ArtistList from "../../components/ArtistList/ArtistList";
import Nightbanner from "../../components/Nightbanner/Nightbanner";
import CollageHeart from "../../components/CollageHeart/CollageHeart";
import Hero from "../../components/ScrollFancy/Hero";
import CountDown from "../../components/CountDown/CountDown";
import Schedule from "../Schedule_new/Schedule"

const artists = []

const Home = () => {
    return (
        <div className="home">
            <div className="wave-bg">
                <img src="/assets/imgs/home/wavy_bg.webp" alt="" />
            </div>
            <Hero />
            <section className="section-2">
                <div className="banner">
                    <div className="">BEings, are you ready?</div>
                    <div className="">the countdown to our very own Pujo has already begun!</div>
                </div>
            </section>
            <CountDown />
            <section className="section-3">
                <h1 className="date">MARCH 20-23</h1>
                <h4>Lords' Ground, IIEST Shibpur</h4>
                <p>
                    Prepare to be swept away as you put your best foot forward in this epic celebration of creativity
                    and culture that promises you laughter, joy and memories that will last you a lifetime and more.
                </p>
            </section>
            <section className="section-4 ">
                <Heading title={"ARTISTS"} />
                <ArtistList artists={artists} />
            </section>
            <section className="section-5">
                <Heading title={"SCHEDULE"} />
            </section>
            <section className="section-schedule">
                <Schedule />
            </section>
        </div>
    );
};

export default Home;
